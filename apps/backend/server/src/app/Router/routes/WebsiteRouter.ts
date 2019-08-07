import express from 'express'
import { conf } from '@clubgo/util'

export const WebRouter = express.Router()

WebRouter.get('/', (req, res)=>{
  res.send({ message: 'web' })
})

// WebRouter.get('/:filter/:query', (req, res)=>{
//   res.send('A')
// })

// WebRouter.get('/:city/events/:eventRef', (req, res)=>{
//   res.send('B')
// })

// WebRouter.get('/:city/venues/:venueRef', (req, res)=>{
//   res.send('C')
// })

export default WebRouter
