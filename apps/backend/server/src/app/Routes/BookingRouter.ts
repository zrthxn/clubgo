import express from 'express'
import path from 'path'
import * as mongoose from 'mongoose'
import { Booking } from '@clubgo/database'
import { conf } from '@clubgo/util'

export const BookingRouter = express.Router()
export default BookingRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
BookingRouter.use((req, res, next)=>{
  next()
})

// ========================================================

import SendSMS from '../Services/SMSWorker'

// Create a Booking :: /_create
BookingRouter.post('/_create', async (req, res) => {
  let { ticket, user, txn, event, venue } = req.body.createBody

  let createBooking = new Booking({
    createdOn: (new Date()).toJSON(),
    bookingReference: Date.now().toString(36).toUpperCase(),
    ticketId: ticket.ticketId,
    ...user,
    people: ticket.people,
    payment: txn,
    event: {
      eventTitle: event.eventTitle,
      eventId: event._id,
      startTime: event.scheduling.timing.startTime,
      endTime: event.scheduling.timing.endTime
    },
    venue: {
      venueTitle: venue.venueTitle,
      city: venue.city,
      locality: venue.locality,
      venueId: venue._id,
    },
    schedule: {
      date: ticket.date,
      time: ticket.time
    },
    appliedOffers: [ ...ticket.appliedOffers ]
  })

  try {
    const result = await createBooking.save()
    
    // Send confirmation email
    
    // SendSMS(user.phone, 'bookuser', 
    //   `Hey ${user.name}, Your Booking details for ${event.eventTitle} on ${ticket.date} are mentioned below.` +
    //   `Booking ID ${result._id}` +
    //   `No. of people ${ticket.people.couple} couples and ${ticket.people.female} females` +
    //   `Entry time ${ticket.time} to ${ticket.time} ` +
    //   `Amount ${txn.amount} Pay at Venue . ` +
    //   `Facing an issue, Please feel free to reach us at 9999030363.`
    // )

    // Add to some spreadsheet

    res.status(201).send({ 
      message: 'Created',
      results: result
    })
  } catch (err) {
    console.log(conf.Red(err))
    res.status(400).send({ error: err })
  }
})

// Read all Bookings :: /_list
BookingRouter.get('/_list', async (req, res) => {
  const stream = await Booking.find({})
  res.send({ results: stream })
})

// Read a Booking by ID :: /_get/:bookingId
BookingRouter.get('/_get/:bookingId', async (req, res) => {
  const searchResult = await Booking.findOne({ _id: req.params.bookingId })
  res.send({ message: 'Found', results: searchResult })
})

// Read a group of Bookings by ID :: /_group
BookingRouter.post('/_group', async (req, res) => {
  const { searchIds } = req.body
  for (let id of searchIds) id = mongoose.Types.ObjectId(id)
  
  const searchResult = await Booking.find({
    _id: { 
      $in: searchIds
    }
  })

  res.send({ 
    message: `Found ${searchResult.length} of ${searchIds.length}`,
    results: searchResult 
  })
})

// Search for venues :: /_search
BookingRouter.post('/_search', async (req, res) => {
  const { query } = req.body
  const searchResult = await Booking.find({ ...query })

  res.send({ 
    message: `Found ${searchResult.length} matching records`,
    results: searchResult 
  })
})

// Update a Booking by ID :: /_update/:bookingId
BookingRouter.put('/_update/:bookingId', async (req, res) => {
  const { updateBody } = req.body
  const result = await Booking.findOneAndUpdate(
    { 
      _id: req.params.bookingId 
    },
    updateBody
  )

  res.status(200).send({
    message: 'Updated',
    previous: result,
    updated: updateBody
  })
})

// Delete a Booking by ID :: /_delete/:bookingId
BookingRouter.delete('/_delete/:bookingId', async (req, res) => {
  const results = await Booking.findOneAndDelete(
    { 
      _id: req.params.bookingId 
    }
  )

  res.send({ 
    message: 'Deleted', 
    results
  })
})
  
// STOP ============================================== STOP
