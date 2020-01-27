import { ModelController, IRouteItem } from './controller'
import Event, { IEventModel } from '../models/event.model'
import { getFormattedDate, fromFormattedDate, compareDates } from '@clubgo/util'
import { cacheWrite, cacheLookup } from '../cache'

export class EventController extends ModelController {
  constructor() {
    super(Event)
    this.addRoutes(this.xroutes)
  }

  /**
   * @override Default Search
   */
  search = async (req, res) => {
    var { query, options } = req.body

    if(!options)
      options = {}
    
    var searchResult = await Event.find(query)

    let date = new Date()
    
    // Filter out Unpublished events
    searchResult = searchResult.filter((item:IEventModel)=>{
      if(item.settings.isPublished) 
        return true
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
    var { query, options } = req.body
    
    if(options)
      var when = options.when
    else
      options = {}

    let date = new Date()
    if(when==='tomorrow')
      date = new Date(Date.now() + (24 * 60 * 60 * 1000))
    else if(when==='later')
      date = new Date(Date.now() + (2 * (24 * 60 * 60 * 1000)))

    let cacheKey = '--'
    for (const id in query)
      if (query.hasOwnProperty(id))
        cacheKey += query[id] + '-'
    cacheKey += '-'

    let data = await cacheLookup(cacheKey)
    if(data && !options.skipCache)
      var recommendations = data
    else{
      recommendations = await Event.find(query)
      cacheWrite(cacheKey, recommendations)
    }

    // Filter out Unpublished events
    recommendations = recommendations.filter((item:IEventModel)=>{
      if(options.includeUnpublishedEvents) 
        return true
      if(item.settings.isPublished) 
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
      return false
    })

    // Filter acc to when
    if(when)
      recommendations = recommendations.filter((item:IEventModel)=>{
        if(when==='later')
          return true 

        if(when==='past') {
          for (let customDate of item.scheduling.customDates) {
            customDate = new Date(customDate)
            if(compareDates(customDate, (new Date())) === -1)
              return true
          }
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
            if(compareDates(customDate, date)===0)
              return true
          }
        }
      })

    recommendations.sort((a, b) => a.settings.eventPriority - b.settings.eventPriority )

    // Sort by Date
    recommendations = recommendations.sort((a, b) => {
      let activeDateA = (new Date(a.scheduling.customDates[0])).valueOf()
      let activeDateB = (new Date(b.scheduling.customDates[0])).valueOf()
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
