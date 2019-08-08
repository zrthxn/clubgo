import InterfaceAPI, { APIProps } from '../api'
import { Observable, ErrorObserver } from 'rxjs'

import { IEventModel } from '@clubgo/database'

const config = require('../config.json')

export class EventService extends InterfaceAPI {
  constructor(apiType:APIProps['apiTypes']) {
    super(apiType)
    this.addPathRoute('/event')
  }

  async listEvents() {
    return await this.request.get(
      this.endpoint + '/_list'
    )
  }

  async findEventById(EventId:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_get/' + EventId
    )
  }

  async findEventBy(findBy:string) {
    // cRud
    // return await this.request.post(
    //   this.endpoint + '/_find'
    // )
    return
  }

  async findEventGroupById(eventIds:Array<string>) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_group/', {
        searchIds: eventIds
      }
    )
  }

  async createEvent(createBody:object) { // IEventModel
    // Crud
    try {
      return await this.request.post(
        this.endpoint + '/_create', {
          createBody
        }
      )
    } catch(err) {
      return Promise.reject(err)
    }
  }

  async updateEvent(updateBody) {
    // crUd
    return await this.request.put(
      this.endpoint + '/_update', {
        updateBody,
        params: {

        }
      }
    )
  }

  async deleteEvent(eventId) {
    // cruD
    return await this.request.delete(
      this.endpoint + '/_delete/' + eventId
    )
  }
}