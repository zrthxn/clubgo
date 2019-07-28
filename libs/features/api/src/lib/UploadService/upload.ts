import { InterfaceAPI } from '../features-api'
import { Observable } from 'rxjs'
import FormData from 'form-data'
import Axios from 'axios';
const config = require('../config.json')

export class UploadService extends InterfaceAPI {
  constructor() {
    super('cdn')
    this.setEndpoint(config.endpoints.cdn)
    this.authenticate()
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

export interface IUploadFile {
  data:string, 
  contentType: string,
  ext: string,
  filename: string
}
