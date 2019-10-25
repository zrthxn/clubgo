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
    images: [
      {
        url: {
          type: String, required: true
        },
        tags: [String]
      }
    ]
  }, {
    collection: 'Adverts'
  }
)

export interface IAdvertModel extends mongoose.Document {
  AdvertTitle: string
  images: Array<{
    url: string
    tags?: Array<string>
  }>
}

export const Advert = mongoose.model<IAdvertModel>('Advert', advertSchema)
export default Advert
