import express from 'express'
import { conf } from '@clubgo/util'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

/**
 * @author
 * * Alisamar Husain | zrthxn
 * 
 * @copyright 2019
 * Copyright Alisamar Husain
 * 
 * @license MIT
 * This software is provided as-is with no
 * warranties or guatantees.
 */

export const _Server = express()
export default _Server
// All Express instances starting with an underscore,
// like _Server, _Router are global routing objects.

_Server.use(cookieParser())
_Server.use(bodyParser.json())
_Server.use(bodyParser.urlencoded({ extended: true }))
_Server.use(express.json())
_Server.use(express.urlencoded({ extended: true }))

import _Router from './Router/Router'
import { auth } from './Auth/Authentication'

const ServerConfig = require('./serverconfig.json')

// MongoDB Connection
import { DatabaseConnection } from '@clubgo/database'
const db = new DatabaseConnection({ database: 'clubgo' })
// ========================================================

/**
 * @description
 * * Welcome to the ClubGo Backend API Server
 * This server routes and serves all the data in the website
 * The API exposes all the available funcionality
 * 
 * ---- : Flow is continued
 * ==== : Flow is broken
 * STOP : Flow goes no further in this direction
 */

// Root Headers 
// --------------------------------------------------------
_Server.use((req, res, next)=>{
  if(ServerConfig.policy.ALLOW_CORS) {
    res.header('Access-Control-Allow-Origin', ServerConfig.policy.ALLOW_ORIGIN)
    res.header('Access-Control-Allow-Headers', ServerConfig.policy.ALLOW_HEADERS)
    res.header('Access-Control-Allow-Methods', ServerConfig.policy.ALLOW_METHODS)
  }
  next()
})

// API Routes
// --------------------------------------------------------
_Server.get('/', (req, res, next)=>{
  res.write(`ClubGo Server | ${conf.copyright} CLUBGO 2019 \n`)
  next()
})

_Server.use((req, res, next)=>{
  // Check CSRF Token Headers/Cookies
  // If success, set CSRF Auth Token
  // Else, 403
  console.log('CSRF')
  _Router(req, res, next)
})

// Security Lifecycle Routes
// --------------------------------------------------------
// 1. Authenticate service, CSRF 
const AuthRouter = express.Router()
AuthRouter.post('/', (req, res)=>{
  // Set unique CSRF Tokens
  res.send(':: AUTH ::')
})

_Server.use('/_authenticate', AuthRouter)

// 2. API Login or user login 
const LoginRouter = express.Router()
LoginRouter.post('/', (req, res)=>{
// Check CSRF Tokens
// Set proper and unique login header
// Set access headers for API access, according to access level
  res.send(':: LOGIN ::')
})

_Server.use('/_login', LoginRouter)

// STOP ============================================== STOP

_Server.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.write('405 Request Forcefully Closed.\n Your request was caught but did not match any paths.\n')
  res.end()
})
