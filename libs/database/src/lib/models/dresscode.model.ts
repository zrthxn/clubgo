import * as mongoose from 'mongoose'

/**
 * @module
 * DressCode Model
 * * Update the interface changing schema
 */

export const dressCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String, required: true
    },
    images: [
      {
        url: {
          type: String, required: true
        }
      }
    ]
  }, {
    collection: 'Dress Codes'
  }
)

export interface IDressCodeModel extends mongoose.Document {
  name: string,
  images: Array<{
    url: string
  }>
}

export const DressCode = mongoose.model<IDressCodeModel>('DressCode', dressCodeSchema)
export default DressCode
