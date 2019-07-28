import axios from 'axios'
const config = require('./config.json')

export class InterfaceAPI {
  request = axios

  protected auth = {
    csrf: {

    },
    headers: {

    }
  }

  protected endpoint = config.endpoints.backend

  constructor(apiType:APITypes['api']) {
    this.addPathRoute(`/${apiType}`)
    this.setEndpoint(config.endpoints[apiType])
    this.request.create({
      baseURL: this.endpoint,
      timeout: 5000,
      headers: {
        'X-Basic-Auth': 'key'
      }
    })
  }

  addPathRoute(setPath:string) {
    this.endpoint += setPath
  }

  setEndpoint(setUrl:string) {
    this.endpoint = setUrl

    this.request.create({
      baseURL: this.endpoint,
      timeout: 5000,
      headers: {
        'X-Basic-Auth': 'key'
      }
    })
  }

  async authenticate(headers?:Object) {
    // let csrf = {}
    // return csrf
    return
  }

  getEndpoint() { 
    return this.endpoint
  }
}

export interface APITypes {
  api: 'api' | 'admin' | 'cdn'
}
export interface AuthInitializationTypes {
  headers:Object
}