import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { FlexContainer, Flexbox, Event, Banner, FlexScroll, EventPlaceholder, FlexGrid } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert, Carousel } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel, ICategoryModel, ILocationModel } from '@clubgo/database'
import { serialize, getFormattedDate } from '@clubgo/util'
import { Grid } from '@material-ui/core'
import Context from '../../Context'
import ContextStore from '../../ContextStore'
import { SlidingCarousel } from '@clubgo/website/components'

type URLParams = { 
  city: string
}

export default class EventListing extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    city: null,
    date: null,
    events: [],
    categories: [],
    localities: [],
    ads: [],

    listing: [],
    filters: {}
  }

  eventService = new DatabaseService('/event')
  adService = new DatabaseService('/ads')

  auxCategoryService = new DatabaseService('/category')
  auxLocationService = new DatabaseService('/location')

  componentDidMount() {
    let { city, search, when } = this.props.match.params

    if(when) this.findEventsByDate(when, city, search)
    else this.findEventsBySearchQuery(search, city)

    // Categories
    this.auxCategoryService.searchBy({
      categoryType: 'event'
    }).then(({ data })=>{
      this.setState({
        categories: data.results
      })
    })

    // Localities
    this.auxLocationService.searchBy({
      city: city.substr(0, 1).toUpperCase() + city.substr(1)
    }).then(({ data })=>{
      let localities = []
      for (const location of data.results) {
        for (const locality of location.localities) {
          localities.push(locality)
        }
      }
      this.setState({
        localities
      })
    })

    // Advertising
    this.adService.searchBy({
      city: city.substr(0, 1).toUpperCase() + city.substr(1)
    }).then(({ data })=>{
      let ads = []
      for (const ad of data.results) {
        ads.push({
          src: ad.imageURL, link: ad.link, text: ad.advertTitle
        })
      }
      this.setState({
        ads
      })
    })
  }

  createSearchQuery = (city?, search?) => {
    let query = {}
    if(city===undefined)
      city = this.props.match.params.city
    city = city.substr(0, 1).toUpperCase() + city.substr(1)
    query = {
      ...query,
      venue: {
        city
      }
    }

    this.setState({ city })

    if(search!==undefined) {
      search = search.trim()
      search = search.replace(/-/g, ' ')
      query = {
        ...query,
        $text: {
          $search: search
        }
      }
    }

    return query
  }

  findEventsBySearchQuery = (search, city?) => {
    let query = this.createSearchQuery(city, search)
    this.eventService.recommend(query).then(({ data })=>{
      if(city) {
        city = city.substr(0, 1).toUpperCase() + city.substr(1).toLowerCase()
        document.title = `${data.results.length} Upcoming Events in ${city} | ClubGo`
      }
      if(search)
        document.title = `${data.results.length} Upcoming Events for ${this.toCapitalizeCase(search.replace(/-/g, ' '))} in ${city} | ClubGo`
      this.setState({
        events: data.results,
        listing: data.results
      })
    })
  }
  
  findEventsByDate = (when, city?, search?) => {
    let query = this.createSearchQuery(city, search)
    this.eventService.recommend(query, {
      when
    }).then(({ data })=>{
      this.setState({
        events: data.results,
        listing: data.results
      })
    })
  }
  
  filterEvents = (query:object) => {
    let { listing, filters, events } = this.state
    
    for(const key in query) {
      if(query.hasOwnProperty(key)) {
        if(filters.hasOwnProperty(key) && filters[key]===query[key])
          delete filters[key]
        else
          filters = { ...filters, ...query }
      }
    }

    listing = events
    for(const key in filters) {
      if(filters.hasOwnProperty(key) && filters[key]!==null) {
        listing = listing.filter((listItem)=>{
          listItem = serialize(listItem)
          if(Array.isArray(listItem[key])) {
            for (const iterableListItemKey of listItem[key]) {
              if(iterableListItemKey.toLowerCase()===filters[key].toLowerCase())
                return true
              else
                continue
            }
          }
          else
            return listItem[key] === filters[key]
        })
      }
    }
    
    this.setState({
      listing, filters
    })
  }

  toCapitalizeCase(string:string) {
    let splits = string.split(' '), str = ''
    for (let word of splits)
      str += word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase() + ' '
    return str
  }

  render() {
    return (
      <article className="event-listing">
        {/* <Carousel items={this.state.ads}/> */}
        <SlidingCarousel items={this.state.ads}/>
        
        <section className="container center">
          <h1>Where's the Party?</h1>
          {
            this.state.city!==null ? (
              <h2>
                {
                  this.state.listing.length===0 ? '' : this.state.listing.length
                } {
                  this.props.match.params.when==='past' ? 'Past' : 'Upcoming'
                } Events {
                  this.props.match.params.search ? (
                    'for ' + this.toCapitalizeCase(this.props.match.params.search.replace(/-/g, ' '))
                  ) : ''
                } { 
                  this.state.city ? (
                    'in ' + this.toCapitalizeCase(this.state.city)
                  ) : ''
                }
              </h2>
            ) : (
              <h3>Events Nearby</h3>
            )
          }
        </section>

        <section className="filters center">
          <FlexScroll>
            {
              [
                { label: 'Today' },
                { label: 'Tomorrow' },
                { label: 'Later' }
              ].map((date, index)=>(
                <span className="filter-category-item"
                  style={ this.state.date===date.label ? {
                    background: '#fff', color: '#dd0000', fontWeight: 600
                  } : {
                    background: 'transparent', color: '#fff'
                  }}
                  onClick={()=>{
                    this.findEventsByDate(date.label.toLowerCase(), this.state.city)
                    this.setState({ date: date.label })
                  }}
                >
                  { date.label }
                </span>
              ))
            }
          </FlexScroll>

          <span className="title">Localities</span>
          <FlexScroll>
            {
              this.state.localities.map((locality)=>(
                <span className="filter-category-item"
                  style={ this.state.filters['venue.locality']===locality.name ? {
                    background: '#fff', color: '#dd0000', fontWeight: 600
                  } : {
                    background: 'transparent', color: '#fff'
                  }}
                  onClick={()=>{
                    this.filterEvents({ 'venue.locality': locality.name })
                  }}
                >
                  { locality.name }
                </span>
              ))
            }
          </FlexScroll>
          
          <span className="title">Categories</span>
          <FlexScroll>
            <Context.Consumer>
              { context => (
                context.store.categories
                .filter((category:ICategoryModel)=> category.categoryType==='event')
                .map((category:ICategoryModel)=>(
                  <span className="filter-category-item" 
                    style={ this.state.filters['categories']===category.name ? {
                      background: '#fff', color: '#dd0000', fontWeight: 600
                    } : {
                      background: 'transparent', color: '#fff'
                    }}
                    onClick={()=>{
                      this.filterEvents({ 'categories': category.name })
                    }}
                  >
                    { category.name }
                  </span>
                ))
              )}
            </Context.Consumer>
          </FlexScroll>

          <div className="filter-category">
            {
              Object.entries(this.state.filters).length!==0 ? (
                <Button size="small" onClick={()=>{
                  this.setState({
                    filters: {},
                    listing: this.state.events
                  })
                }}>
                  Clear
                </Button>
              ) : null
            }
          </div>
        </section>

        <section className="listing">
          <div className="list">
            <FlexContainer>
              <Flexbox flow="row">
                {
                  this.state.events.length===0 ? (
                    [1, 2, 3, 4].map(()=>(
                      <EventPlaceholder/>
                    ))
                  ) : null
                }
                
                {/* {
                  this.state.listing.map((event:IEventModel, index)=>{
                    return (
                      <Event key={event._id} data={event}/>
                    )
                  })
                } */}
              </Flexbox>
            </FlexContainer>

            <FlexGrid>
              {
                this.state.listing.map((event:IEventModel, index)=>{
                  return (
                    <Event key={event._id} data={event}/>
                  )
                })
              }
            </FlexGrid>
          </div>
        </section>
      </article>
    )
  }
}
