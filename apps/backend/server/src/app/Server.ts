import express from 'express'
export const clubgoServer = express()

export default clubgoServer

import { get, User, userController, userSchema } from '@clubgo/database'

clubgoServer.get('/', (req,res)=>{
  User.actions.get()
  res.send({ message: 'clubgo' })
})
