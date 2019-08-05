import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { User } from '@clubgo/database'

const UserRouter = express.Router()

// Read all users :: /admin/user/_all
UserRouter.get('/_list', async (req, res)=>{
  const userStream = await User.find({}).cursor({transform: JSON.stringify})
  userStream.pipe(res.type('json'))
})

// Read a user by ID :: /admin/user/_get/:userid
UserRouter.get('/_get/:userid', async (req, res)=>{
  const searchResult = await User.findOne({ _id: req.params.userid })
  res.send({ message: 'found', result: searchResult })
})

// Read a group of users by ID :: /admin/user/_group
UserRouter.post('/_group', async (req, res)=>{
  const { searchIds } = req.body
  for (let id of searchIds)
    id = mongoose.Types.ObjectId(id)
  
  const searchResult = await User.find({
    _id: { 
      $in: searchIds
    }
  })

  res.send({ 
    message: `found ${searchResult.length} of ${searchIds.length}`,
    result: searchResult 
  })
})

// Create a user :: /admin/user/_create
UserRouter.post('/_create', async (req, res)=>{
  const { createBody } = req.body
  const createUser = new User(createBody)

  try {
    const result = await createUser.save()
    res.status(201)
    .send({ 
      message: 'created',
      result: result._id
    })
  } catch (err) {
    console.log(conf.Red(err))
    res.status(400).send({ error: err })
  }
})

// Update a user by ID :: /admin/user/_update/:userid
UserRouter.put('/_update/:userid', async (req, res)=>{
  const { updateBody } = req.body
  const result = await User.findOneAndUpdate(
    { 
      _id: req.params.userid 
    },
    updateBody
  )
  res.send({
    message: 'updated',
    previous: result
  })
})

// Delete a user by ID :: /admin/user/_delete/:userid
UserRouter.delete('/_delete/:userid', async (req, res)=>{
  const result = await User.findOneAndDelete(
    { 
      _id: req.params.userid 
    }
  )
  res.send({ 
    message:'deleted', 
    result
  })
})

export default UserRouter
