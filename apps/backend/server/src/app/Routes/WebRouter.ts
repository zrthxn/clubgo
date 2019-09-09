import express from 'express'
import path from 'path'
import { Event, Venue, User, Offer } from '@clubgo/database'
import { conf } from '@clubgo/util'
import { CRUDRouter } from '@clubgo/database'

export const WebRouter = express.Router()
export default WebRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
WebRouter.use((req, res, next)=>{
  // If req has API level access token, allow and DEL token header
  // Else, 403
  next()
})

import { Renderer } from '../SSR/renderer'
// Web Functions
// --------------------------------------------------------
// WebRouter.get('^/$', (req, res, next)=>{
//   // res.write('ClubGo Website Backend. \n')
//   // next()  
// })

import { BUILD_PATH } from '../SSR/application'

WebRouter.get('^/$', Renderer)

WebRouter.use(express.static( path.join(BUILD_PATH) ))

// STOP ============================================== STOP

// WebRouter.use((req, res)=>{
//   // End any caught requests if no matching paths are found
//   res.write('405 Request Forcefully Closed. \nYour request was caught but did not match any paths.\n')
//   res.end()
// })