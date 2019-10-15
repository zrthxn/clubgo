import { ModelController, IRouteItem } from './controller'
import Event from '../models/event.model'

export class EventController extends ModelController {
  xroutes:IRouteItem[] = [
    { method: 'get', path: '/_recommend', handler: this.recommend }
  ]

  constructor() {
    super(Event)
    this.addRoutes(this.xroutes)
  }

  /**
   * @override Default Search
   */
  async search(req, res) {
    const { query } = req.body
    const searchResult = await this.Model.find({ ...query })

    res.send({ 
      message: `Found ${searchResult.length} matching records`,
      results: searchResult 
    })
  }

  async recommend(req, res) {

  }
}

export default EventController