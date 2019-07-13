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

ClubgoServer.get('/:filter/:query', (req, res)=>{
  res.send('A')
})

ClubgoServer.get('/:city/events/:eventRef', (req, res)=>{
  res.send('B')
})

ClubgoServer.get('/:city/venues/:venueRef', (req, res)=>{
  res.send('C')
})

ClubgoServer.use('/admin', AdminRouter)
