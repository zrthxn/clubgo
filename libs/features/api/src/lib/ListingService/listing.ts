import { Observable, ErrorObserver } from 'rxjs'
import { InterfaceAPI } from '../features-api'

export class ListingService extends InterfaceAPI {
  listClass = null

  constructor(props:ListingServiceProps) {
    super(props.api)
    this.authenticate()
      .then(()=>{
        if(props.listingType!==undefined && props.listingType!==null) {
          this.listClass = props.listingType
          this.addPathRoute(`/${props.listingType}`)
        }
      })
  }

  async getById(id:string) {
    this.request.get(
      this.endpoint + '/_get/' + id, 
      {

      }
    ).then(()=>{

    })
  }

  findBy() {
    this.request.post(
      this.endpoint + '/_find', 
      {

      }
    )
  }

  getGroup(group:object) {
    this.request.post(
      this.endpoint + '/_group', 
      {

      }
    )
  }
}

export interface ListingServiceProps {
  api: 'api' | 'admin', 
  listingType: 'venue' | 'event' | 'user' | 'artist' | 'venue'
}