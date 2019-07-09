import { MongoClient } from 'mongodb'

let state = {
  db: null,
  mode: null
}

export function connect(url, callback) {
  if (state.db) return callback()

  MongoClient.connect(url, function(err, db) {
    if (err) return callback(err)
    state.db = db
    callback()
  })
}

export function get() {
  return state.db
}

export function close(callback) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      callback(err)
    })
  }
}