import axios from 'axios'
import * as crypto from 'crypto'

export const APIEndpoints = process.env.NODE_ENV==='production' ? (
  require('./config.json').test.endpoints
) : (
  require('./config.json').dev.endpoints
)

export interface APIProps {
  endpoint: 'api' | 'cdn' | 'login' | 'auth'
  path?: string
  accessLevel?: 'admin' | 'user'
}

/**
 * Interface Class.
 * Standard methods used to connect to the backend or CDN servers.
 * Automatically handles authentication and URLs.
 * Inherited by other APIs to create Services.
 * 
 * @description Base API Interface Class.
 */
export default class Interface {
  protected endpoint = APIEndpoints.api.url

  private auth = {
    csrf: null,
    headers: null
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

    let xsrf = localStorage.getItem('X-Request-Validation')
    if(xsrf!==undefined) this.auth.csrf = xsrf

    this.request.interceptors.request.use((config)=>{
      config.xsrfHeaderName = 'X-Request-Validation'
      config.headers = {
        [config.xsrfHeaderName] : this.auth.csrf,
        Authorization: this.auth.headers,
        // Host: this.endpoint
      }
      return config
    })

    this.request.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error.response)
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
  getEndpoint() { 
    return this.endpoint
  }

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
}
