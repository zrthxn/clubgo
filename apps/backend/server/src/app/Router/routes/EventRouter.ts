import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { Event } from '@clubgo/database'

/**
 * @description
 * * Events Router
 * This Express Router handles all CRUD functions
 * related to Events.
 */

export const EventRouter = express.Router()
export default EventRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
// Validate Event Creation
EventRouter.use('/_create', (req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

EventRouter.use('/_update', (req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// Validate Event Deletion
EventRouter.use('/_delete', (req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// CRUD Functions
// --------------------------------------------------------
// Read all events :: /admin/event/_all
EventRouter.get('/_list', async (req, res)=>{
  const eventStream = await Event.find({})//.cursor({transform: JSON.stringify})
  // eventStream.pipe(res.type('json'))
  res.send({ results: eventStream })
})

// Read a event by ID :: /admin/event/_get/:eventid
EventRouter.get('/_get/:eventid', async (req, res)=>{
  const searchResult = await Event.findOne({ _id: req.params.userid })
  res.send({ message: 'Found', result: searchResult })
})

// Read a group of venues by ID :: /admin/event/_find
EventRouter.post('/_find', async (req, res)=>{
  const { searchQuery } = req.body  
  const searchResult = await Event.find({ ...searchQuery })

  res.send({ 
    message: `Found ${searchResult.length} matching records`,
    result: searchResult 
  })
})

// Read a group of events by ID :: /admin/event/_group
EventRouter.post('/_group', async (req, res)=>{
  const { searchIds } = req.body
  for (let id of searchIds)
    id = mongoose.Types.ObjectId(id)
  
  const searchResult = await Event.find({
    _id: { 
      $in: searchIds
    }
  })

  res.send({ 
    message: `Found ${searchResult.length} of ${searchIds.length}`,
    result: searchResult 
  })
})

// Create a event :: /admin/event/_create
EventRouter.post('/_create', async (req, res)=>{
  const { createBody } = req.body
  createBody.ref = Date.now().toString(36)

  try {
    const createEvent = new Event(createBody)
    const result = await createEvent.save()
    res.status(201)
    .send({ 
      message: 'Created',
      result: result._id
    })
  } catch (err) {
    console.log(conf.Red(err))
    res.status(400).send({ error: err })
  }
})

// Update a event by ID :: /admin/event/_update/:eventid
EventRouter.put('/_update/:eventid', async (req, res)=>{
  const { updateBody } = req.body
  const result = await Event.findOneAndUpdate(
    { 
      _id: req.params.eventid 
    },
    updateBody
  )
  res.send({
    result: 'Updated',
    previous: result
  })
})

// Delete a event by ID :: /admin/event/_delete/:eventid
EventRouter.delete('/_delete/:eventid', async (req, res)=>{
  const result = await Event.findOneAndDelete(
    { 
      _id: req.params.eventid 
    }
  )
  res.send({ 
    result:'Deleted', 
    message: result
  })
})
// STOP ============================================== STOP
