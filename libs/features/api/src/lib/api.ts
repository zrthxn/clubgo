import axios from 'axios'

// const { APIProps, AuthInitializationTypes } = require('./api.d.ts')
const config = require('./config.json')

export interface APIProps {
  apiTypes: 'api' | 'admin' | 'cdn'
}
export interface AuthInitializationTypes {
  headers:Object
}

export default class InterfaceAPI {
  request = axios

  protected auth = {
    csrf: {

    },
    headers: {

    }
  }

  protected endpoint = config.endpoints.backend

  constructor(apiType:APIProps['apiTypes']) {
    this.setEndpoint(config.endpoints[apiType].url)
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

    this.authenticate()
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
