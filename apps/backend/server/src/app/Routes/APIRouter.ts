import express from 'express'
import { conf } from '@clubgo/util'
import { ModelController, EventController, Category, Artist, DressCode } from '@clubgo/database'
import { Venue, User, Offer, Ticket, Location, Advert } from '@clubgo/database'
import BookingRouter from './BookingRouter'

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

// Events Router
const EventRouter = new EventController()
APIRouter.use('/event', EventRouter.router())

// Venues Router
const VenueRouter = new ModelController(Venue)
APIRouter.use('/venue', VenueRouter.router())

// Bookings Router
APIRouter.use('/booking', BookingRouter)

// Users Router
const UserRouter = new ModelController(User)
APIRouter.use('/user', UserRouter.router())

// Adverts Router
const AdvertRouter = new ModelController(Advert)
APIRouter.use('/ads', AdvertRouter.router())

// --------------------------

// Offers Router
const OfferRouter = new ModelController(Offer)
APIRouter.use('/offer', OfferRouter.router())

// Tickets Router
const TicketRouter = new ModelController(Ticket)
APIRouter.use('/ticket', TicketRouter.router())

// Tickets Router
const ArtistRouter = new ModelController(Artist)
APIRouter.use('/artist', TicketRouter.router())

// Locations Router
const LocationRouter = new ModelController(Location)
APIRouter.use('/location', LocationRouter.router())

// Categories Router
const CategoryRouter = new ModelController(Category)
APIRouter.use('/category', CategoryRouter.router())

// Dress Code Router
const DressCodeRouter = new ModelController(DressCode)
APIRouter.use('/dress', DressCodeRouter.router())

// STOP ============================================== STOP
