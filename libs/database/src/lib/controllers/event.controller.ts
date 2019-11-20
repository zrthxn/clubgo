import { ModelController, IRouteItem } from './controller'
import Event, { IEventModel } from '../models/event.model'
import { getFormattedDate, fromFormattedDate } from '@clubgo/util'

export class EventController extends ModelController {
  constructor() {
    super(Event)
    this.addRoutes(this.xroutes)
  }

  /**
   * @override Default Search
   */
  search = async (req, res) => {
    const { query, options } = req.body
    
    let searchResult = await Event.find(query)

    let date = new Date()
    
    // Filter out Unpublished events
    searchResult = searchResult.filter((item:IEventModel)=>{
      if(item.settings.isPublished) 
        return true
      if(options)
        if(options.includeUnpublishedEvents) 
          return true
      return false
    })

    // Filter out past events
    searchResult = searchResult.filter((item:IEventModel)=>{
      if(options)
        if(options.includePastEvents) 
          return true

      if(item.scheduling.isRecurring)
        return true
      else {
        for (let customDate of item.scheduling.customDates) {
          customDate = new Date(customDate)
          if(customDate.getFullYear()>=date.getFullYear())
            if(customDate.getMonth()>=date.getMonth())
              if(customDate.getDate()>=date.getDate())
                return true
              else
                return false
            else
              return false
          else
            return false
        }
      }
    })

    searchResult.sort((a, b) => a.settings.eventPriority - b.settings.eventPriority )

    res.send({ 
      message: `Found ${searchResult.length} events`,
      results: searchResult 
    })
  }

  /**
   * @description Recommendations
   */
  recommend = async (req, res) => {
    const { query, options } = req.body
    
    if(options)
      var when = options.when

    let date = new Date()
    if(when==='tomorrow')
      date = new Date(Date.now() + (24 * 60 * 60 * 1000))
    else if(when==='later')
      date = new Date(Date.now() + (7 * (24 * 60 * 60 * 1000)))

    let recommendations = await Event.find(query)

    // Filter out Unpublished events
    recommendations = recommendations.filter((item:IEventModel)=>{
      if(item.settings.isPublished) 
        return true
      if(options)
        if(options.includeUnpublishedEvents) 
          return true
      return false
    })

    // Filter out past events
    recommendations = recommendations.filter((item:IEventModel)=>{
      if(when)
        if(when==='past')
          return true
          
      if(options)
        if(options.includePastEvents) 
          return true
          
      if(item.scheduling.isRecurring)
        return true
      else {
        for (let customDate of item.scheduling.customDates) {
          customDate = new Date(customDate)
          if(customDate.getFullYear()>=date.getFullYear())
            if(customDate.getMonth()>=date.getMonth())
              if(customDate.getDate()>=date.getDate())
                return true
              else
                return false
            else
              return false
          else
            return false
        }
      }
    })

    // Filter acc to when
    recommendations = recommendations.filter((item:IEventModel)=>{
      if(when===undefined)
        return true

      if(when)
        if(when==='past') {
          for (let customDate of item.scheduling.customDates) {
            customDate = new Date(customDate)
            if(customDate.getFullYear()<=date.getFullYear())
              if(customDate.getMonth()<=date.getMonth())
                if(customDate.getDate()<date.getDate())
                  return true
                else
                  return false
              else
                return false
            else
              return false
          }
        }

      if(when==='later') {
        // TODO later in this week
        return true
      }

      if(when==='today')
        if(item.scheduling.type==="daily")
          return true

      if(item.scheduling.isRecurring) {
        if(item.scheduling.recurring.date.includes(date.getDate()))
          return true
        if(item.scheduling.recurring.day.includes(getFormattedDate(date.getDay()).dayOfTheWeek))
          return true
        return false
      }
      else {
        for (let customDate of item.scheduling.customDates) {
          customDate = new Date(customDate)
          if(customDate.getFullYear()===date.getFullYear())
            if(customDate.getMonth()===date.getMonth())
              if(customDate.getDate()===date.getDate())
                return true
              else
                return false
            else
              return false
          else
            return false
        }
      }
    })

    recommendations.sort((a, b) => a.settings.eventPriority - b.settings.eventPriority )

    // Sort by Date
    recommendations = recommendations.sort((a, b) => {
      let activeDateA = a.scheduling.customDates[0].valueOf()
      let activeDateB = b.scheduling.customDates[0].valueOf()
      return activeDateA - activeDateB      
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

export default EventController
