import express from 'express'
import path from 'path'
import vhost from 'vhost'
import { conf } from '@clubgo/util'

import APIRouter from './routes/APIRouter'
import WebRouter from './routes/WebRouter'

import { auth } from '../Auth/Authentication'
const ServerConfig = require('../serverconfig.json')

export const _Router = express.Router()
export default _Router
// ========================================================

// Router Security Validation
// --------------------------------------------------------
_Router.use((req, res, next)=>{
  console.log('ROUTER AUTH')
  // USER auth
  // If req has CSRF auth token, set a USER level access token

  // ADMIN auth
  // If req has CSRF auth token && ADMIN auth headers, 
  // set a ADMIN level access token

  // Temporary VHOST
  // req.host = ServerConfig.domains.api

  next()
})

// Router API Type Routes
// --------------------------------------------------------
// Development
_Router.use( APIRouter )

// Production
_Router.use(vhost(ServerConfig.domains.web, WebRouter))

_Router.use(vhost(ServerConfig.domains.api, APIRouter))

// STOP ============================================== STOP

_Router.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.write('405 Request Forcefully Closed.\n Your request was caught but did not match any paths.\n')
  res.end()
})
