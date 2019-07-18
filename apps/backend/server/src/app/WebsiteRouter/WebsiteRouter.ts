import express from 'express'
import { conf } from '@clubgo/util'

const WebRouter = express.Router()

WebRouter.use(async (req, res, next)=>{
  // CSRF and stuff
  next()
})

WebRouter.get('/', (req, res)=>{
  res.send({ message: 'web' })
})

WebRouter.get('/:filter/:query', (req, res)=>{
  res.send('A')
})

WebRouter.get('/:city/events/:eventRef', (req, res)=>{
  res.send('B')
})

WebRouter.get('/:city/venues/:venueRef', (req, res)=>{
  res.send('C')
})

export default WebRouter
