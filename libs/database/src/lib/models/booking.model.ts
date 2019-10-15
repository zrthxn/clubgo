import * as mongoose from 'mongoose'

export const bookingSchema = new mongoose.Schema(
  {
    createdOn: {
      type: Date, required: true
    },
    eventName: String,
    eventId: {
      type: String, required: true
    },
    venueName: String,
    venueId: {
      type: String, required: true
    },
    name: {
      type: String, required: true
    },
    email: {
      type: String, required: true
    },
    phone: {
      type: String, required: true
    },
    appliedOfferText: String,
    appliedDiscountPercent: {
      type: Number, min: 0, max: 100, default: 0, required: true
    }
  },
  {
    collection: 'Bookings'
  }
)

bookingSchema.index({ 
  eventName: 'text',
  venueName: 'text',
  name: 'text'
})

export interface IBookingModel extends mongoose.Document {
  eventId: string
  venueId: string
  name: string
  email: string
  phone: string
  appliedOfferText?: string
  appliedDiscountPercent: number
}

export const Booking = mongoose.model<IBookingModel>('Booking', bookingSchema) 
export default Booking