import { ModelController, IRouteItem } from './controller'
import Venue, { IVenueModel } from '../models/venue.model'
import { getFormattedDate } from '@clubgo/util'

export class VenueController extends ModelController {
  constructor() {
    super(Venue)
    this.addRoutes(this.xroutes)
  }

  /**
   * @override Default Search
   */
  search = async (req, res) => {
    const { query } = req.body
    
    let searchResult = await Venue.find(query)
    searchResult = searchResult.sort((a, b)=>{
      if(a.settings.venuePriority < b.settings.venuePriority)
        return b.settings.venuePriority
      else
        return a.settings.venuePriority
    })

    res.send({ 
      message: `Found ${searchResult.length} venues`,
      results: searchResult 
    })
  }

  // tslint:disable-next-line: member-ordering
  xroutes:IRouteItem[] = [
    
  ]
}

export default venueController
