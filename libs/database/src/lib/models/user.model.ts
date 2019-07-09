import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true,
  },
  // password: { 
  //   type: String 
  // },
  // email: { 
  //   type: String, 
  //   unique: true 
  // },
  // phone: { 
  //   type: String, 
  //   unique: true 
  // },
  // name: { 
  //   type: String 
  // }
})

import userController from '../controllers/user.controller'
userSchema.actions = userController

userSchema.pre('remove', function(next) {
  this.model('User').deleteMany({ user: this._id }, next)
})

export const User = mongoose.model('User', userSchema)

export default User