import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { Event } from '@clubgo/database'

const EventAdminRouter = express.Router()

// Read all events :: /admin/event/_all
EventAdminRouter.get('/_list', async (req, res)=>{
  const eventStream = await Event.find({}).cursor({transform: JSON.stringify})
  eventStream.pipe(res.type('json'))
})

// Read a event by ID :: /admin/event/_get/:eventid
EventAdminRouter.get('/_get/:eventid', async (req, res)=>{
  const searchResult = await Event.findOne({ _id: req.params.userid })
  res.send({ message: 'found', result: searchResult })
})

// Read a group of events by ID :: /admin/event/_group
EventAdminRouter.post('/_group', async (req, res)=>{
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
EventAdminRouter.post('/_create', async (req, res)=>{
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
EventAdminRouter.put('/_update/:eventid', async (req, res)=>{
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
EventAdminRouter.delete('/_delete/:eventid', async (req, res)=>{
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

export default EventAdminRouter
