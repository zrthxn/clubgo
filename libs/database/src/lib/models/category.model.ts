import * as mongoose from 'mongoose'

/**
 * @module
 * Category Model
 * * Update the interface changing schema
 */

export const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String, required: true
    },
    categoryType: {
      type: String, enum: [ 'event', 'venue' ]
    }
  }, {
    collection: 'Categories'
  }
)

export interface ICategoryModel extends mongoose.Document {
  name: string
  categoryType?: 'event'| 'venue'
}

export const Category = mongoose.model<ICategoryModel>('Category', categorySchema)
export default Category
