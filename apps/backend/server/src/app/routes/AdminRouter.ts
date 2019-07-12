import express from 'express'
import { conf } from '@clubgo/util'

export const AdminRouter = express.Router()

import { database as Database, User } from '@clubgo/database'

Database.connect()
  .then( () => console.log( conf.Green('Mongoose Connected') ) )


AdminRouter.get('/', (req, res)=>{
  res.send({ message: 'admin' })
})

AdminRouter.get('/user', async (req, res)=>{
  const users = await User.find({})
  res.send( users )
})

AdminRouter.post('/user/_add', (req, res)=>{
  const { email, password, name } = req.body
  const newUser = new User({
    email,
    password,
    name
  })

  newUser.save()
    .then( r => res.status(201).send({ result: r }) )
    .catch( e => res.status(500).send({ result: e }) )
})
