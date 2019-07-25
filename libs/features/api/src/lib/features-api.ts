import axios from 'axios'

export class InterfaceAPI {
  request = axios

  protected auth = {
    csrf: {

    },
    headers: {

    }
  }

  protected endpoint = 'http://localhost:3333'

  constructor(api: 'api'|'admin') {
    this.addPathRoute(`/${api}`)
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
  }

  addPathRoute(setPath:string) {
    this.endpoint += setPath
  }

  setEndpoint(setUrl:string) {
    this.endpoint += setUrl
  }

  getEndpoint() { 
    return this.endpoint
  }
}

export interface AuthInitializationTypes {
  headers:Object
}