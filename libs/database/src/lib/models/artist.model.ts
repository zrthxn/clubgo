import * as mongoose from 'mongoose'

/**
 * @module
 * Artist Model
 * * Update the interface changing schema
 */

export const artistSchema = new mongoose.Schema(
  {
    artistTitle: {
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
  artistTitle: string
  images: Array<{
    url: string
    tags?: Array<string>
  }>
}

export const Artist = mongoose.model<IArtistModel>('Artist', artistSchema)
export default Artist
