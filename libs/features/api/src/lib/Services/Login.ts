import Interface from '../api'
import { APIEndpoints, APIProps } from '../api'

export class LoginService extends Interface {
  accessLevel = null

  constructor(endpoint:APIProps['endpoint']) {
    super({ endpoint })
  }

  /**
   * Authenticate with the backend server to get CSRF tokens and headers.
   */
  async authenticate() {
    const APIKEY = 'qWertT2uiOp2lkjhgfD5Sa2zxcvBn831'

    try {
      let authResponse = await this.request.post(
        this.endpoint, {
          shared: APIKEY
        }
      )
      
      let { token } = authResponse.data
      localStorage.setItem('X-Request-Validation', token)
    } catch (error) {
      
    } finally {
      return
    }
  }

  async login(loginId, password) {
    if(loginId==='admin' && password==='admin')
      return
    else
      return Promise.reject()
    // Send login request with login ID & password
    // GET Login Auth Headers specific to API level
    // let loginResponse = await this.request.post(
    //   this.endpoint, {
    //   loginAccessLevel: this.accessLevel,
    //   login: {
    //     loginId,
    //     password
    //   }
    // }, {
    //   headers: {
    //     'Accept': 'application/json',
    //     ...this.auth.headers
    //   },
    //   xsrfCookieName: null
    // })

    // this.auth.headers = {
    //   ...loginResponse.headers
    // }
  }
}