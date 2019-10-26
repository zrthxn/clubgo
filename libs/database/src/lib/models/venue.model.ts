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
    owner: { 
      type: String, required: true
    },
    venueTitle: {
      type: String, required: true
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
          type: Number, required: true, min: 0, max: 1440
        },
        closeTime: {
          type: Number, required: true, min: 0, max: 1440
        },
        busy: Number
      }
    ],
    media: {
      cover: {
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
      food: {
        images: [
          {
            url: {
              type: String, required: true
            },
            tags: [String]
          }
        ]
      },
      ambiance: {
        images: [
          {
            url: {
              type: String, required: true
            },
            tags: [String]
          }
        ]
      },
      bar: {
        images: [
          {
            url: {
              type: String, required: true
            },
            tags: [String]
          }
        ]
      }
    },
  },
  {
    collection: 'Venues'
  }
)

venueSchema.index({ 
  venueTitle: 'text',
  description: 'text',
  categories: 'text',
  city: 'text',
  locality: 'text'
})

export interface IVenueModel extends mongoose.Document {
  ref: string
  venueTitle: string
  description: string
  categories?: Array<string>
  city: string
  locality?: string
  address: string
  altAddress?: string
  nearestMetroStation?: string
  coordinates?: {
    _lat: number
    _lon: number
  }
  knownFor?: Array<string>
  cuisines?: string
  facilities?: Array<string>
  costForTwo?: number
  settings: {
    isPublished: boolean
    venuePriority?: number
    isFeatured?: boolean
    featured?: {
      featuredText?: string
      featuredPriority?: number
    }
  }
  defaultEntryType?: ITicketModel
  timings: Array<{
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
    isOpen: boolean
    openTime: number
    closeTime: number
    busy?: number
  }>
  media: {
    cover: {
      images: Array<{
        url: string
        tags?: Array<string>
      }>
      videoURL?: string
    }
    food: {
      images: Array<{
        url: string
        tags?: Array<string>
      }>
    }
    ambiance: {
      images: Array<{
        url: string
        tags?: Array<string>
      }>
    }
    bar: {
      images: Array<{
        url: string
        tags?: Array<string>
      }>
    }
  }
}

export const Venue = mongoose.model<IVenueModel>('Venue', venueSchema)
export default Venue
