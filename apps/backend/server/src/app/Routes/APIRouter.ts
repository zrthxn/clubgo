import express from 'express'
import { conf } from '@clubgo/util'
import { CRUDRouter } from '@clubgo/database'
import { Event, Venue, User, Offer, Ticket } from '@clubgo/database'

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
const EventRouter = new CRUDRouter(Event).create()
APIRouter.use('/event', EventRouter)

const VenueRouter = new CRUDRouter(Venue).create()
APIRouter.use('/venue', VenueRouter)

const UserRouter = new CRUDRouter(User).create()
APIRouter.use('/user', UserRouter)

const OfferRouter = new CRUDRouter(Offer).create()
APIRouter.use('/offer', OfferRouter)

const TicketRouter = new CRUDRouter(Ticket).create()
APIRouter.use('/ticket', TicketRouter)

// STOP ============================================== STOP

APIRouter.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.write('405 Request Forcefully Closed. \nYour request was caught but did not match any paths.')
  res.end()
})