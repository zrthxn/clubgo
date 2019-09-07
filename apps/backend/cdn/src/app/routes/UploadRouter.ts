import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser'

import multer from 'multer'
import { 
  conf, 
  sortItemArrayByRef,
  decodeBase64Image,
  IFileItem 
} from '@clubgo/util'

export const UploadRouter = express.Router()
export default UploadRouter

const ContentConfig = require('../cdnconfig.json')
const { __storagedir } = ContentConfig

UploadRouter.use(bodyParser.json())
UploadRouter.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{    
    cb(null, path.join(__storagedir, 'temp'))
  },
  filename: (req, file, cb)=>{
    cb(null, 'upload_' + Date.now())
  }
})

// ========================================================

// Security Routes
// --------------------------------------------------------
UploadRouter.use((req, res, next)=>{
  // CDN API Auth
  console.log('CDN AUTH')
  next()
})

// API Routes
// --------------------------------------------------------
// UPLOAD Single files :: /_upload/single/images
UploadRouter.post('/single/:collection', (req, res)=>{
  let { collection } = req.params

  const upload = multer({ storage }).single('upload')
  upload(req, res, (err)=>{
    if(err) return res.status(500).send(err)
    
    const file = req['file']

    let genFileName = collection + parseInt((file.filename.split('upload_')[1]), 10).toString(36)

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

        // Remove temp file
        fs.unlink(file.path, (err)=>{
          if (err) res.status(500).send(err)
        })

        createLookupEntries(collection, [{
          ref: genFileName,
          filename: genFileName + '.' + file.originalname.split('.')[1],
          originalname: file.originalname,
          path: writePath,
          metadata: {
            size: raw.data.length,
            encoding: file.encoding,
            mimetype: file.mimetype,
          }
        }])
      })
    })

    res.send({
      ref: collection + '/' + genFileName,
      ...file
    })
  })
})

// UPLOAD Multiple files :: /_upload/multiple/images
UploadRouter.post('/multiple/:collection', (req, res)=>{
  let { collection } = req.params

  const upload = multer({ storage }).array('uploads')
  upload(req, res, (err)=>{
    if(err) return res.status(500).send(err)
    
    const uploadedFiles = req['files']
    let refs = [], lookupEntries = Array<IFileItem>()

    for (const file of uploadedFiles) {
      let genFileName = parseInt((file.filename.split('upload_')[1]), 10).toString(36)
      let writePath = path.join(__storagedir, 'root')
      
      if(collection==='root') {
        writePath = path.join(writePath, genFileName + getFileExtension(file.originalname))
        refs.push({
          ref: genFileName,
          ...file
        })
      }
      else {
        writePath = path.join(writePath, collection, genFileName + getFileExtension(file.originalname))
        refs.push({
          ref: collection + '/' + genFileName,
          ...file
        })
      }
      
      lookupEntries.push({
        ref: genFileName,
        filename: genFileName + '.' + file.originalname.split('.')[1],
        originalname: file.originalname,
        path: writePath,
        metadata: {
          size: file.size,
          encoding: file.encoding,
          mimetype: file.mimetype,
        }
      })
      
      fs.readFile(file.path, (err, data)=>{
        if (err) return res.status(500).send(err)

        // data = Buffer.from(data.toString('base64'))
        // let raw = decodeBase64Image(data.toString('base64'))
        
        let raw = decodeBase64Image(data.toString())
        // Write new image to root
        fs.writeFile(writePath, raw.data, ()=>{
          if (err) res.status(500).send(err)

          // Remove temp files
          fs.unlink(file.path, (err)=>{
            if (err) res.status(500).send(err)
          })
        })      

      })  
    }

    createLookupEntries(collection, lookupEntries)
    res.send({ refs })
  })
})

function createLookupEntries(collection:string, lookupEntries) {
  let lookupPath = path.join(__storagedir, 'root', 'lookup.json')
  let cdndata = fs.readFileSync(lookupPath)
  let lookupTable = JSON.parse(cdndata.toString())
  let redundantTable = lookupTable

  lookupTable = lookupTable[collection].files
  lookupTable.push( ...lookupEntries )

  lookupTable = sortItemArrayByRef(lookupTable)

  redundantTable[collection].files = lookupTable
  redundantTable.lockfile = false

  fs.writeFileSync(lookupPath, JSON.stringify(redundantTable, null, 2))
}

function getFileExtension(originalname) {
  return ('.' + originalname.split('.')[originalname.split('.').length-1])
}