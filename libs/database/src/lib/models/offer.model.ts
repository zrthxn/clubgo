import * as mongoose from 'mongoose'

export const offerSchema = new mongoose.Schema(
  {
    name: {
      type: String, required: true
    },
    owner: { 
      type: String, required: true
    },
    description: {
      type: String, required: true
    },
    category: {
      type: String, required: true
    }
  },
  {
    collection: 'Offers'
  }
)

export interface IOfferModel extends mongoose.Document {
  name: string,
  description: string,
  category: string
}

export const Offer = mongoose.model<IOfferModel>('Offer', offerSchema) 
export default Offer