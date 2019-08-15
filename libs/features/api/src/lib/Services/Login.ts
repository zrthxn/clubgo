import InterfaceAPI from '../api'

export class LoginService extends InterfaceAPI {
  // constructor(apiType:string) {
  //   super(apiType)
  // }

  // async login(id, pw, headers?) {
  //   const loginEndpoint = APIEndpoints.login.url
  //   // Send login request with ID PW
  //   // GET Login Auth Headers specific to API level
  //   let loginResponse = await this.request.post(loginEndpoint, {
  //     apiType: this.apiType,
  //     login: {
  //       id,
  //       pw
  //     }
  //   }, {
  //     headers: {
  //       'Accept': 'application/json',
  //       ...this.auth.headers
  //     },
  //     xsrfCookieName: null
  //   })

  //   this.auth.headers = {
  //     ...loginResponse.headers
  //   }
  // }
}