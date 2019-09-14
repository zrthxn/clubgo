import express from 'express'
import { conf } from '@clubgo/util'
import { ModelledCRUDRouter } from '@clubgo/database'
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
const EventRouter = new ModelledCRUDRouter(Event).create()
APIRouter.use('/event', EventRouter)

const VenueRouter = new ModelledCRUDRouter(Venue).create()
APIRouter.use('/venue', VenueRouter)

const UserRouter = new ModelledCRUDRouter(User).create()
APIRouter.use('/user', UserRouter)

const OfferRouter = new ModelledCRUDRouter(Offer).create()
APIRouter.use('/offer', OfferRouter)

const TicketRouter = new ModelledCRUDRouter(Ticket).create()
APIRouter.use('/ticket', TicketRouter)

// STOP ============================================== STOP
