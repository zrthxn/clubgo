import express from 'express'
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

// Web Functions
// --------------------------------------------------------
WebRouter.get('/', (req, res)=>{
  res.send({ message: 'web' })
})

// CRUD Functions
// --------------------------------------------------------
const EventRouter = new CRUDRouter(Event).createRouter({ addDefaults: true })
WebRouter.use('/event', EventRouter)

const VenueRouter = new CRUDRouter(Venue).createRouter({ addDefaults: true })
WebRouter.use('/venue', VenueRouter)

const UserRouter = new CRUDRouter(User).createRouter({ addDefaults: true })
WebRouter.use('/user', UserRouter)

const OfferRouter = new CRUDRouter(Offer).createRouter({ addDefaults: true })
WebRouter.use('/offer', OfferRouter)

// STOP ============================================== STOP