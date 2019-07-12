import * as mongoose from 'mongoose'

export const venueSchema = new mongoose.Schema(
  {
    title: {
      type: String, required: true
    },
    categories: [String],
    description: {
      type: String, required: true
    },
    locality: String,
    address: String,
    altAddress: String,
    nearestMetroStation: String,
    coordinates: {
      _lat: {
        type: Number, required: true, min: -180, max: 180
      },
      _lon: {
        type: Number, required: true, min: -180, max: 180
      }
    },
    knownFor: [String],
    cuisines: [String],
    facilities: [String],
    costForTwo: {
      type: Number, min: 0
    },
    settings: {
      isPublished: Boolean,
      venuePriority: Number,
      isFeatured: Boolean,
      featured: {
        featuredText: String,
        featuredPriority: Number
      }
    },
    timings: [
      {
        day: String,
        isOpen: Boolean,
        openTime: {
          type: Number, required: true, min: 0, max: 47
        },
        closeTime: {
          type: Number, required: true, min: 0, max: 47
        },
        busy: Number 
      }
    ],
    offers: [
      {
        isActive: Boolean,
        offerName: String,
        offerDescription: String,
        action: RegExp // something like -15% or 1+1 or similar
      }
    ],
    images: [
      {
        resourceType: {
          type: String, enum: ['cdn', 'ext', 'url', 'base64'], required: true
        },
        resource: {
          type: String || Buffer, required: true
        },
        tags: [String]
      }
    ]
  },
  {
    collection: 'Venues'
  }
)

import venueController from '../controllers/venue.controller'
venueSchema['actions'] = venueController

export const Venue = mongoose.model('Venue', venueSchema)
export default Venue
