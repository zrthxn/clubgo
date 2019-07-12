import express from 'express'
import mongoose from 'mongoose'
import * as bodyParser from 'body-parser'

export const ClubgoServer = express()
export default ClubgoServer

import AdminRouter from './routes/AdminRouter/AdminRouter'

ClubgoServer.use( bodyParser() )

ClubgoServer.get('/', (req, res)=>{
  res.send({ message: 'clubgo' })
})

ClubgoServer.use('/admin', AdminRouter)
