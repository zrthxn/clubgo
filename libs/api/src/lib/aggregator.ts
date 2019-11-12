import axios from 'axios'
import { APIEndpoints } from './api'

export class Aggregator {
  constructor() {

  }

  register() {

  }

  execute() {
    axios.post(APIEndpoints.api.url + '/aggregation/_exec', {

    })
  }
}