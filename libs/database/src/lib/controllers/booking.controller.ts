import { ModelController, IRouteItem } from './controller'
import Booking from '../models/booking.model'
import { conf } from '@clubgo/util'

export class BookingController extends ModelController {
  xroutes:IRouteItem[] = [
    
  ]

  constructor() {
    super(Booking)
  }

  /**
   * @override Default create
   */
  create = async (req, res) => {
    
  }

  /**
   * @override Default Search
   */
  search = async (req, res) => {
    const { query } = req.body
    const searchResult = await Booking.find({ ...query })

    res.send({ 
      message: `Found ${searchResult.length} matching records`,
      results: searchResult 
    })
  }
}

export default BookingController
