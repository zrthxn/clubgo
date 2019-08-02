import * as express from 'express'
import * as path from 'path'

export const Content = express()

import { DeliveryRouter } from './routes/DeliveryRouter'
import { APIRouter } from './routes/APIRouter'

const config = require('../assets/config.json')
const { __storagedir } = config

Content.use(express.json())
Content.use(express.urlencoded({ extended: true }))

Content.use('/static', express.static( path.join(__storagedir, 'static') ))

Content.use('/i', DeliveryRouter)

Content.use('/api', APIRouter)

// Content.use('/:sectorName', (req, res, next)=>{
//   const { sectorName } = req.params
//   if(sectorName===config.localSectorName) {
//     DeliveryRouter(req, res, next)
//   }
//   else if(sectorName==='api') {
//     APIRouter(req, res, next)
//   }
//   else {
//     if(config.sectors.hasOwnProperty(sectorName)) {
//       const sector = config.sectors[sectorName]
//       res.redirect(sector.ip + ':' + sector.port + '/' + sectorName)
//     }
//     else {
//       return res.status(404).send({
//         message: 'Invalid Sector Name'
//       })
//     }
//   }
// })
