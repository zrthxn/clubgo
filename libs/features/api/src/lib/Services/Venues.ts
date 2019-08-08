import InterfaceAPI, { APIProps } from '../api'
import { Observable, ErrorObserver } from 'rxjs'

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
      this.endpoint + '/_group/', {
        searchIds: venueIds
      }
    )
  }

  async createVenue(createBody:object) {
    // Crud
    return await this.request.post(
      this.endpoint + '/_create', {
        createBody,
        params: {

        }
      }
    )
  }

  async updateVenue(updateBody) {
    // crUd
    return await this.request.put(
      this.endpoint + '/_update', {
        updateBody,
        params: {

        }
      }
    )
  }

  async deleteVenue(venueId) {
    // cruD
    return await this.request.delete(
      this.endpoint + '/_delete/' + venueId
    )
  }
}