import Interface, { APIProps } from '../api'
import ErrorsAPI from '../errors'
import { Observable, ErrorObserver } from 'rxjs'

export class DatabaseCRUDService extends Interface {
  model = null

  constructor(apiProps:APIProps, DatabaseModel?) {
    super(apiProps)
    this.model = DatabaseModel
  }

  async list() {
    try {
      return await this.request.get(
        this.endpoint + '/_list'
      )      
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async findById(id:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_get/' + id
    )
  }

  async findBy(findBy:object) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_find', {
        searchQuery: {
          ...findBy
        }
      }
    )
  }

  async findGroupById(ids:Array<string>) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_group/', {
        searchIds: ids
      }
    )
  }

  async create(createBody) {
    // Crud
    try {
      return await this.request.post(
        this.endpoint + '/_create', {
          createBody
        }
      )
    } catch(HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async update(id:string, updateBody:object, options?) {
    // crUd
    try {
      return await this.request.put(
        this.endpoint + '/_update' + id, {
          updateBody,
          params: {
            ...options
          }
        }
      )
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async delete(id:string) {
    // cruD
    try {
      return await this.request.delete(
        this.endpoint + '/_delete/' + id
      )
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }
}