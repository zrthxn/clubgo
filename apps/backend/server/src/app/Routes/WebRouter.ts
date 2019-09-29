import express from 'express'
import path from 'path'
import { Event, Venue, User, Offer } from '@clubgo/database'
import { conf } from '@clubgo/util'
import { ModelledCRUDRouter } from '@clubgo/database'

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
import { Home } from '@clubgo/website/ssr'

WebRouter.get('^/$', (req, res)=>{
  const Application = build(Home)
  render(Application, req, res)
})

WebRouter.use(express.static( path.join(BUILD_PATH) ))

// STOP ============================================== STOP
