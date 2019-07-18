import axios from 'axios'

export class ApiFeatures {
  requests = axios

  constructor() {
    this.requests.create({
      baseURL: 'http://localhost:3333',
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