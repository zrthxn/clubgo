import express from 'express'
import path from 'path'
import { conf } from '@clubgo/util'

import EventAdminRouter from './routes/EventAdminRouter'
import UserAdminRouter from './routes/UserAdminRouter'
import VenueAdminRouter from './routes/VenueAdminRouter'

const AdminRouter = express.Router()

AdminRouter.use(async (req, res, next)=>{
  // Auth, CSRF and stuff
  try {
    if(req.cookies['auth']==='auth')
      next()
    else
      res.status(403)//.sendFile(path.resolve(__dirname, 'src', 'assets', 'noauth.html'))
  } catch (err) {
    res.sendStatus(500)
  }
  // req.cookie
  // check cookie => / => /authorize => sms otp => back to /
})

AdminRouter.get('/', (req, res)=>{
  res.send({ message: 'admin' })
})

AdminRouter.post('/login', (req, res)=>{
  res.send({ message: 'admin_login' })
})

AdminRouter.use('/user', UserAdminRouter)

AdminRouter.use('/event', EventAdminRouter)

AdminRouter.use('/venue', VenueAdminRouter)

export default AdminRouter
