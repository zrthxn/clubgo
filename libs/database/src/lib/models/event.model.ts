import mongoose from 'mongoose';

export const eventSchema = new mongoose.Schema(
  {
    name: { 
      type: String, required: true 
    },
    description: {
      type: String, required: true
    },
    tagline: String,
    flashText: String,
    category: {
      type: [String], required: true
    },
    artists: [Object],
    music: [String],
    dressCode: {
      type: Object, required: true
    },
    tags: [String],
    // Custom Details
    hasCutomDetails: Boolean,
    customDetails: [
      {
        detailName: String,
        detailData: String
      }
    ],
    // Settings
    eventPriority: Number,
    isFeatured: Boolean,
    featured: {
      featuredText: String,
      featuredPriority: Number
    },
    isPublished: Boolean,
    
    // Event Venue Details
    venue: {
      city: {
        type: String, required: true
      },
      venueType: 'regular' || 'custom',
      isCustomVenue: Boolean,
      venueId: String,
      customVenueDetails: {
        location: [Number]
        // add these
      }
      // .... redo venue id
    },

    // Event Scheduling
    scheduling: {
      start: {
        type: Date, required: true
      },
      end: {
        type: Date, required: true
      },
      //
      isRecurring: Boolean,
      recurringType: 'daily' || 'weekly' || 'monthly' || 'custom',
      isCustomRecurring: Boolean,
      customRecurring: {
        // what will this be
      }
    },

    // Bookings
    bookings: {
      isTakingOnsiteBookings: Boolean,
      // 
    }
  },
  {
    collection: 'Events'
  }
);

import eventController from '../controllers/event.controller'
eventSchema.actions = eventController

export const Event = mongoose.model('Event', eventSchema)
export default Event
