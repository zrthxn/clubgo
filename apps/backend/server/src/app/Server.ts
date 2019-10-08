import express from 'express'
import { conf } from '@clubgo/util'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import crypto from 'crypto'
import vhost from 'vhost'

/**
 * @description
 * Welcome to the ClubGo Backend API Server
 * This server routes and serves all the data in the website
 * The API exposes all the available funcionality
 * 
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

// Routers
import APIRouter from './Routes/APIRouter'
import WebRouter from './Routes/WebRouter'
import LoginRouter from './Routes/LoginRouter'

// Middleware
import { generateRequestAuthentication } from './Auth/Authentication'

import { APIEndpoints } from '@clubgo/features/api'
const ServerConfig = require('./serverconfig.json')

// MongoDB Connection
import { DatabaseConnection } from '@clubgo/database'
const db = new DatabaseConnection({ database: 'clubgo' })
// ========================================================

/**
 * `----` : Flow is continued
 * `====` : Flow is broken
 * `STOP` : Flow goes no further in this direction
 */

/**
 * @description Server CORS policy. 
 * Handles all preflight requests 
 */
_Server.use((req, res, next)=>{
  if(ServerConfig.policy.ALLOW_CORS)
    res.header('Access-Control-Allow-Origin', ServerConfig.policy.ALLOW_ORIGIN)
  res.header('Access-Control-Allow-Headers', ServerConfig.policy.ALLOW_HEADERS)
  res.header('Access-Control-Allow-Methods', ServerConfig.policy.ALLOW_METHODS)
  next()
})

// Security Lifecycle Routes
// --------------------------------------------------------
// 1. Authenticate service, CSRF 
const AuthRouter = express.Router()
AuthRouter.post('/_authenticate', generateRequestAuthentication)

// STOP ============================================== STOP

// Routes
// --------------------------------------------------------
_Server.use(AuthRouter)

_Server.use(LoginRouter)

// Development
_Server.use(APIRouter)
// _Server.use(WebRouter)

// Production
// _Server.use(vhost(ServerConfig.domains.web, WebRouter))

// _Server.use(vhost(APIEndpoints.api.url, APIRouter))

// STOP ============================================== STOP

_Server.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.end('Request Forcefully Closed. Your request was caught here but did not match any paths.')
})
