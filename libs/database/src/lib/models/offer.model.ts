import * as mongoose from 'mongoose'

// Offer Types Explained
/**
 * - Flat: Offered by venue, applied on all bookings
 * - Payment: Offered by CG, applied on pre-payment
 * - Coupon: Applied by Coupon Code only
 * - Platform: Any offers provided by CG
 */

export const offerSchema = new mongoose.Schema(
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
  },
  {
    collection: 'Offers'
  }
)

offerSchema.index({ offerTitle: 'text' })

export interface IOfferModel extends mongoose.Document {
  owner: string
  offerTitle: string
  description: string
  category: 'flat' | 'payment' | 'coupon' | 'platform'
  discountPercent: number
  terms?: string
}

export const Offer = mongoose.model<IOfferModel>('Offer', offerSchema) 
export default Offer