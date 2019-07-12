import mongoose from 'mongoose'
import { conf } from '@clubgo/util'

const config = require('./config.json').database
const url = `${config.protocol}://${config.username}:${config.password}@${config.url}/${config.db}`

var state = null

export const database = {
  connect: async () => {
    if (state!==null || state==='CONNECTED') return state

    await mongoose.connect(
      url, 
      { 
        userMongoClient: true,
        createIndexes: true
      }
    )
    
    state = 'CONNECTED'
    return Promise.resolve(state)
  },
  get: () => {
    return state
  },  
  close: (callback) => {
    // if (state) {
    //   state.close(function(err, result) {
    //     state.db = null
    //     state.mode = null
    //     callback(err)
    //   })
    // }
  }
}
