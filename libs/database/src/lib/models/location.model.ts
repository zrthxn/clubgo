import * as mongoose from 'mongoose'

export const locationSchema = new mongoose.Schema(
  {
    city: {
      type: String, required: true, unique: true
    },
    coordinates: {
      _lat: Number,
      _lon: Number
    },
    localities: [
      {
        name: {
          type: String, required: true
        },
        coordinates: {
          _lat: Number,
          _lon: Number
        }
      }
    ]
  },
  {
    collection: 'Locations'
  }
)

locationSchema.index({
  city: 'text'
})

export interface ILocationModel extends mongoose.Document {
  city: string
  coordinates?: {
    _lat: number
    _lon: number
  }
  localities?: Array<{
    name: string
    coordinates?: {
      _lat: number
      _lon: number
    }
  }>
}

export const Location = mongoose.model<ILocationModel>('Location', locationSchema) 
export default Location