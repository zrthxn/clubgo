import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { conf, findItemIndexByRef, sortItemArrayByRef, IFileItem } from '@clubgo/util'

export const DeliveryRouter = express.Router()

const config = require('../../assets/config.json')
const { __storagedir } = config

DeliveryRouter.get('/', (req, res)=>{
  fs.readFile(path.join(__storagedir, 'root', 'lookup.json'), {
    encoding: 'utf-8'
  }, (err, data)=>{
    if(err) return console.log(conf.Red(err.toString()))
    res.type('application/json').send(JSON.parse(data))
  })
})

DeliveryRouter.get('/:fileId', (req, res)=>{
  const { fileId } = req.params  
  const collection = fileId.substring(0,4)
  const designator = fileId.substring(4,12)

  let lookupPath = path.join(__storagedir, 'root')
  if(collection!=='root') 
    lookupPath = path.join(lookupPath, collection)
  lookupPath = path.join(lookupPath, 'lookup.json')

  fs.readFile(lookupPath, {
    encoding: 'utf-8'
  }, (err, data)=>{
    if(err) return console.log(conf.Red(err.toString()))

    let lookupTable = JSON.parse(data).files

    let searchFileIndex = findItemIndexByRef(lookupTable, parseInt(designator, 36), lookupTable.length-1)
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
