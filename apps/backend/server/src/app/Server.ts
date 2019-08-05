import express, { Router as ExpressRouter } from 'express'
import mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

/**
 * @author
 * * Alisamar Husain | zrthxn
 * 
 * @copyright
 * Copyright Alisamar Husain
 * 2019
 * 
 * @license
 * MIT Licence
 * This software is provided as-is with no
 * warranties or guatantees.
 */

export const _Server = express()
export default _Server
// All Express instances starting with a underscore
// like _Server are global routing objects.

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

// ==========================================================

/**
 * @description
 * Welcome to the ClubGo Backend API Server
 * This server routes and serves all the data in the website
 * The API exposes all the available funcionality
 */

_Server.get('/', (req, res)=>{
  res.send({ message: 'clubgo' })
})

_Server.use('/api', (req, res, next)=>{
  console.log('api')
  // auth
  _Router(req, res, next)
})

_Server.use('/admin', (req, res, next)=>{
  console.log('admin')
  // auth
  _Router(req, res, next)
})