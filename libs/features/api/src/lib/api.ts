import axios from 'axios'
import crypto from 'crypto'

export const APIEndpoints = process.env.NODE_ENV==='production' ? (
  require('./config.json').test.endpoints
) : (
  require('./config.json').dev.endpoints
)

export default class Interface {
  request = axios
  
  protected auth = {
    accessKey: null,
    accessLevel: null,
    csrf: {

    },
    headers: {

    }
  }

  protected endpoint = APIEndpoints.api

  constructor(api:APIProps) {
    this.setAPIEndpoint(APIEndpoints[api.endpoint].url)
    this.addPathRoute(api.path)

    if(api.accessLevel!==null && api.accessLevel!==undefined)
      this.auth.accessLevel = api.accessLevel
    else
      this.auth.accessLevel = 'user'

    if(APIEndpoints[api.endpoint].secure)
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
    // Send auth request
    // GET CSRF Tokens
    const authEndpoint = APIEndpoints.auth.url
    let authResponse = await this.request.post(authEndpoint, {
      apiType: this.auth.accessLevel,
      client: {
        key: null, // random value
        token: null, // fixed value, hashed with key
      }
    })

    // await this.login(null, null)
  }

  getEndpoint() { 
    return this.endpoint
  }
}

export interface APIProps {
  endpoint: 'api' | 'cdn' | 'login' | 'auth',
  path: string,
  accessLevel?: 'admin' | 'user'
}
export interface AuthInitializationTypes {
  headers:Object
}