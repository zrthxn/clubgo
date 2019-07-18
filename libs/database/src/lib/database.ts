import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'

const config = require('./config.json').database

let dbConnOptions = ''
for(const key in config.options)
  if(config.options.hasOwnProperty(key))
    dbConnOptions += (key + '=' + config.options[key].toString() + '&')

const url = (db) => `${config.protocol}://${config.username}:${config.password}@${config.url}/${db}?${dbConnOptions}`

export const database = {
  state: {
    db: null,
    mode: 'UNINITIALIZED'
  },

  connect: async (options) => {
    if (database.state.mode==='CONNECTED') return database.state
    
    await mongoose.connect(
      url(options.db), 
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
    )
    database.state = {
      db: mongoose.connection,
      mode: 'CONNECTED'
    }
    console.log(conf.Green(`Mongoose Connected to ${config.url}/${options.db}`))
    return database.state
  },

  get: () => {
    return database.state.mode
  },  
  
  close: async () => {
    try {
      await mongoose.disconnect()
      database.state = {
        db: null,
        mode: 'DISCONNECTED'
      }
      console.log(conf.Red('Mongoose Disconnected'), 'EXIT_MODE 0')
      return database.state.mode
    } catch (err) {
      console.log(conf.Red(err))
      return Promise.reject(err)
    }
  }
}
