import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { Venue } from '@clubgo/database'

const VenueAdminRouter = express.Router()

// Read all venues :: /admin/venue/_all
VenueAdminRouter.get('/_list', async (req, res)=>{
  const venueStream = await Venue.find({}).cursor({transform: JSON.stringify})
  venueStream.pipe(res.type('json'))
})

// Read a venue by ID :: /admin/venue/_get/:venueid
VenueAdminRouter.get('/_get/:venueid', async (req, res)=>{
  const searchResult = await Venue.findOne({ _id: req.params.userid })
  res.send({ message: 'found', result: searchResult })
})

// Read a group of venues by ID :: /admin/venue/_group
VenueAdminRouter.post('/_group', async (req, res)=>{
  const { searchIds } = req.body
  for (let id of searchIds)
    id = mongoose.Types.ObjectId(id)
  
  const searchResult = await Venue.find({
    _id: { 
      $in: searchIds
    }
  })

  res.send({ 
    message: `found ${searchResult.length} of ${searchIds.length}`,
    result: searchResult 
  })
})

// Create a venue :: /admin/venue/_create
VenueAdminRouter.post('/_create', async (req, res)=>{
  const { createBody } = req.body
  const createVenue = new Venue(createBody)

  try {
    const result = await createVenue.save()
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

// Update a venue by ID :: /admin/venue/_update/:venueid
VenueAdminRouter.put('/_update/:venueid', async (req, res)=>{
  const { updateBody } = req.body
  const result = await Venue.findOneAndUpdate(
    { 
      _id: req.params.venueid 
    },
    updateBody
  )
  res.send({
    result: 'updated',
    previous: result
  })
})

// Delete a venue by ID :: /admin/venue/_delete/:venueid
VenueAdminRouter.delete('/_delete/:venueid', async (req, res)=>{
  const result = await Venue.findOneAndDelete(
    { 
      _id: req.params.venueid 
    }
  )
  res.send({ 
    result:'deleted', 
    message: result
  })
})

export default VenueAdminRouter
