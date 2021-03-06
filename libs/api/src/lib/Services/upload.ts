import { Interface } from '../api'
import { Observable, ErrorObserver } from 'rxjs'

// Syntheic default import necessary 
const FormData = require('form-data')

export class UploadService extends Interface {
  constructor(uploaderProps:UploadServiceProps) {
    super({ endpoint: 'cdn', path: '/_upload' })

    let collection = 'root'
    if(uploaderProps.collection!==null && uploaderProps.collection!==undefined)
      collection = uploaderProps.collection

    this.addPathRoute(`/${uploaderProps.uploadType}/${collection}`)
  }

  async single(file:IUploadFile) {
    let form = new FormData()
    form.append('upload', 
      new Blob([file.data], { 
        type: file.contentType
      }), 
      file.filename
    )

    try {
      let results = await this.request.post(
        this.endpoint, form, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return Promise.resolve(results)
    } catch(err) {
      return Promise.reject(err)
    }
  }

  async multiple(files:[IUploadFile]) {
    let form = new FormData()
    files.forEach( 
      file => 
        form.append('uploads', 
          new Blob([file.data], { 
            type: file.contentType
          }), 
          file.filename
        ) 
    )

    try {
      let results = await this.request.post(
        this.endpoint, form, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      return Promise.resolve(results)
    } catch(err) {
      return Promise.reject(err)
    }
  }
}

export interface UploadServiceProps {
  uploadType: 'single' | 'multiple',
  collection?: string
}

export interface IUploadFile {
  data: string, 
  contentType: string,
  ext: string,
  filename: string
}
