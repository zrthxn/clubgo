import express from 'express'
import { Event } from '@clubgo/database'

const EventAdminRouter = express.Router()

// Get all events
EventAdminRouter.get('/', async (req, res)=>{
  const events = await Event.find({})
  res.send( events )
})

// Create a event
EventAdminRouter.post('/_create', (req, res)=>{
  
})

// Read a event by ID
EventAdminRouter.get('/:eventid', async (req, res)=>{
  
})

// Update a event by ID
EventAdminRouter.put('/_update/:eventid', (req, res)=>{

})

// Delete a event by ID
EventAdminRouter.delete('/_delete/:eventid', (req, res)=>{

})

export default EventAdminRouter
