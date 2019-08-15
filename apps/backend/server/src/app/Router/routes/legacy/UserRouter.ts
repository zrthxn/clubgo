import express from 'express'
import * as mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import { User } from '@clubgo/database'

/**
 * @description
 * * Users Router
 * This Express Router handles all CRUD functions
 * related to Users.
 */

export const UserRouter = express.Router()
export default UserRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
// Validate User Deletion
UserRouter.use('/_delete', (req, res, next)=>{
  // If req has ADMIN level access token, allow and DEL token header
  // Else, 403
  next()
})

// CRUD Functions
// --------------------------------------------------------
// Read all users :: /admin/user/_list
UserRouter.get('/_list', async (req, res)=>{
  const userStream = await User.find({}).cursor({ transform: JSON.stringify })
  // userStream.pipe(res.type('json'))
  userStream.on('data', (data)=>{
    setTimeout(()=>{
      res.write(data)
    }, 1000)
  })
  userStream.on('end', ()=>{
    setTimeout(()=>{
      res.end()
    }, 2000)
  })
})

// Read a user by ID :: /admin/user/_get/:userid
UserRouter.get('/_get/:userid', async (req, res)=>{
  const searchResult = await User.findOne({ _id: req.params.userid })
  res.send({ message: 'Found', result: searchResult })
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
    message: `Found ${searchResult.length} of ${searchIds.length}`,
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
      message: 'Created',
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
    message: 'Updated',
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
    message:'Deleted', 
    result
  })
})
// STOP ============================================== STOP
