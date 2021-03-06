import * as mongoose from 'mongoose'
import { IArtistModel } from './artist.model'
import { ITicketModel } from './ticket.model'
import { IOfferModel } from './offer.model'
import { serialize } from '@clubgo/util'

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
    description: String,
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
    termsAndConditions: String,
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
      city: String,
      venueId: String,
      title: String,
      locality: String, 
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
        type: String, enum: [ 'once', 'daily', 'weekly', 'monthly', 'custom' ]
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
        startTime: {
          type: Number, min: 0, max: 1440
        },
        endTime: {
          type: Number, min: 0, max: 2880
        }
      }
    },
    bookings: {
      isTakingOnsiteBookings: Boolean,
      isTakingOnsitePayments: Boolean,
      onsitePaymentRequired: Boolean,
      allowPreBookingUptoDays: Number,
      maximumBookingUpto: Number,
      taxPercent: {
        type: Number, min: 0, max: 100, default: 0
      },
      processingFeePercent: {
        type: Number, min: 0, max: 100, default: 0
      },
      bookingTerms: String,
      tickets: [
        {
          activate: {
            type: Number, min: 0, max: 1440
          },
          deactivate: {
            type: Number, min: 0, max: 2880
          },
          ticketMaximumUses: Number,
          entry: {
            owner: String,
            ticketTitle: String,
            entryType: {
              type: String, enum: [ 'couple', 'single' ]
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
          offerTitle: String,
          description: {
            type: String, maxlength: 250
          },
          category: {
            type: String, enum: [ 'flat', 'payment', 'coupon', 'platform' ]
          },
          discountPercent: {
            type: Number, min: 0, max: 100, default: 0
          },
          terms: String
        }
      ]
    },
    media: {
      images: [
        {
          url: String,
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

eventSchema.index({ '$**': 'text' })

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
  termsAndConditions: string
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
    locality?: string
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
      date?: Array<number>
      day?: Array<string>
      month?: Array<string>
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
    bookingTerms?: string
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
