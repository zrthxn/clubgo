import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import multer from 'multer'

import { APIEndpoints } from '@clubgo/api'
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

    let genFileName = parseInt((file.filename.split('upload_')[1]), 10).toString(36)

    fs.readFile(file.path, (FileError, data)=>{
      if (FileError) return res.status(500).send(FileError)
      
      // data = Buffer.from(data.toString())
      // let raw = decodeBase64Image(data.toString('base64'))
      
      let raw = decodeBase64Image(data.toString())
      
      let writePath = path.join(__storagedir, 'root')
      if(collection!=='root')
        writePath = path.join(writePath, collection)

      writePath = path.join(writePath, genFileName + 
        '.' + file.originalname.split('.')[file.originalname.split('.').length-1])
        
      // Write new image to root
      fs.writeFile(writePath, raw.data, (WriteFileError)=>{
        if (WriteFileError) res.status(500).send(WriteFileError)

        // Remove temp file
        fs.unlink(file.path, (UnlinkError)=>{
          if (UnlinkError) res.status(500).send(UnlinkError)
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
      ref: APIEndpoints.cdn.url + '/i/' + collection + '/' + genFileName,
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
          ref: APIEndpoints.cdn.url + '/i/' + genFileName,
          ...file
        })
      }
      else {
        writePath = path.join(writePath, collection, genFileName + getFileExtension(file.originalname))
        refs.push({
          ref: APIEndpoints.cdn.url + '/i/' + collection + '/' + genFileName,
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
      
      fs.readFile(file.path, (ReadFileError, data)=>{
        if (ReadFileError) return res.status(500).send(ReadFileError)

        // data = Buffer.from(data.toString('base64'))
        // let raw = decodeBase64Image(data.toString('base64'))
        
        let raw = decodeBase64Image(data.toString())
        // Write new image to root
        fs.writeFile(writePath, raw.data, ()=>{
          if (err) res.status(500).send(err)

          // Remove temp files
          fs.unlink(file.path, (UnlinkError)=>{
            if (UnlinkError) res.status(500).send(UnlinkError)
          })
        })      

      })  
    }

    createLookupEntries(collection, lookupEntries)
    res.send({ refs })
  })
})

// Utility Functions
// --------------------------------------------------------
const getFileExtension = (name) => ('.' + name.split('.')[name.split('.').length-1])

function createLookupEntries(collection:string, lookupEntries) {
  let lookupPath = path.join(__storagedir, 'root', 'lookup.json')
  let backupPath = path.join(__storagedir, 'root', 'lookup.backup.json')

  fs.readFile(lookupPath, (error, cdndata)=>{
    let lookupTable
    
    if(error) {
      cdndata = fs.readFileSync(backupPath)
      console.error('CDN Lookup Error Found, Using Backup', error)
    }

    try {
      lookupTable = JSON.parse(cdndata.toString())
    } catch (error) {
      cdndata = fs.readFileSync(backupPath)
      console.error('CDN Lookup Error Found, Using Backup', error)
      lookupTable = JSON.parse(cdndata.toString())
    }

    let redundantTable = lookupTable

    // Create Backup Lookup
    fs.writeFile(backupPath, JSON.stringify(redundantTable, null, 2), ()=>{})

    lookupTable = lookupTable[collection].files
    lookupTable.push( ...lookupEntries )

    lookupTable = sortItemArrayByRef(lookupTable)

    redundantTable[collection].files = lookupTable
    redundantTable.lockfile = false

    fs.writeFile(lookupPath, JSON.stringify(redundantTable, null, 2), ()=>{})
  })
}