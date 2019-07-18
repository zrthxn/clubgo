import * as mongoose from 'mongoose'
import EventController from '../controllers/event.controller'

import { artistSchema, IArtistModel } from './artist.model'

/**
 * @module
 * User Model Integrated with Controller
 * * Update the interface changing schema *
 */

 export const eventSchema = new mongoose.Schema(
  {
    ref: { 
      type: String, required: true, unique: true // first 8 charecters (4 bytes) of ObjectID
    },
    eventTitle: { 
      type: String, required: true
    },
    description: { 
      type: String, required: true 
    },
    categories: [String],
    tagline: String,
    flashText: String,
    artists: [ artistSchema ],
    music: [String],
    dressCode: {
      title: {
        type: String, required: true
      },
      images: [String]
    },
    tags: [String],
    custom: {
      hasCutomDetails: Boolean,
      customDetails: [
        {
          detailName: {
            type: String, required: true
          },
          detailData: {
            type: String, required: true
          }
        }
      ],
    },
    settings: {
      isPublished: {
        type: Boolean, required: true
      },
      eventPriority: Number,
      isFeatured: Boolean,
      featured: {
        featuredText: String,
        featuredPriority: Number
      }
    },
    venue: {
      venueType: { 
        type: String, enum: ['regular', 'custom'], required: true 
      },
      city: { 
        type: String, required: true 
      },
      venueId: String,
      title: {
        type: String, required: true
      },
      address: String, 
      isCustomVenue: Boolean,
      customVenueDetails: {
        locality: String,
        coordinates: {
          _lat: { 
            type: Number, required: true, min: -180, max: 180 
          },
          _lon: { 
            type: Number, required: true, min: -180, max: 180 
          }
        }        
      }
    },
    scheduling: {
      startTime: { 
        type: Date, required: true 
      },
      endTime: { 
        type: Date, required: true 
      },
      isRecurring: Boolean,
      recurringType: { 
        type: String, enum: ['daily', 'weekly', 'monthly', 'custom']
      },
      isCustomRecurring: Boolean,
      customRecurring: {
        initial: {
          type: Date, required: true
        },
        final: Date || Infinity,
        dates: [
          {
            date: { 
              type: Date, required: true 
            },
            startTime: { 
              type: Date, required: true 
            },
            endTime: { 
              type: Date, required: true
            }
          }
        ]
      }
    },
    bookings: {
      isTakingOnsiteBookings: Boolean,
      isTakingOnsitePayments: Boolean,
      tickets: [
        {
          ticketId: String,
          price: Number,
          activateTime: Date || Number,
          deactivateTime: Date || Number
        }
      ],
      registrationURL: String,
      registrationPhone: String
    },
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
    collection: 'Events'
  }
);

eventSchema.loadClass(EventController)

export interface IEventModel extends mongoose.Document {
  ref: string,
  eventTitle: string,
  description: string,
  categories?: [string],
  tagline?: string,
  flashText?: string,
  artists?: [ IArtistModel ],
  music?: [string],
  dressCode?: {
    title: string,
    images?: [string],
  },
  tags?: [string],
  custom?: {
    hasCutomDetails?: boolean,
    customDetails?: [
      {
        detailName: string,
        detailData: string
      }
    ]
  },
  settings: {
    isPublished: boolean,
    eventPriority?: number,
    isFeatured?: boolean,
    featured?: {
      featuredText?: string,
      featuredPriority?: number
    }
  },
  venue: {
    venueType: 'regular' | 'custom',
    city: string,
    venueId?: string,
    title: string,
    address?: string, 
    isCustomVenue?: boolean,
    customVenueDetails?: {
      locality?: string,
      coordinates?: {
        _lat: number,
        _lon: number
      }
    }
  },
  scheduling: {
    startTime: Date,
    endTime: Date,
    isRecurring?: boolean,
    recurringType?: 'daily' | 'weekly' | 'monthly' | 'custom',
    isCustomRecurring?: boolean,
    customRecurring: {
      initial: Date,
      final?: Date | number,
      dates: [
        {
          date: Date,
          startTime: Date,
          endTime: Date
        }
      ]
    }
  },
  bookings: {
    isTakingOnsiteBookings?: boolean,
    isTakingOnsitePayments?: boolean,
    tickets?: [
      {
        ticketId: string,
        price: number,
        activateTime?: Date | number,
        deactivateTime?: Date | number
      }
    ],
    registrationURL?: string,
    registrationPhone?: string
  },
  images: [
    {
      url: string,
      tags?: [string]
    }
  ]
}

export const Event = mongoose.model<IEventModel>('Event', eventSchema)
export default Event
