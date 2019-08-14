import InterfaceAPI, { APIProps } from '../api'
import { Observable, ErrorObserver } from 'rxjs'

import { IUserModel } from '@clubgo/database'

export class UserService extends InterfaceAPI {
  constructor(apiType:APIProps['apiTypes']) {
    super(apiType)
    this.addPathRoute('/user')
  }

  async listUsers() {
    return await this.request.get(
      this.endpoint + '/_list'
    )
  }

  async findUserById(userId:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_get/' + userId
    )
  }

  async findUserBy(findBy:string) {
    // cRud
    // return await this.request.post(
    //   this.endpoint + '/_find'
    // )
    return
  }

  async findUserGroupById(UserIds:Array<string>) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_group/', {
        searchIds: UserIds
      }
    )
  }

  async createUser(createBody:IUserModel) {
    // Crud
    return await this.request.post(
      this.endpoint + '/_create', {
        createBody,
        params: {

        }
      }
    )
  }

  async updateUser(updateBody) {
    // crUd
    return await this.request.put(
      this.endpoint + '/_update', {
        updateBody,
        params: {

        }
      }
    )
  }

  async deleteUser(UserId) {
    // cruD
    return await this.request.delete(
      this.endpoint + '/_delete/' + UserId
    )
  }
}