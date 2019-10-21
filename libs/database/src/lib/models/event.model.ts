import * as mongoose from 'mongoose'
import { artistSchema, IArtistModel } from './artist.model'
import { ticketSchema, ITicketModel } from './ticket.model'
import { offerSchema, IOfferModel } from './offer.model'

/**
 * @module
 * User Model Integrated with Controller
 * * Update the interface changing schema
 */

export const timeSchema = {
  type: Number, min: 0, max: 1440
}

export const imageSchema = {
  url: {
    type: String, required: true
  },
  tags: [String]
}

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
    artists: [String], //[ artistSchema ],
    music: [String],
    dressCode: {
      title: String,
      images: [String]
    },
    tags: [String],
    hasCutomDetails: Boolean,
    customDetails: [
      {
        detailName: String,
        detailData: String
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
      type: {
        type: String, enum: [ 'once', 'daily', 'weekly', 'monthly', 'custom' ], required: true
      },
      isRecurring: Boolean,
      isCustomDates: Boolean,
      recurring: {
        date: [ Number ] || undefined,
        day: [ String ] || undefined,
        month: [ String ] || undefined
      },
      customDates: [ Date ],
      noShowDates: [ Date ],
      timing: {
        type: {
          startTime: {
            type: Number, min: 0, max: 1440, required: true
          },
          endTime: {
            type: Number, min: 0, max: 2880, required: true
          }
        },
        required: true
      }
    },
    bookings: {
      isTakingOnsiteBookings: Boolean,
      isTakingOnsitePayments: Boolean,
      onsitePaymentRequired: Boolean,
      allowPreBookingUptoDays: Number,
      maximumBookingUpto: Number,
      taxPercent: {
        type: Number, min: 0, max: 100, default: 18
      },
      processingFeePercent: {
        type: Number, min: 0, max: 100, default: 3
      },
      tickets: [
        {
          activate: {
            type: Number, min: 0, max: 1440
          },
          deactivate: {
            type: Number, min: 0, max: 1440
          },
          ticketMaximumUses: Number,
          entry: {
            owner: String,
            ticketTitle: {
              type: String, required: true
            },
            entryType: {
              type: String, required: true, enum: [ 'couple', 'single' ]
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
              single: {
                admissionPrice: Number,
                bookingDescription: String,
                discount: {
                  type: Number, min: 0, max: 100
                }
              }
            }
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
          owner: String,
          offerTitle: {
            type: String, required: true
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
    type: 'once' | 'daily' | 'weekly' | 'monthly' | 'custom'
    isRecurring: boolean
    recurring?: {
      date: Array<number> | undefined
      day: Array<string> | undefined
      month: Array<string> | undefined
    }
    customDates?: Array<Date>
    noShowDates?: Array<Date>
    timing: {
      startTime: number
      endTime: number
    }
  }
  bookings: {
    isTakingOnsiteBookings: boolean
    isTakingOnsitePayments: boolean
    onsitePaymentRequired: boolean
    allowPreBookingUptoDays: number
    maximumBookingUpto: number
    taxPercent?: number
    processingFeePercent?: number
    tickets?: Array<{
      entry: ITicketModel
      ticketMaximumUses?: number
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
