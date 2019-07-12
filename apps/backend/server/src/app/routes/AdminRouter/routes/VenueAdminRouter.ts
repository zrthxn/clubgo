import express from 'express'
import { Venue } from '@clubgo/database'

const VenueAdminRouter = express.Router()

// Get all Venues
VenueAdminRouter.get('/', async (req, res)=>{
  const Venues = await Venue.find({})
  res.send( Venues )
})

// Create a Venue
VenueAdminRouter.post('/_create', (req, res)=>{
  
})

// Read a Venue by ID
VenueAdminRouter.get('/:venueid', async (req, res)=>{
  
})

// Update a Venue by ID
VenueAdminRouter.put('/_update/:venueid', (req, res)=>{

})

// Delete a Venue by ID
VenueAdminRouter.delete('/_delete/:venueid', (req, res)=>{

})

export default VenueAdminRouter
