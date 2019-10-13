import express from 'express'
import path from 'path'
import { Event, Venue, User, Offer } from '@clubgo/database'
import { conf } from '@clubgo/util'
import { ModelledCRUDRouter } from '@clubgo/database'

export const WebRouter = express.Router()
export default WebRouter
// ========================================================

import { render } from '../SSR/renderer'
import { build, BUILD_PATH } from '../SSR/application'

WebRouter.use(express.static( path.join(BUILD_PATH) ))

import Website from '../SSR/website/Website'

WebRouter.get('^/$', (req, res)=>{
  const Application = build(Website)
  render(Application, req, res)
})

// STOP ============================================== STOP
