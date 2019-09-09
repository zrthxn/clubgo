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
  // Maybe
  next()
})

import { render } from '../SSR/renderer'
import { build, BUILD_PATH } from '../SSR/application'

// tslint:disable: nx-enforce-module-boundaries
import { Home } from '@clubgo/website/server'

WebRouter.get('^/$', (req, res)=>{
  const Application = build(Home)
  render(Application, req, res)
})

WebRouter.use(express.static( path.join(BUILD_PATH) ))

// STOP ============================================== STOP

WebRouter.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.end('Request Forcefully Closed.\n Your request was caught but did not match any paths.\n')
})