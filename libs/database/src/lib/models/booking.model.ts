import * as mongoose from 'mongoose'
import { ObjectID } from 'bson'

export const bookingSchema = new mongoose.Schema(
  {
    createdOn: {
      type: Date, required: true
    },
    bookingReference: {
      type: String, required: true, unique: true
    },
    ticketId: {
      type: ObjectID
    },
    name: {
      type: String, required: true
    },
    email: {
      type: String, required: true
    },
    phone: {
      type: String, maxlength: 14, required: true
    },
    termsAndConditions: String,
    event: {
      eventId: ObjectID,
      eventTitle: String,
      startTime: String,
      endTime: String
    },
    venue: {
      venueTitle: String,
      city: String,
      locality: String,
      venueId: {
        type: ObjectID
      },
    },
    schedule: {
      date: Date,
      time: String
    },
    appliedOffers: [
      {
        offerId: ObjectID,
        offerTitle: String,
        category: String,
        discountPercent: {
          type: Number, min: 0, max: 100, default: 0
        }
      }
    ],
    people: {
      type: {
        couple: Number,
        single: Number,
        female: Number,
        male: Number
      },
      required: true
    },
    payment: {
      transactionId: String,
      isBookingAmountPaid: {
        type: Boolean, required: true
      },
      amount: Number,
      processingFee: Number,
      tax: Number,
      total: {
        type: Number, required: true
      }
    }
  },
  {
    collection: 'Bookings'
  }
)

bookingSchema.index({ 
  name: 'text',
  email: 'text',
  'event.eventTitle': 'text',
  'venue.venueTitle': 'text',
})

export interface IBookingModel extends mongoose.Document {
  createdOn: Date,
  bookingReference: string
  ticketId: ObjectID
  name: string
  email: string
  phone: string
  termsAndConditions: string
  event: {
    eventTitle?: string,
    eventId: ObjectID
    startTime: number
    endTime: number
  }
  venue: {
    venueTitle?: string
    city?: string
    locality?: string
    venueId: ObjectID
  }
  schedule: {
    date: Date
    time: number
  }
  appliedOffers: Array<{
    offerId: ObjectID
    offerTitle: string
    category: string
    discountPercent: number
  }>
  people: {
    couple?: number
    single?: number
    female?: number
    male?: number
  }
  payment: {
    transactionId?: string
    isBookingAmountPaid: boolean
    amount?: number
    processingFee?: number
    tax?: number
    total: number
  }
}

export const Booking = mongoose.model<IBookingModel>('Booking', bookingSchema) 
export default Booking