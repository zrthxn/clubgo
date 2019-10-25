import * as mongoose from 'mongoose'
import { ObjectID } from 'bson'

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
    description: String,
    category: String,
    music: [ String ],
    followers: [ ObjectID ],
    social: [
      {
        platform: String,
        icon: String,
        url: String
      }
    ],
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
  description?: string
  category?: string
  music?: string[]
  followers?: ObjectID[]
  social?: Array<{
    platform: string
    icon: string
    url: string
  }>
  images: Array<{
    url: string
    tags: string[]
  }>
}

export const Artist = mongoose.model<IArtistModel>('Artist', artistSchema)
export default Artist
