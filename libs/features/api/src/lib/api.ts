import axios from 'axios'
import crypto from 'crypto'

export const APIEndpoints = process.env.NODE_ENV==='production' ? (
  require('./config.json').prod.endpoints
) : (
  require('./config.json').dev.endpoints
)

export default class Interface {
  request = axios
  
  protected auth = {
    accessKey: null,
    csrf: {

    },
    headers: {

    }
  }

  protected endpoint = APIEndpoints.api

  constructor(api:APIProps) {
    this.setAPIEndpoint(APIEndpoints[api.endpoint].url)

    if(APIEndpoints[api.endpoint].secure)
      this.authenticate(api.endpoint)
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

  async authenticate(authType, headers?) {
    // Send auth request
    // GET CSRF Tokens
    const authEndpoint = APIEndpoints.auth
    let authResponse = await this.request.post(authEndpoint, {
      apiType: authType,
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
  path: string
}
export interface AuthInitializationTypes {
  headers:Object
}