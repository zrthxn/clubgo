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

APIRouter.post('/_upload/single/:collection',(req, res)=>{
  let { collection } = req.body

  const upload = multer({ storage }).single('upload')
  upload(req, res, (err)=>{
    if(err) return res.sendStatus(500)
    
    const file = req['files'][0]

    let genFileName = collection + parseInt((file.filename.split('upload_')[1])).toString(36)
    res.sendStatus(200)

    fs.readFile(file.path, (err, data)=>{
      if (err) return res.sendStatus(500)
      
      let raw = decodeBase64Image(data.toString())
      
      let writePath = path.join(__storagedir, 'root')
      if(collection!=='root')
        writePath = path.join(writePath, collection)
      writePath =  path.join(writePath, genFileName)
      
      // Write new image to root
      fs.writeFile(writePath, raw.data, (err)=>{
        if (err) res.sendStatus(500)

        createLookupEntry({
          ref: genFileName,
          filename: genFileName + '.' + file.originalname.split('.')[1],
          originalname: file.originalname,
          path: writePath,
          metadata: {
            size: raw.data.length,
            encoding: file.encoding,
            mimetype: file.mimetype,
          }
        }, collection)

        // Remove temp file
        fs.unlink(file.path, (err)=>{
          if (err) res.sendStatus(500)
        })
      })
    })
  })
})

APIRouter.post('/_upload/multiple/:collection', (req, res)=>{
  let { collection } = req.params

  const upload = multer({ storage }).array('uploads')
  upload(req, res, (err)=>{
    if(err) return res.sendStatus(500)
    
    const files = req['files']
    let refs = []

    for (const fileData of files) {
      let data = fs.readFileSync(fileData.path)
      let raw = decodeBase64Image(data.toString())        

      let genFileName = parseInt((fileData.filename.split('upload_')[1])).toString(36)
      refs.push({
        ref: parseInt((fileData.filename.split('upload_')[1])).toString(36),
        ...fileData
      })
      
      let writePath = path.join(__storagedir, 'root')
      if(collection!=='root') writePath = path.join(writePath, collection)
      
      writePath = path.join(writePath, collection + genFileName + 
        '.' + fileData.originalname.split('.')[fileData.originalname.split('.').length-1])
      
      // Write new image to root
      fs.writeFileSync(writePath, raw.data)

      createLookupEntry({
        ref: genFileName,
        filename: genFileName + '.' + fileData.originalname.split('.')[1],
        originalname: fileData.originalname,
        path: writePath,
        metadata: {
          size: raw.data.length,
          encoding: fileData.encoding,
          mimetype: fileData.mimetype,
        }
      }, collection)      

      // Remove temp files
      fs.unlink(fileData.path, (err)=>{
        if (err) res.sendStatus(500)
      })  
    }

    res.send({ refs })
  })
})

function createLookupEntry(lookupEntry:object, collection:string) {
  let lookupPath = path.join(__storagedir, 'root')
  if(collection!=='root')
    lookupPath = path.join(lookupPath, collection)
  lookupPath = path.join(lookupPath, 'lookup.json')

  let cdndata = fs.readFileSync(lookupPath)
  let lookupTable = JSON.parse(cdndata.toString())
  let redundantTable = lookupTable

  lookupTable = lookupTable.files
  lookupTable.push(lookupEntry)

  lookupTable = sortItemArrayByRef(lookupTable)

  redundantTable.files = lookupTable
  redundantTable.lockfile = false

  fs.writeFileSync(lookupPath, JSON.stringify(redundantTable, null, 2))
}