import * as mongoose from 'mongoose'
import UserController from '../controllers/user.controller'
import { ObjectID } from 'bson'

/**
 * @module
 * User Model Integrated with Controller
 * * Update the interface changing schema *
 */

export const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, required: true, //unique: true 
    },
    password: { 
      type: String, required: true, //unique: true // unique to prevent hash collisions
    }, 
    name: { 
      type: String, required: true
    },
    phone: {
      type: String
    },
    age: Number,
    city: String,
    gender: {
      type: String, enum: ['male', 'female', 'other', 'notspec'], default: 'notspec'
    },
    profile: {
      photo: String,
      following: [ ObjectID ],
      followers: [ ObjectID ],
      wishlist: {
        venues: [String],
        events: [String]
      }
    },
    useage: {
      eventsBooked: [String]
    }
  }, 
  {
    collection: 'Users'
  }
)

userSchema.loadClass(UserController)

export interface IUserModel extends mongoose.Document {
  email: string,
  password: string,
  name: string,
  phone?: string
  age?: number,
  city?: string,
  gender?: 'male' | 'female' | 'other' | 'notspec',
  profile: {
    photo?: string,
    following?: [ ObjectID ],
    followers?: [ ObjectID ],
    wishlist?: {
      venues?: [string],
      events?: [string],
    }
  },
  useage?: {
    eventsBooked?: [string]
  }
}

export const User = mongoose.model<IUserModel>('User', userSchema) 
export default User