import { ModelController, IRouteItem } from './controller'
import Event from '../models/event.model'

export class EventController extends ModelController {
  xroutes:IRouteItem[] = [
    
  ]

  constructor() {
    super(Event)
  }

  /**
   * @override Default Search
   */
  search = async (req, res) => {
    const { query } = req.body
    const searchResult = await Event.find({ ...query })

    res.send({ 
      message: `Found ${searchResult.length} events`,
      results: searchResult 
    })
  }
}

export default EventController
