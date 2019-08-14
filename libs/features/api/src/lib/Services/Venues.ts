import InterfaceAPI, { APIProps } from '../api'
import ErrorsAPI from '../errors'
import { Observable, ErrorObserver } from 'rxjs'

import { IVenueModel } from '@clubgo/database'

export class VenueService extends InterfaceAPI {
  constructor(apiType:APIProps['apiTypes']) {
    super(apiType)
    this.addPathRoute('/venue')
  }

  async listVenues() {
    try {
      return await this.request.get(
        this.endpoint + '/_list'
      )
    } catch (HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async findVenueById(venueId:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_get/' + venueId
    )
  }

  async findVenueBy(findBy:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_find', {
        searchQuery: {
          
        }
      }
    )
  }

  async findVenueGroupById(venueIds:Array<string>) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_group', {
        searchIds: venueIds
      }
    )
  }

  async createVenue(createBody:object) { // IVenueModel
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

  async updateVenue(venueId, updateBody) {
    // crUd
    try {
      return await this.request.put(
        this.endpoint + '/_update/' + venueId, {
          updateBody
        }
      )
    } catch(HTTPError) {
      return Promise.reject(HTTPError)
    }
  }

  async deleteVenue(venueId) {
    // cruD
    try {
      return await this.request.delete(
        this.endpoint + '/_delete/' + venueId
      )
    } catch(HTTPError) {
      return Promise.reject(HTTPError)
    }    
  }
}