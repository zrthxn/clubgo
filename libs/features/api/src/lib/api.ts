import axios from 'axios'
import crypto from 'crypto'

export const APIEndpoints = require('./config.json').endpoints

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

  protected endpoint = APIEndpoints.api

  constructor(apiType:APIProps['apiTypes']) {
    this.setAPIEndpoint(APIEndpoints[apiType].url)
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

    this.request.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error.response)
    )
  }

  async authenticate(headers?) {
    if(APIEndpoints[this.apiType].secure) {
      const authEndpoint = APIEndpoints.auth
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
    const loginEndpoint = APIEndpoints.login.url
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