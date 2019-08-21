import * as mongoose from 'mongoose'
import { ticketSchema, ITicketModel } from './ticket.model'

/**
 * @module
 * Venue Model Integrated with Controller
 * * Update the interface changing schema
 */

export const venueSchema = new mongoose.Schema(
  {
    ref: {
      type: String, required: true, unique: true
    },
    // owner = username of logged in user on admin
    venueTitle: {
      type: String, required: true, index: true
    },
    description: {
      type: String, required: true
    },
    categories: [String],
    city: {
      type: String, required: true
    },
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
    cuisines: String,
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
    defaultEntryType: ticketSchema,
    timings: [
      {
        day: { 
          type: String, enum: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ], required: true
        },
        isOpen: { 
          type: Boolean, required: true
        },
        openTime: {
          type: Number, required: true, min: 0, max: 720
        },
        closeTime: {
          type: Number, required: true, min: 0, max: 720
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
    media: {
      images: [
        {
          url: {
            type: String, required: true
          },
          tags: [String]
        }
      ],
      videoURL: String
    },
  },
  {
    collection: 'Venues'
  }
)

export interface IVenueModel extends mongoose.Document {
  ref: string,
  venueTitle: string,
  description: string,
  categories?: [string],
  city: string,
  locality?: string,
  address: string,
  altAddress?: string,
  nearestMetroStation?: string,
  coordinates?: {
    _lat: number,
    _lon: number
  },
  knownFor?: [string],
  cuisines?: string,
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
  defaultEntryType: ITicketModel,
  timings: [
    {
      day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
      isOpen: boolean,
      openTime: number,
      closeTime: number,
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
  media: {
    images: [
      {
        url: string,
        tags?: [string],
      }
    ],
    videoURL: string
  }
}

export const Venue = mongoose.model<IVenueModel>('Venue', venueSchema)
export default Venue
