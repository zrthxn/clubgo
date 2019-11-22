import express from 'express'
import path from 'path'
import { Event, Venue, User, Offer } from '@clubgo/database'
import { conf } from '@clubgo/util'
// import { ModelledCRUDRouter } from '@clubgo/database'

/**
 * @description
 * Server Rendered React Router
 */
export const WebRouter = express.Router()
export default WebRouter
// ========================================================

import { render } from '../SSR/renderer'
import { build, BUILD_PATH } from '../SSR/application'

import Website from '../SSR/website/Website'

WebRouter.get('/', (req, res)=>{
  const app = build(Website)
  render(req, res, app)
})

WebRouter.get('/in/:city', (req, res)=>{
  const app = build(Website, {
    featured: [
      
    ]
  })

  render(req, res, app)
})

WebRouter.use(express.static( path.join(BUILD_PATH) ))

// STOP ============================================== STOP
