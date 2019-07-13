import * as mongoose from 'mongoose'

/**
 * @module
 * Artist Model
 * * Update the interface changing schema *
 */

export const artistSchema = new mongoose.Schema(
  {
    title: {
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
    collection: 'Artists'
  }
)

export interface IArtistModel extends mongoose.Document {
  title: string,
  images: [
    {
      url: string,
      tags?: [string]
    }
  ]
}

export const Artist = mongoose.model<IArtistModel>('Artist', artistSchema)
export default Artist
