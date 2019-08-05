import express from 'express'
import path from 'path'
import { conf } from '@clubgo/util'

import EventRouter from './routes/EventRouter'
import UserRouter from './routes/UserRouter'
import VenueRouter from './routes/VenueRouter'

import { auth } from '../Auth/Authentication'

export const _Router = express.Router()
export default _Router

_Router.use((req, res, next)=>{
  next()
})

_Router.get('/login', (req, res)=>{

})

_Router.get('/authenticate', (req, res)=>{
  
})

_Router.use('/user', UserRouter)

_Router.use('/event', EventRouter)

_Router.use('/venue', VenueRouter)
