import { Interface } from '../api'

export class LoginService extends Interface {
  private accessLevel

  constructor(loginAs: 'webmaster' | 'user') {
    super({ endpoint: 'login' })
    this.accessLevel = loginAs
  }

  async webmasterLogin(loginId, password) {
    if(loginId==='ajit@clubgo' && password==='Ajit@Yadav123')
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

  async getOTP(name:string, phone:string) {
    try {
      return await this.request.post('/otp', {
        user: {
          name, phone
        }
      })
    } catch (LoginServiceError) {
      return Promise.reject(LoginServiceError)
    }
  }
}
