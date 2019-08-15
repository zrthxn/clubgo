import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { Offer } from '@clubgo/database'

/**
 * @description
 * * Offers Router
 * This Express Router handles all CRUD functions
 * related to Offers.
 */

export const OfferRouter = express.Router()
export default OfferRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
// Validate Offer Creation
OfferRouter.use('/_create', (req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// Validate Offer Deletion
OfferRouter.use('/_delete', (req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// CRUD Functions
// --------------------------------------------------------
// Read all Offers :: /admin/offer/_list
OfferRouter.get('/_list', async (req, res)=>{
  const offerStream = await Offer.find({})
  res.send({ result: offerStream })
})

// Read a Offer by ID :: /admin/offer/_get/:offerid
OfferRouter.get('/_get/:offerid', async (req, res)=>{
  const searchResult = await Offer.findOne({ _id: req.params.offerid })
  res.send({ message: 'Found', result: searchResult })
})

// Read a group of Offers by ID :: /admin/offer/_group
OfferRouter.post('/_group', async (req, res)=>{
  const { searchIds } = req.body
  for (let id of searchIds)
    id = mongoose.Types.ObjectId(id)
  
  const searchResult = await Offer.find({
    _id: { 
      $in: searchIds
    }
  })

  res.send({ 
    message: `Found ${searchResult.length} of ${searchIds.length}`,
    result: searchResult 
  })
})

// Create a Offer :: /admin/offer/_create
OfferRouter.post('/_create', async (req, res)=>{
  const { createBody } = req.body
  const createOffer = new Offer(createBody)

  try {
    const result = await createOffer.save()
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

// Update a Offer by ID :: /admin/offer/_update/:offerid
OfferRouter.put('/_update/:offerid', async (req, res)=>{
  const { updateBody } = req.body
  const result = await Offer.findOneAndUpdate(
    { 
      _id: req.params.Offerid 
    },
    updateBody
  )
  res.send({
    message: 'Updated',
    previous: result
  })
})

// Delete a Offer by ID :: /admin/offer/_delete/:offerid
OfferRouter.delete('/_delete/:offerid', async (req, res)=>{
  const result = await Offer.findOneAndDelete(
    { 
      _id: req.params.offerid 
    }
  )
  res.send({ 
    message:'Deleted', 
    result
  })
})
// STOP ============================================== STOP
