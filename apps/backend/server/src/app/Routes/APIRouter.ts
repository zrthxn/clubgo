import express from 'express'
import { conf } from '@clubgo/util'
import { ModelController, EventController, BookingController } from '@clubgo/database'
import { Venue, User, Offer, Ticket, Location } from '@clubgo/database'

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
const EventRouter = new EventController()
APIRouter.use('/event', EventRouter.router())

const VenueRouter = new ModelController(Venue)
APIRouter.use('/venue', VenueRouter.router())

const BookingRouter = new BookingController()
APIRouter.use('/booking', BookingRouter.router())

const UserRouter = new ModelController(User)
APIRouter.use('/user', UserRouter.router())

const OfferRouter = new ModelController(Offer)
APIRouter.use('/offer', OfferRouter.router())

const TicketRouter = new ModelController(Ticket)
APIRouter.use('/ticket', TicketRouter.router())

const LocationRouter = new ModelController(Location)
APIRouter.use('/location', LocationRouter.router())

// STOP ============================================== STOP
