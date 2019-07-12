import * as mongoose from 'mongoose';

export const eventSchema = new mongoose.Schema(
  {
    title: { 
      type: String, required: true 
    },
    categories: [String],
    description: {
      type: String, required: true
    },
    tagline: String,
    flashText: String,
    artists: [Object],
    music: [String],
    dressCode: {
      id: String,
      title: String,
    },
    tags: [String],
    custom: {
      hasCutomDetails: Boolean,
      customDetails: [
        {
          detailName: String,
          detailData: String
        }
      ],
    },
    settings: {
      isPublished: Boolean,
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
      title: String,
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
        type: String, enum: ['daily', 'weekly', 'monthly', 'custom'], required: true
      },
      isCustomRecurring: Boolean,
      customRecurring: {
        type: String // temp
        // what will this be
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
        imgId: {
          type: String, required: true
        },
        tag: String
      }
    ]
  },
  {
    collection: 'Events'
  }
);

import eventController from '../controllers/event.controller'
eventSchema['actions'] = eventController

export const Event = mongoose.model('Event', eventSchema)
export default Event
