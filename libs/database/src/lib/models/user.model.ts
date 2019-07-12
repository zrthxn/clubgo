import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema(
  {
    email: { 
      type: String, required: true, unique: true
    },
    password: { 
      type: String, required: true, unique: true // unique to prevent hash collisions
    },
    phone: String,
    name: { 
      type: String, required: true
    }
  }, 
  {
    collection: 'Users'
  }
)

import userController from '../controllers/user.controller'
userSchema.actions = userController

export const User = mongoose.model('User', userSchema)
export default User
