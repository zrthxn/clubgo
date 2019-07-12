import express from 'express'
import { conf } from '@clubgo/util'
import { User } from '@clubgo/database'

const UserAdminRouter = express.Router()

// Get all users
UserAdminRouter.get('/', async (req, res)=>{
  const users = await User.find({})
  res.send( users )
})

// Create a user
UserAdminRouter.post('/_create', async (req, res)=>{
  const { email, password, name } = req.body
  const user = new User({
    email,
    password,
    name
  })

  try {
    const result = await user.save()
    res.status(201)
      .send({ 
        result: 'created',
        _id: result._id
      })
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

// Read a user by ID
UserAdminRouter.get('/:userid', async (req, res)=>{
  const searchUser = await User.findOne({ _id: req.params.userid })
  res.send({ 
    result: searchUser
  })
})

// Update a user by ID
UserAdminRouter.put('/_update/:userid', async (req, res)=>{
  const updateBody = req.body
  const result = await User.findOneAndUpdate(
    { 
      _id: req.params.userid 
    },
    updateBody
  )
  res.send({
    result: 'updated',
    previous: result
  })
})

// Delete a user by ID
UserAdminRouter.delete('/_delete/:userid', async (req, res)=>{
  const result = await User.findOneAndDelete(
    { 
      _id: req.params.userid 
    }
  )
  res.status(204).send(result)
})

export default UserAdminRouter
