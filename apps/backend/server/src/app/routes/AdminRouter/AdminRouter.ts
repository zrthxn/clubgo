import express from 'express'
import { conf } from '@clubgo/util'
import { database as Database } from '@clubgo/database'

import EventAdminRouter from './routes/EventAdminRouter'
import UserAdminRouter from './routes/UserAdminRouter'
import VenueAdminRouter from './routes/VenueAdminRouter'

Database.connect()
  .then((connection) => console.log(conf.Green('Mongoose Connected'), conf.Magenta(connection.mode)))
  .catch((e) => console.log(conf.Red(e)) )


const AdminRouter = express.Router()

AdminRouter.use('/user', UserAdminRouter)
AdminRouter.use('/event', EventAdminRouter)
AdminRouter.use('/venue', VenueAdminRouter)

AdminRouter.get('/', (req, res)=>{
  res.send({ message: 'admin' })
})

export default AdminRouter
