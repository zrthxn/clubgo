import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { FlexContainer, Flexbox, Event, Banner, FlexScroll } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert, Carousel } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel, ICategoryModel, ILocationModel } from '@clubgo/database'
import { serialize, getFormattedDate } from '@clubgo/util'

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
          src: ad.imageURL, link: ad.link
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
    this.eventService.searchBy(query).then(({ data })=>{
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
        if(filters.hasOwnProperty(key) && filters[key]!==query[key])
          filters[key] = query[key]
        else
          filters = { ...filters, ...query }
      }
    }
    
    for(const key in filters) {
      if(filters.hasOwnProperty(key)) {
        listing = events.filter((list)=>{
          list = serialize(list)
          if(Array.isArray(list[key]))
            return list[key].includes(filters[key])
          else
            return list[key] === filters[key]
        })
      }
    }
    
    this.setState({
      listing, filters
    })
  }

  render() {
    return (
      <article className="event-listing">
        <section className="container adverts"> 
          <Carousel items={this.state.ads}/>
        </section>
        
        <section className="container center">
          <h1>Where's the Party?</h1>
          {
            this.state.city!==null ? (
              <h3>We found { this.state.listing.length } Events in { this.state.city }</h3>
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
            {
              this.state.categories.map((category:ICategoryModel)=>(
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
            }
          </FlexScroll>

          <div className="filter-category">
            {
              this.state.filters!==Object() ? (
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
                  this.state.listing.map((event:IEventModel, index)=>{
                    return (
                      <Event key={event._id} data={event}/>
                    )
                  })
                }
              </Flexbox>
            </FlexContainer>
          </div>
        </section>
      </article>
    )
  }
}
