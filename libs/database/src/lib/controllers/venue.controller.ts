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
    searchResult.sort((a, b)=>{
      return a.settings.venuePriority - b.settings.venuePriority
    })

    res.send({ 
      message: `Found ${searchResult.length} venues`,
      results: searchResult 
    })
  }

  /**
   * @description Recommendations
   */
  recommend = async (req, res) => {
    const { query, options } = req.body
    
    let recommendations = await Venue.find(query)

    // Filter out Unpublished events
    recommendations = recommendations.filter((item:IVenueModel)=>{
      if(item.settings.isPublished) 
        return true
      if(options)
        if(options.includeUnpublishedVenues) 
          return true
      return false
    })

    recommendations.sort((a, b)=>{
      return a.settings.venuePriority - b.settings.venuePriority
    })

    res.send({ 
      message: `Found ${recommendations.length} events`,
      results: recommendations 
    })
  }

  // tslint:disable-next-line: member-ordering
  xroutes:IRouteItem[] = [
    { method: 'post', path: '/_recommend', handler: this.recommend }
  ]
}

export default venueController
