import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { Venue } from '@clubgo/database'
import url from 'url'

// import CRUDRouter from './CRUDRouter'

/**
 * @description
 * * Venues Router
 * This Express Router handles all CRUD functions
 * related to Venues.
 */

export const VenueRouter = express.Router()
// export const VenueRouter = new CRUDRouter(Venue).createRouter({ addDefaults: true })
export default VenueRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
// Validate Venue Creation
// VenueRouter.use('/_create', (req, res, next)=>{
//   // If req has ADMIN level access token, allow and DEL token header
//   // Else, 403
//   next()
// })

// VenueRouter.use('/_update', (req, res, next)=>{
//   // If req has ADMIN level access token, allow and DEL token header
//   // Else, 403
//   next()
// })

// // Validate Venue Deletion
// VenueRouter.use('/_delete', (req, res, next)=>{
//   // If req has ADMIN level access token, allow and DEL token header
//   // Else, 403
//   next()
// })

// CRUD Functions
// --------------------------------------------------------
// Read all venues :: /admin/venue/_all
VenueRouter.get('/_list', async (req, res)=>{
  const venueStream = await Venue.find({})//.cursor({transform: JSON.stringify})
  // venueStream.pipe(res.type('json'))
  res.send({ results: venueStream })
})

// Read a venue by ID :: /admin/venue/_get/:venueid
VenueRouter.get('/_get/:venueid', async (req, res)=>{
  const searchResult = await Venue.findOne({ _id: req.params.venueid })
  res.send({ message: 'Found', result: searchResult })
})

// Read a group of venues by ID :: /admin/venue/_find
VenueRouter.post('/_find', async (req, res)=>{
  const { searchQuery } = req.body  
  const searchResult = await Venue.find({ ...searchQuery })

  res.send({ 
    message: `Found ${searchResult.length} matching records`,
    result: searchResult 
  })
})

// Read a group of venues by ID :: /admin/venue/_group
VenueRouter.post('/_group', async (req, res)=>{
  const { searchIds } = req.body
  for (let id of searchIds)
    id = mongoose.Types.ObjectId(id)
  
  const searchResult = await Venue.find({
    _id: { 
      $in: searchIds
    }
  })

  res.send({ 
    message: `Found ${searchResult.length} of ${searchIds.length}`,
    result: searchResult 
  })
})

// Create a venue :: /admin/venue/_create
VenueRouter.post('/_create', async (req, res)=>{
  const { createBody } = req.body
  createBody.ref = Date.now().toString(36)
  
  try {
    const createVenue = new Venue(createBody)
    const result = await createVenue.save()
    return res.status(201)
    .send({
      message: 'Created',
      result: result._id
    })
  } catch (err) {
    console.log(conf.Red(err))
    return res.status(400).send(err)
  }
})

// Update a venue by ID :: /admin/venue/_update/:venueid
VenueRouter.put('/_update/:venueid', async (req, res)=>{
  const { updateBody } = req.body
  const result = await Venue.findOneAndUpdate(
    { 
      _id: req.params.venueid 
    },
    updateBody
  )
  res.send({
    result: 'Updated',
    previous: result
  })
})

// Delete a venue by ID :: /admin/venue/_delete/:venueid
VenueRouter.delete('/_delete/:venueid', async (req, res)=>{
  const result = await Venue.findOneAndDelete(
    { 
      _id: req.params.venueid 
    }
  )
  res.send({ 
    result:'Deleted', 
    message: result
  })
})
// STOP ============================================== STOP