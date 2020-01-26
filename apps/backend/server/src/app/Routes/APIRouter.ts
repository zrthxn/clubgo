import express from 'express'
import { conf } from '@clubgo/util'
import * as ENV from '@clubgo/env'

import { ModelController, EventController, VenueController } from '@clubgo/database'
import { Category, Artist, DressCode, User, Offer, Ticket, Location, Advert } from '@clubgo/database'

import { requestValidation, ALLOW } from '../Auth/Validation'

export const APIRouter = express.Router()
export default APIRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
APIRouter.use(requestValidation)

// Admin Functions
// --------------------------------------------------------
APIRouter.get('/', (req, res, next)=>{
  res.write('ClubGo API Backend. \n')
  next()
})

// CRUD Functions
// --------------------------------------------------------
// Bookings Router
import BookingRouter from './BookingRouter'
APIRouter.use('/booking', BookingRouter)

// Events Router
const EventRouter = new EventController()
// EventRouter.secure('/_delete/:objectid', ALLOW(ENV.ADMIN_KEY))
APIRouter.use('/event', EventRouter.router())

// Venues Router
const VenueRouter = new VenueController()
APIRouter.use('/venue', VenueRouter.router())

// Users Router
const UserRouter = new ModelController(User)
APIRouter.use('/user', UserRouter.router())

// Adverts Router
const AdvertRouter = new ModelController(Advert)
APIRouter.use('/ads', AdvertRouter.router())

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
