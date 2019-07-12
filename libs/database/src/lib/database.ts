import mongoose from 'mongoose'
import { conf } from '@clubgo/util'

const config = require('./config.json').database

let options = ''
for(const key in config.options)
  if(config.options.hasOwnProperty(key))
    options += (key + '=' + config.options[key] + '&')

const url = 
  `${config.protocol}://${config.username}:${config.password}@${config.url}/` +
  `${config.db}?` +
  `${ options }`

export const database = {
  state: {
    db: null,
    mode: 'DISCONNECTED'
  },
  connect: async () => {
    if (database.state.mode==='CONNECTED') return database.state

    await mongoose.connect(
      url, 
      { 
        userMongoClient: true,
        createIndexes: true,
        useFindAndModify: true,
      }
    )
    
    database.state = {
      db: mongoose.connection,
      mode: 'CONNECTED'
    }
    return database.state
  },
  get: () => {
    return database.state.mode
  },  
  close: async () => {
    // if (state) {
    //   state.close(function(err, result) {
    //     state.db = null
    //     state.mode = null
    //     callback(err)
    //   })
    // }
  }
}
