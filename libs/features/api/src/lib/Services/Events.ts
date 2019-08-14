import InterfaceAPI, { APIProps } from '../api'
import ErrorsAPI from '../errors'
import { Observable, ErrorObserver } from 'rxjs'

import { IEventModel } from '@clubgo/database'

export class EventService extends InterfaceAPI {
  constructor(apiType:APIProps['apiTypes']) {
    super(apiType)
    this.addPathRoute('/event')
  }

  async listEvents() {
    try {
      return await this.request.get(
        this.endpoint + '/_list'
      )      
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async findEventById(eventId:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_get/' + eventId
    )
  }

  async findEventBy(findBy:object) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_find', {
        searchQuery: {
          ...findBy
        }
      }
    )
  }

  async findEventGroupById(eventIds:Array<string>) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_group/', {
        searchIds: eventIds
      }
    )
  }

  async createEvent(createBody:IEventModel) { // IEventModel
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

  async updateEvent(eventId:string, updateBody:object) {
    // crUd
    try {
      return await this.request.put(
        this.endpoint + '/_update' + eventId, {
          updateBody,
          params: {

          }
        }
      )
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async deleteEvent(eventId:string) {
    // cruD
    try {
      return await this.request.delete(
        this.endpoint + '/_delete/' + eventId
      )
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }
}