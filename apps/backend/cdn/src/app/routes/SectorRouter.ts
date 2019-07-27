import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { conf, findItemIndexByRef, sortItemArrayByRef, IFileItem } from '@clubgo/util'

export const SectorRouter = express.Router()

const config = require('../../assets/config.json')
const { __storagedir } = config

SectorRouter.get('/', (req, res)=>{
  fs.readFile(path.join(__storagedir, 'cdnLookup.json'), {
    encoding: 'utf-8'
  }, (err, data)=>{
    if(err) return console.log(conf.Red(err.toString()))
    res.type('application/json').send(JSON.parse(data))
  })
})

SectorRouter.get('/:fileId', (req, res)=>{
  const { fileId } = req.params
  fs.readFile(path.join(__storagedir, 'cdnLookup.json'), {
    encoding: 'utf-8'
  }, (err, cdnLookup)=>{
    if(err) return console.log(conf.Red(err.toString()))
    
    const recordNumber = fileId.substring(0,4)
    const designator = fileId.substring(4,12)

    let lookupTable
    if(recordNumber==='root')
      lookupTable = JSON.parse(cdnLookup).files
    else
      try {
        lookupTable = fs.readFileSync( path.join(__storagedir, 'root', recordNumber, 'lookup.json') )
        lookupTable = JSON.parse(lookupTable)
      } catch(e) {
        return res.status(404).send({
          message: 'Invalid Record Number',
          errors: e
        })
      }

    let fileRef = findItemIndexByRef(lookupTable, parseInt(designator, 16), lookupTable.length-1)
    if(fileRef===-1)
      return res.status(404).send({
        message: 'Resource Not Found'
      })
    else
      try {
        res.sendFile( path.join(__storagedir, 'root', lookupTable[fileRef].filename) )
      } catch(e) {
        return res.status(404).send({
          message: 'Resource Not Found',
          errors: e
        })
      }
  })
})

SectorRouter.post('/:recordNumber', (req, res)=>{
  
})
