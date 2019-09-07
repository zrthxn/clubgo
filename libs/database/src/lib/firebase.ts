/// <reference lib="dom" />
import firebase from 'firebase'

require('firebase/database')
require('firebase/auth')
require('firebase/firestore')

const DatabaseConfig = require('../config.json').firebase

/** 
 * Standard Firebase/Firestore Export
 * 
 * @author Alisamar Husain
 * Import the object by either `const db = require('./Database')`
 * or `import db from './Database'`
 *
 * Use the object to get a database
 * namespace by `db.firebase.database()`
 * Check the firebase docs for more.
 */

if(firebase.apps.length === 0)
  firebase.initializeApp(DatabaseConfig)

export const Realtime = firebase.database()
export const Firestore = firebase.firestore()
// export const Auth = firebase.auth()

export default Firestore
