import axios from 'axios'
// import { encrypt, decrypt } from '@clubgo/util'
import * as ENV from '../../../env'

export const APIEndpoints = process.env.NODE_ENV==='production' ? (
  require('../config.json').prod.endpoints
) : (
  require('../config.json').dev.endpoints
)

export interface APIProps {
  endpoint: 'api' | 'cdn' | 'login' | 'auth'
  path?: string
  accessLevel?: 'webmaster' | 'user'
}

/**
 * Interface Class.
 * Standard methods used to connect to the backend or CDN servers.
 * Automatically handles authentication and URLs.
 * Inherited by other APIs to create Services.
 * 
 * @description Base API Interface Class.
 */
export class Interface {
  protected endpoint = APIEndpoints.api.url

  protected auth = {
    isAuth: false,
    csrf: null,
    headers: null,
    accessKey: null
  }

  request = axios.create({
    baseURL: this.endpoint,
    timeout: 5000
  })

  /**
   * @param api Properties/options
   */
  constructor(api:APIProps) {
    this.setAPIEndpoint(api.endpoint)

    if(api.path!==undefined)
      this.addPathRoute(api.path)

    this.request.interceptors.request.use((config)=>{
      let key = localStorage.getItem('X-Request-Validation')
      let token = localStorage.getItem('Authorization')
      if(key) this.auth.csrf = key
      if(token) this.auth.headers = token

      config.xsrfHeaderName = 'X-Request-Validation'
      config.headers = {
        [config.xsrfHeaderName]: this.auth.csrf,
        Authorization: this.auth.headers
      }
      return config
    })

    this.request.interceptors.response.use(
      (response) => Promise.resolve(response),
      (error) => {
        if(error.response.status===401)
          this.authenticate()
        return Promise.reject(error.response)
      }
    )
  }

  /**
   * @param endpoint `Desginator` to set as endpoint
   */
  setAPIEndpoint(endpoint:APIProps['endpoint']) {
    this.endpoint = APIEndpoints[endpoint].url

    this.request = axios.create({
      baseURL: this.endpoint,
      timeout: 5000
    })
  }

  setBaseURL(url:string) {
    this.endpoint = url

    this.request = axios.create({
      baseURL: this.endpoint,
      timeout: 5000
    })
  }

  /**
   * @returns `endpoint`
   */
  getEndpoint = () => this.endpoint

  /**
   * @param setPath `string` path to add to endpoint
   */
  addPathRoute(setPath:string) {
    this.endpoint += setPath
  }

  /**
   * @param header Header to stringify and add to auth
   */
  addAuthHeader(headers:object) {
    for (const key in headers) {
      if (headers.hasOwnProperty(key)) {
        const element = headers[key]
        this.auth.headers += 
          key + '~' + element.toString() + ';'
      }
    }
  }

  /**
   * Authenticate application with the backend 
   * to get CSRF headers.
   */
  async authenticate() {
    try {
      let authResponse = await this.request.post(
        APIEndpoints.auth.url, {
          apiKey: ENV.API_KEY //encrypt(ENV.API_KEY, 'base64')
        }
      )
      
      let { key, token } = authResponse.data
      localStorage.setItem('X-Request-Validation', key)
      localStorage.setItem('Authorization', token)
      this.auth.isAuth = true
    } catch (error) {
      console.error(error)
    } finally {
      return
    }
  }

  async isAuthenticated() {
    function checkAuth() {
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          if(localStorage.getItem('X-Request-Validation'))
            resolve()
          else
            reject()
        }, 10)
      })
    }

    for (let i = 0; i < 500; i++) {
      try {
        await checkAuth()
        this.auth.isAuth = true
        return
      } catch (error) {
        console.log('Checked', i)
        continue
      }
    }
  }
}
