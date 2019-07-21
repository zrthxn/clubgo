import { Observable, ErrorObserver } from 'rxjs'
import { ApiFeatures } from '../features-api'

export class VenueListingProvider extends ApiFeatures {
  constructor() {
    super()
    this.authenticate().then(a => console.log('Auth'))
  }

  create() {
    
  }

  fetch(category:string) {
    // this.requests.get('sd').then()
    // return new Observable((subs)=>{
    //  return Error('Sorry') 
    // })
    return 1
  }

  fetchLazy(f, next) {

  }

  fetchFiltered() {
    
  }
}