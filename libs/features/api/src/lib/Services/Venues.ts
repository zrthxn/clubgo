import InterfaceAPI, { APIProps } from '../api'
import ErrorsAPI from '../errors'
import { Observable, ErrorObserver, from } from 'rxjs'

import { IVenueModel } from '@clubgo/database'

const config = require('../config.json')

export class VenueService extends InterfaceAPI {
  constructor(apiType:APIProps['apiTypes']) {
    super(apiType)
    this.addPathRoute('/venue')
  }

  async listVenues() {
    return await this.request.get(
      this.endpoint + '/_list'
    )
  }

  async findVenueById(venueId:string) {
    // cRud
    return await this.request.post(
      this.endpoint + '/_get/' + venueId
    )
  }

  async findVenueBy(findBy:string) {
    // cRud
    // this.setEndpoint(config.api)
    // this.addPathRoute('/api')

    // return await this.request.post(
    //   this.endpoint + '/_find'
    // )
    return
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
    } catch(err) {
      return Promise.reject(err)
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
    } catch(err) {
      return Promise.reject(err)
    }
  }

  async deleteVenue(venueId) {
    // cruD
    try {
      return await this.request.delete(
        this.endpoint + '/_delete/' + venueId
      )
    } catch(err) {
      return Promise.reject(err)
    }    
  }
}