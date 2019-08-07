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

import { database as Database } from '@clubgo/database'
import { auth } from './Auth/Authentication'

// MongoDB Connection
Database.connect({ db: 'clubgo' })
  .then(() => console.log(conf.Magenta('Ready')))
  .catch((e) => console.log(conf.Red(e)) )
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

// Security Lifecycle Routes
// --------------------------------------------------------
_Server.use('/_authenticate', (req, res, next)=>{
  // Auth, headers, CSRF 
  const AuthRouter = express.Router()
  // Set proper and unique auth header, according to API
  AuthRouter.post('/', (req, res)=>{
    res.send(':: AUTH ::')
  })

  AuthRouter(req, res, next)
})

_Server.use('/_login', (req, res, next)=>{
  // API Login or user login 
  const LoginRouter = express.Router()
  // Set proper and unique login header, according to API
  LoginRouter.post('/', (req, res)=>{
    res.send(':: LOGIN ::')
  })

  LoginRouter(req, res, next)
})
// STOP ============================================== STOP

// API Routes
// --------------------------------------------------------
_Server.get('/', (req, res)=>{
  res.send({ message: 'clubgo' })
})

_Server.use((req, res, next)=>{
  // Check CSRF Token Headers/Cookies
  // If success, set CSRF Auth Token
  // Else, 403
  console.log('CSRF')
  _Router(req, res, next)
})
