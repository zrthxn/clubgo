import axios from 'axios'

export class ApiFeatures {
  requests = axios

  auth = {
    csrf: {

    },
    headers: {

    }
  }

  constructor() {
    this.requests.create({
      baseURL: '/api',
      timeout: 5000,
      headers: {
        'X-Custom-Header': 'foobar',
        'X-Basic-Auth': 'key'
      }
    })
  }

  async authenticate() {

  }

  async createStream() {

  }

  async createSocket() {
    
  }
}