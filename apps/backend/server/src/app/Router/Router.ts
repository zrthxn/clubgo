import express from 'express'
import path from 'path'
import { conf } from '@clubgo/util'

import AdminRouter from './routes/AdminRouter'
import WebRouter from './routes/WebsiteRouter'

import { auth } from '../Auth/Authentication'

export const _Router = express.Router()
export default _Router
// ========================================================

// TEMPORARY CORS CONFIG
_Router.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

// Router Security Validation
// --------------------------------------------------------
_Router.use('/api', (req, res, next)=>{
  console.log('API AUTH')
  // API auth
  // If req has CSRF auth token, set a API level access token
  next()
})

_Router.use('/admin', (req, res, next)=>{
  console.log('ADMIN AUTH')
  // ADMIN auth
  // If req has CSRF auth token && ADMIN auth headers, 
  // set a ADMIN level access token
  next()
})

// Router API Type Routes
// --------------------------------------------------------
_Router.use('/api', WebRouter)

_Router.use('/admin', AdminRouter)