import * as mongoose from 'mongoose'
import VenueController from '../controllers/venue.controller'

/**
 * @module
 * Venue Model Integrated with Controller
 * * Update the interface changing schema *
 */

export const venueSchema = new mongoose.Schema(
  {
    ref: {
      type: String, required: true, unique: true // first 8 charecters (4 bytes) of ObjectID
    }, 
    title: {
      type: String, required: true
    },
    description: {
      type: String, required: true
    },
    categories: [String],
    locality: String,
    address: {
      type:String, required: true
    },
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
      isPublished: {
        type: Boolean, required: true
      },
      venuePriority: Number,
      isFeatured: Boolean,
      featured: {
        featuredText: String,
        featuredPriority: Number
      }
    },
    timings: [
      {
        day: { 
          type: String, enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], required: true
        },
        isOpen: { 
          type: Boolean, required: true
        },
        dayOpenTime: {
          type: Number, required: true, min: 0, max: 47
        },
        dayCloseTime: {
          type: Number, required: true, min: 0, max: 47
        },
        busy: Number
      }
    ],
    offers: [
      {
        isActive: {
          type: Boolean, required: true
        },
        offerName: {
          type: String, required: true
        },
        offerDescription: String,
        action: String, // RegExp // something like -15% or 1+1 or similar
      }
    ],
    images: [
      {
        url: {
          type: String, required: true
        },
        tags: [String]
      }
    ]
  },
  {
    collection: 'Venues'
  }
)

venueSchema.loadClass(VenueController)

export interface IVenueModel extends mongoose.Document {
  ref: string,
  title: string,
  description: string,
  categories?: [string],
  locality?: string,
  address: string,
  altAddress?: string,
  nearestMetroStation?: string,
  coordinates?: {
    _lat: number,
    _lon: number
  },
  knownFor?: [string],
  cuisines?: [string],
  facilities?: [string],
  costForTwo?: number,
  settings: {
    isPublished: boolean,
    venuePriority?: number,
    isFeatured?: boolean,
    featured?: {
      featuredText?: string,
      featuredPriority?: number
    }
  },
  timings: [
    {
      day: string,
      isOpen: boolean,
      dayOpenTime: number,
      dayCloseTime: number,
      busy?: number,
    }
  ],
  offers: [
    {
      isActive: boolean,
      offerName?: string,
      offerDescription?: string,
      action?: string, // RegExp // something like -15% or 1+1 or similar
    }
  ],
  images: [
    {
      url: string,
      tags?: [string],
    }
  ]
}

export const Venue = mongoose.model<IVenueModel>('Venue', venueSchema)
export default Venue
