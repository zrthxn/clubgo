import express from 'express'
import { Event, Venue, User, Offer } from '@clubgo/database'
import { conf } from '@clubgo/util'
import { CRUDRouter } from '@clubgo/database'

export const APIRouter = express.Router()
export default APIRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
APIRouter.use((req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// Admin Functions
// --------------------------------------------------------
APIRouter.get('/', (req, res, next)=>{
  res.write('ClubGo API Backend. \n')
  next()  
})

// CRUD Functions
// --------------------------------------------------------
const EventRouter = new CRUDRouter(Event).createRouter({ addDefaults: true })
APIRouter.use('/event', EventRouter)

const VenueRouter = new CRUDRouter(Venue).createRouter({ addDefaults: true })
APIRouter.use('/venue', VenueRouter)

const UserRouter = new CRUDRouter(User).createRouter({ addDefaults: true })
APIRouter.use('/user', UserRouter)

const OfferRouter = new CRUDRouter(Offer).createRouter({ addDefaults: true })
APIRouter.use('/offer', OfferRouter)

// STOP ============================================== STOP

APIRouter.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.write('405 Request Forcefully Closed. \nYour request was caught but did not match any paths.')
  res.end()
})