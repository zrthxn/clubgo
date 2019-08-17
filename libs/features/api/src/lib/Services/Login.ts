import Interface from '../api'

export class LoginService extends Interface {
  accessLevel = null

  constructor(loginAccessLevel:string) {
    super({ endpoint: 'login', path: '/' })
    this.accessLevel = loginAccessLevel
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