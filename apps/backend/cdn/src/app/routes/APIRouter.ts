import * as express from 'express'
import multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser'

import { 
  conf, 
  findItemIndexByRef, 
  sortItemArrayByRef,
  decodeBase64Image,
  IFileItem 
} from '@clubgo/util'

export const APIRouter = express.Router()
APIRouter.use(bodyParser.json())
APIRouter.use(bodyParser.urlencoded({ extended: true }))

APIRouter.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

APIRouter.use((req, res, next)=>{
  // CDN API Auth
  console.log('CDN AUTH')
  next()
})

const config = require('../../assets/config.json')
const { __storagedir } = config

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{    
    cb(null, path.join(__storagedir, 'temp'))
  },
  filename: (req, file, cb)=>{
    cb(null, 'upload_' + Date.now())
  }
})

APIRouter.post('/_create/collection/:collection', (req, res)=>{
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

APIRouter.post('/_upload/single/:collection', (req, res)=>{
  let { collection } = req.params

  const upload = multer({ storage }).single('upload')
  upload(req, res, (err)=>{
    if(err) return res.status(500).send(err)
    
    const file = req['file']

    let genFileName = collection + parseInt((file.filename.split('upload_')[1])).toString(36)
    res.sendStatus(200)

    fs.readFile(file.path, (err, data)=>{
      if (err) return res.status(500).send(err)
      
      // data = Buffer.from(data.toString())
      // let raw = decodeBase64Image(data.toString('base64'))
      
      let raw = decodeBase64Image(data.toString())
      
      let writePath = path.join(__storagedir, 'root')
      if(collection!=='root')
        writePath = path.join(writePath, collection)

      writePath = path.join(writePath, collection + genFileName + 
        '.' + file.originalname.split('.')[file.originalname.split('.').length-1])
        
      // Write new image to root
      fs.writeFile(writePath, raw.data, (err)=>{
        if (err) res.status(500).send(err)

        createLookupEntry(collection, {
          ref: genFileName,
          filename: genFileName + '.' + file.originalname.split('.')[1],
          originalname: file.originalname,
          path: writePath,
          metadata: {
            size: raw.data.length,
            encoding: file.encoding,
            mimetype: file.mimetype,
          }
        })

        // Remove temp file
        fs.unlink(file.path, (err)=>{
          if (err) res.status(500).send(err)
        })
      })
    })
  })
})

APIRouter.post('/_upload/multiple/:collection', (req, res)=>{
  let { collection } = req.params

  const upload = multer({ storage }).array('uploads')
  upload(req, res, (err)=>{
    if(err) return res.status(500).send(err)
    
    const uploadedFiles = req['files']
    let refs = []

    for (const file of uploadedFiles) {
      let data = fs.readFileSync(file.path)

      // data = Buffer.from(data.toString('base64'))
      // let raw = decodeBase64Image(data.toString('base64'))
      
      let raw = decodeBase64Image(data.toString())

      let genFileName = parseInt((file.filename.split('upload_')[1])).toString(36)
      let writePath = path.join(__storagedir, 'root')
      
      if(collection==='root') {
        refs.push({
          ref: parseInt((file.filename.split('upload_')[1])).toString(36),
          ...file
        })
        writePath = path.join(writePath, genFileName + getFileExtension(file.originalname))
      }
      else {
        refs.push({
          ref: collection + '/' + parseInt((file.filename.split('upload_')[1])).toString(36),
          ...file
        })
        writePath = path.join(writePath, collection, genFileName + getFileExtension(file.originalname))
      }
      
      // Write new image to root
      fs.writeFileSync(writePath, raw.data)

      createLookupEntry(collection, {
        ref: genFileName,
        filename: genFileName + getFileExtension(file.originalname),
        originalname: file.originalname,
        path: writePath,
        metadata: {
          size: raw.data.length,
          encoding: file.encoding,
          mimetype: file.mimetype,
        }
      })      

      // Remove temp files
      fs.unlink(file.path, (err)=>{
        if (err) res.status(500).send(err)
      })  
    }

    res.send({ refs })
  })
})

function createLookupEntry(collection:string, lookupEntry:object) {
  let lookupPath = path.join(__storagedir, 'root', 'lookup.json')
  let cdndata = fs.readFileSync(lookupPath)
  let lookupTable = JSON.parse(cdndata.toString())
  let redundantTable = lookupTable

  lookupTable = lookupTable[collection].files
  lookupTable.push(lookupEntry)

  lookupTable = sortItemArrayByRef(lookupTable)

  redundantTable[collection].files = lookupTable
  redundantTable.lockfile = false

  fs.writeFileSync(lookupPath, JSON.stringify(redundantTable, null, 2))
}

function getFileExtension(originalname) {
  return ('.' + originalname.split('.')[originalname.split('.').length-1])
}