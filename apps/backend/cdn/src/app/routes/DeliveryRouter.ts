import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { 
  conf, 
  findItemIndexByRef
} from '@clubgo/util'

export const DeliveryRouter = express.Router()
export default DeliveryRouter

const ContentConfig = require('../cdnconfig.json')
const { __storagedir } = ContentConfig

// ========================================================

// GET lookup file :: /i
DeliveryRouter.get('/', (req, res)=>{
  fs.readFile(path.join(__storagedir, 'root', 'lookup.json'), {
    encoding: 'utf-8'
  }, (err, data)=>{
    if(err) return console.log(conf.Red(err.toString()))
    res.type('application/json').send(JSON.parse(data))
  })
})

// GET file from root directory :: /i/jsd7qkc
DeliveryRouter.get('/:fileId', (req, res)=>{
  const { fileId } = req.params

  let lookupPath = path.join(__storagedir, 'root', 'lookup.json')

  fs.readFile(lookupPath, {
    encoding: 'utf-8'
  }, (err, data)=>{
    if(err) return console.log(conf.Red(err.toString()))

    let lookupTable = JSON.parse(data)['root'].files

    let searchFileIndex = findItemIndexByRef(lookupTable, parseInt(fileId, 36), lookupTable.length-1)
    if(searchFileIndex===-1)
      return res.status(404).send({
        message: 'Resource Not Found'
      })
    else
      try {
        res.sendFile( lookupTable[searchFileIndex].path )
      } catch(e) {
        return res.status(404).send({
          message: 'Resource Not Found',
          errors: e
        })
      }
  })
})

// GET file from collection :: /i/images/jsd7qkc
DeliveryRouter.get('/:collection/:fileId', (req, res)=>{
  const { fileId, collection } = req.params

  let lookupPath = path.join(__storagedir, 'root', 'lookup.json')

  fs.readFile(lookupPath, {
    encoding: 'utf-8'
  }, (err, data)=>{
    if(err) return console.log(conf.Red(err.toString()))

    let lookupTable = JSON.parse(data)[collection].files

    let searchFileIndex = findItemIndexByRef(lookupTable, parseInt(fileId, 36), lookupTable.length-1)
    if(searchFileIndex===-1)
      return res.status(404).send({
        message: 'Resource Not Found'
      })
    else
      try {
        res.sendFile( lookupTable[searchFileIndex].path )
      } catch(e) {
        return res.status(404).send({
          message: 'Resource Not Found',
          errors: e
        })
      }
  })
})

// STOP ============================================== STOP
