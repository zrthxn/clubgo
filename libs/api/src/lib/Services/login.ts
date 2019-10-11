import { Interface } from '../api'

export class LoginService extends Interface {
  constructor(loginAs: 'webmaster' | 'user') {
    super({ endpoint: 'login' })
    this.addPathRoute(`/${loginAs}`)
  }

  async webmasterLogin(loginId, password) {
    if(loginId==='admin' && password==='admin')
      return { data: {} }
    else
      return Promise.reject()
  }

  async userLogin(loginId, password) {
    if(loginId==='user' && password==='user')
      return { data: {} }
    else
      return Promise.reject()
  }
}
