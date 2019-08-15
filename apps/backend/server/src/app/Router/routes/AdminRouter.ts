import express from 'express'
import { Event, Venue, User, Offer } from '@clubgo/database'
import { conf } from '@clubgo/util'
import { CRUDRouter } from '@clubgo/database'

export const AdminRouter = express.Router()
export default AdminRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
AdminRouter.use((req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// Admin Functions
// --------------------------------------------------------
AdminRouter.get('/', (req, res)=>{
  res.send({ message: 'admin' })
})

// CRUD Functions
// --------------------------------------------------------
const EventRouter = new CRUDRouter(Event).createRouter({ addDefaults: true })
AdminRouter.use('/event', EventRouter)

const VenueRouter = new CRUDRouter(Venue).createRouter({ addDefaults: true })
AdminRouter.use('/venue', VenueRouter)

const UserRouter = new CRUDRouter(User).createRouter({ addDefaults: true })
AdminRouter.use('/user', UserRouter)

const OfferRouter = new CRUDRouter(Offer).createRouter({ addDefaults: true })
AdminRouter.use('/offer', OfferRouter)

// STOP ============================================== STOP