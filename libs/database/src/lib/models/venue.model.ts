import mongoose from 'mongoose'

export const venueSchema = new mongoose.Schema(
  {
    venueName: String
  }, 
  {
    collection: 'Venues'
  }
)

import venueController from '../controllers/venue.controller'
venueSchema.actions = venueController

export const Venue = mongoose.model('Venue', venueSchema)
export default Venue
