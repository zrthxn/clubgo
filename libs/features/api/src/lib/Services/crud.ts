import { Interface } from '../api'
import ErrorsAPI from '../errors'
import { Observable, ErrorObserver } from 'rxjs'
import { serialize } from '@clubgo/util'

/**
 * @description Standard Database CRUD Service
 * 
 * @author 
 * Alisamar Husain `zrthxn`
 */
export class DatabaseService extends Interface {
  model = null

  /**
   * @param `path` The route to the backend URI
   * @param `DatabaseModel` (optional)
   */
  constructor(path:string, DatabaseModel?) {
    super({ endpoint: 'api', path })
    
    if(DatabaseModel!==undefined)
      this.model = DatabaseModel
  }

  /**
   * Lists all the objects at the given route
   * @todo Make the objects streamable 
   */
  async list() {
    try {
      return await this.request.get(
        this.endpoint + '/_list'
      )      
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  /**
   * Finds an object by ID
   * @param id ID of the entry `Mongoose.ObjectID`
   */
  async findById(id:string) {
    // cRud
    return await this.request.get(
      this.endpoint + '/_get/' + id
    )
  }

  /**
   * Search for object by given params
   * @param search `Mongoose.Query` 
   */
  async searchBy(search:object) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_search', {
        query: serialize(search)
      }
    )
  }

  /**
   * Get a group of objects by ID
   * @param ids `Array<Mongoose.ObjectID>`
   */
  async findGroupById(ids:Array<string>) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_group/', {
        searchIds: ids
      }
    )
  }

  /**
   * Create a new oject
   * @param createBody `Mongoose.Document`
   */
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

  /**
   * Updates object by ID
   * @param id `ObjectID` to update
   * @param updateBody `Mongoose.Document | object` update body
   * @param options 
   */
  async update(id:string, updateBody:object, options?) {
    // crUd
    try {
      return await this.request.put(
        this.endpoint + '/_update/' + id, {
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

  /**
   * Delete object by ID
   * @param id `ObjectID`
   */
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