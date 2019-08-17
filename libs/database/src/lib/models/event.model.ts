import * as mongoose from 'mongoose'
import { artistSchema, IArtistModel } from './artist.model'

/**
 * @module
 * User Model Integrated with Controller
 * * Update the interface changing schema
 */

 export const eventSchema = new mongoose.Schema(
  {
    ref: { 
      type: String, required: true, unique: true
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
        type: String, //required: true
      },
      images: [String]
    },
    tags: [String],
    hasCutomDetails: Boolean,
    customDetails: [
      {
        detailName: {
          type: String
        },
        detailData: {
          type: String
        }
      }
    ],
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
      city: { 
        type: String, //required: true 
      },
      venueId: String,
      title: {
        type: String, //required: true
      },
      address: String, 
      isCustomVenue: Boolean,
      customVenueDetails: {
        locality: String,
        coordinates: {
          _lat: { 
            type: Number, min: -180, max: 180 
          },
          _lon: { 
            type: Number, min: -180, max: 180 
          }
        }        
      }
    },
    scheduling: {
      startTime: { 
        type: Date, //required: true 
      },
      endTime: { 
        type: Date, //required: true 
      },
      isRecurring: Boolean,
      recurringType: { 
        type: String, enum: ['daily', 'weekly', 'monthly', 'custom']
      },
      isCustomRecurring: Boolean,
      customRecurring: {
        initial: {
          type: Date, //required: true
        },
        final: Date || Infinity,
        dates: [
          {
            date: { 
              type: Date, //required: true 
            },
            startTime: { 
              type: Date, //required: true 
            },
            endTime: { 
              type: Date, //required: true
            }
          }
        ]
      }
    },
    bookings: {
      tickets: [
        {
          ticketId: String,
          price: Number,
          activateTime: Date || Number,
          deactivateTime: Date || Number
        }
      ],
      isTakingOnsiteBookings: Boolean,
      isTakingOnsitePayments: Boolean,
      registrationURL: String,
      registrationPhone: String
    },
    media: {
      images: [String],
      videoURL: String
    }
  },
  {
    collection: 'Events'
  }
);

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
  hasCutomDetails?: boolean,
  customDetails?: [
    {
      detailName: string,
      detailData: string
    }
  ],
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
    tickets?: [
      {
        ticketId: string,
        price: number,
        activateTime?: Date | number,
        deactivateTime?: Date | number
      }
    ],
    isTakingOnsiteBookings?: boolean,
    isTakingOnsitePayments?: boolean,
    registrationURL?: string,
    registrationPhone?: string
  },
  media: {
    images: [string],
    videoURL: string
  }
}

export const Event = mongoose.model<IEventModel>('Event', eventSchema)
export default Event
