import axios from 'axios'
import crypto from 'crypto'

const config = require('./config.json')

export default class InterfaceAPI {
  request = axios
  apiType = null

  private auth = {
    accessKey: null,
    csrf: {

    },
    headers: {

    }
  }

  protected endpoint = config.endpoints.backend

  constructor(apiType:APIProps['apiTypes']) {
    this.setAPIEndpoint(config.endpoints[apiType].url)
    this.apiType = apiType

    this.authenticate()
  }

  addPathRoute(setPath:string) {
    this.endpoint += setPath
  }

  setAPIEndpoint(setUrl:string) {
    this.endpoint = setUrl

    this.request.create({
      baseURL: this.endpoint,
      timeout: 5000,
      headers: {
        'X-Basic-Auth': 'key'
      }
    })
  }

  async authenticate(headers?) {
    if(config.endpoints[this.apiType].secure) {
      const authEndpoint = config.endpoints.auth
      // Send auth request
      // GET CSRF Tokens
      // let authResponse = await this.request.post(authEndpoint, {
      //   apiType: this.apiType,
      //   client: {
      //     key: null, // random value
      //     token: null, // fixed value, hashed with key
      //   }
      // })

      // await this.login(null, null)
    }
    else
      return
  }

  async login(id, pw, headers?) {
    const loginEndpoint = config.endpoints.login
    // Send login request with ID PW
    // GET Login Auth Headers specific to API level
    let loginResponse = await this.request.post(loginEndpoint, {
      apiType: this.apiType,
      login: {
        id,
        pw
      }
    }, {
      headers: {
        'Accept': 'application/json',
        ...this.auth.headers
      },
      xsrfCookieName: null
    })

    this.auth.headers = {
      ...loginResponse.headers
    }
  }

  getEndpoint() { 
    return this.endpoint
  }
}

export interface APIProps {
  apiTypes: 'api' | 'admin' | 'cdn'
}
export interface AuthInitializationTypes {
  headers:Object
}