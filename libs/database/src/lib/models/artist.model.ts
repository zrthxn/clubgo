import * as mongoose from 'mongoose'

export const artistSchema = new mongoose.Schema({
  title: {
    type: String, required: true
  },
  images: [
    {
      imgId: {
        type: String, required: true
      },
      tag: String
    }
  ],
  tags: [String]
})

export const Artist = mongoose.model('Artist', artistSchema)
export default Artist
