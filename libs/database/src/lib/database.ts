import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'

const config = require('../config.json').database

export class DatabaseConnection {
  private connection = null
  private db = null
  private url = null
  
  state = undefined

  mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }

  constructor(connectionOptions:DatabaseConnectionOptions) {
    this.url = `${config.protocol}://${config.username}:${config.password}@${config.url}/`
    this.db = connectionOptions.database
    
    let urlOptions = ''
    for(const key in config.options)
      if(config.options.hasOwnProperty(key))
        urlOptions += (key + '=' + config.options[key].toString() + '&')

    this.url += `${connectionOptions.database}?${urlOptions}`

    this.connect().then(()=>{
      console.log('Mongoose connected to', conf.Green(`${config.protocol}://${config.url}/${this.db}`))
    })
  }

  async connect() {    
    try {
      
      await mongoose.connect( this.url, { ...this.mongooseOptions })

      this.connection = mongoose.connection
      this.state = 'CONNECTED'
      return this.state

    } catch (err) {
      console.log(conf.Red(err))
      return Promise.reject(err)
    }
  }

  async close() {
    try {

      await mongoose.disconnect()
      
      this.connection = null
      this.state = 'DISCONNECTED'

      console.log(conf.Green('Mongoose Disconnected'), 'EXIT 0')
      return this.state

    } catch (err) {
      console.log(conf.Red(err))
      return Promise.reject(err)
    }
  }
}

export interface DatabaseConnectionOptions {
  database: string
}