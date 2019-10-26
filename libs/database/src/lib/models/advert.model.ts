import * as mongoose from 'mongoose'

/**
 * @module
 * Advert Model
 * * Update the interface changing schema
 */

export const advertSchema = new mongoose.Schema(
  {
    advertTitle: {
      type: String, required: true
    },
    link: String,
    city: String,
    imageURL: {
      type: String//, required: true
    }
  }, {
    collection: 'Adverts'
  }
)

advertSchema.index({
  advertTitle: 'text'
})

export interface IAdvertModel extends mongoose.Document {
  advertTitle: string
  link?: string
  city?: string
  imageURL: string
}

export const Advert = mongoose.model<IAdvertModel>('Advert', advertSchema)
export default Advert
