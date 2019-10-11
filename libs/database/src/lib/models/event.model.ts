import * as mongoose from 'mongoose'
import { artistSchema, IArtistModel } from './artist.model'
import { ticketSchema, ITicketModel } from './ticket.model'
import { offerSchema, IOfferModel } from './offer.model'

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
    owner: { 
      type: String, required: true
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
            type: Number, min: -180, max: 180 
          },
          _lon: { 
            type: Number, min: -180, max: 180 
          }
        }        
      }
    },
    scheduling: {
      isRecurring: {
        type: Boolean, required: true
      },
      recurringType: { 
        type: String, enum: [ 'none', 'daily', 'weekly', 'monthly', 'custom' ]
      },
      startTime: { 
        type: Date, //required: true 
      },
      endTime: { 
        type: Date, //required: true 
      },
      isCustomRecurring: Boolean,
      customRecurring: {
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
      isTakingOnsiteBookings: Boolean,
      isTakingOnsitePayments: Boolean,
      details: String,
      taxPercent: {
        type: Number, min: 0, max: 100, default: 18
      },
      processingFeePercent: {
        type: Number, min: 0, max: 100, default: 0
      },
      tickets: [
        {
          entry: {
            ticketTitle: {
              type: String, required: true
            },
            entryType: {
              type: String, required: true, enum: [ 'couple', 'stag' ]
            },
            pricing: {
              couple: {
                admissionPrice: Number,
                bookingDescription: String,
                discount: {
                  type: Number, min: 0, max: 100
                },
                malesPerCoupleRatio: {
                  type: Number, min: 1
                },
                female: {
                  admissionPrice: Number,
                  bookingDescription: String,
                  discount: {
                    type: Number, min: 0, max: 100, default: 0
                  }
                },
                male: {
                  admissionPrice: Number,
                  bookingDescription: String,
                  discount: {
                    type: Number, min: 0, max: 100, default: 0
                  }
                },
              },      
              stag: {
                admissionPrice: Number,
                bookingDescription: String,
                discount: {
                  type: Number, min: 0, max: 100
                }
              }
            }
          },
          activate: {
            type: Number, min: 0, max: 720
          },
          deactivate: {
            type: Number, min: 0, max: 720
          }
        }
      ],
      registrationURL: String,
      registrationPhone: String
    },
    offers: {
      maxOffers: Number,
      availableOffers: [
        {
          owner: { 
            type: String, required: true
          },
          offerTitle: {
            type: String, required: true, unique: true
          },
          description: {
            type: String, required: true, maxlength: 250
          },
          category: {
            type: String, required: true, enum: [ 'flat', 'payment', 'coupon', 'platform' ]
          },
          discountPercent: {
            type: Number, min: 0, max: 100, default: 0, required: true
          },
          terms: String
        }
      ]
    },
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
    }
  },
  {
    collection: 'Events'
  }
)

eventSchema.index({ 
  eventTitle: 'text',
  tagline: 'text'
})

export interface IEventModel extends mongoose.Document {
  ref: string
  eventTitle: string
  description: string
  categories?: Array<string>
  tagline?: string
  flashText?: string
  artists?: Array<IArtistModel>
  music?: Array<string>
  dressCode?: {
    title: string
    images?: Array<string>
  }
  tags?: Array<string>
  hasCutomDetails?: boolean
  customDetails?: Array<{
    detailName: string
    detailData: string
  }>
  settings: {
    isPublished: boolean
    eventPriority?: number
    isFeatured?: boolean
    featured?: {
      featuredText?: string
      featuredPriority?: number
    }
  }
  venue: {
    city: string
    venueId?: string
    title: string
    address?: string 
    isCustomVenue?: boolean
    customVenueDetails?: {
      locality?: string
      coordinates?: {
        _lat: number
        _lon: number
      }
    }
  }
  scheduling: {
    isRecurring: boolean
    recurringType?: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom'
    startTime: Date
    endTime: Date
    isCustomRecurring?: boolean
    customRecurring: {
      dates: Array<{
        date: Date
        startTime: Date
        endTime: Date
      }>
    }
  }
  bookings: {
    isTakingOnsiteBookings?: boolean
    isTakingOnsitePayments?: boolean
    details: string
    taxPercent: number
    processingFeePercent: number
    tickets?: Array<{
      entry: ITicketModel
      activate?: number
      deactivate?: number
    }>
    registrationURL?: string
    registrationPhone?: string
  }
  offers?: {
    maxOffers: number
    availableOffers: Array<IOfferModel>
  }
  media: {
    images: Array<{
      url: string
      tags: Array<string>
    }>
    videoURL: string
  }
}

export const Event = mongoose.model<IEventModel>('Event', eventSchema)
export default Event
