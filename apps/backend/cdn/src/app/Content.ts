import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { conf } from '@clubgo/util'

/**
 * @author
 * * Alisamar Husain | zrthxn
 * 
 * @copyright 2019
 * Copyright Alisamar Husain
 * 
 * @license MIT
 * This software is provided as-is with no
 * warranties or guatantees.
 */

export const Content = express()
export default Content

Content.use(express.json())
Content.use(express.urlencoded({ extended: true }))
Content.use(cookieParser())
Content.use(bodyParser.json())
Content.use(bodyParser.urlencoded({ extended: true }))

import { DeliveryRouter } from './routes/DeliveryRouter'
import { UploadRouter } from './routes/UploadRouter'

const ContentConfig = require('./cdnconfig.json')
const { __storagedir } = ContentConfig
// ========================================================

/**
 * @description
 * * Welcome to the ClubGo CDN Server
 * This server acts as the content delivery server
 * and storage space for ClubGo
 */

// Root Headers 
// --------------------------------------------------------
Content.use((req,res,next)=>{
  if(ContentConfig.policy.ALLOW_CORS) {
    res.header('Access-Control-Allow-Origin', ContentConfig.policy.ALLOW_ORIGIN)
    res.header('Access-Control-Allow-Headers', ContentConfig.policy.ALLOW_HEADERS)
    res.header('Access-Control-Allow-Methods', ContentConfig.policy.ALLOW_METHODS)
  }
  next()
})

// Routes
// --------------------------------------------------------
Content.use('/static', express.static( path.join(__storagedir, 'static') ))

Content.use('/i', DeliveryRouter)

Content.use('/_upload', (req, res, next)=>{
  // CSRF Validation
  UploadRouter(req, res, next)
})

// CREATE New collection folder :: /_create/collection/images
Content.post('/_create/collection/:collection', (req, res)=>{
  let { collection } = req.params
  let lookupPath = path.join(__storagedir, 'root', 'lookup.json')
  fs.readFile(lookupPath, (err, data)=>{
    if(err) return res.status(500).send(err)
    let lookupTable = JSON.parse(data.toString())
    lookupTable[collection] = {
      files: [

      ]
    }

    fs.writeFileSync(lookupPath, JSON.stringify(lookupTable, null, 2))
    fs.mkdir(path.join(__storagedir, 'root', collection), (e)=>{
      if(e) return res.status(500).send(e)
      res.sendStatus(200)
    })
  })
})

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
