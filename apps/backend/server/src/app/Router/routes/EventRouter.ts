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
  const eventStream = await Event.find({}).cursor({transform: JSON.stringify})
  eventStream.pipe(res.type('json'))
})

// Read a event by ID :: /admin/event/_get/:eventid
EventRouter.get('/_get/:eventid', async (req, res)=>{
  const searchResult = await Event.findOne({ _id: req.params.userid })
  res.send({ message: 'found', result: searchResult })
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
    message: `found ${searchResult.length} of ${searchIds.length}`,
    result: searchResult 
  })
})

// Create a event :: /admin/event/_create
EventRouter.post('/_create', async (req, res)=>{
  const { createBody } = req.body
  const createEvent = new Event(createBody)

  try {
    const result = await createEvent.save()
    res.status(201)
    .send({ 
      message: 'created',
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
    result: 'updated',
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
    result:'deleted', 
    message: result
  })
})
// STOP ============================================== STOP
