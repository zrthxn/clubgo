import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { FlexContainer, Flexbox, Event, Banner } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert, Carousel } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel } from '@clubgo/database'
import { serialize, getFormattedDate } from '@clubgo/util'

type URLParams = { 
  city: string
}

export default class EventListing extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    city: null,
    events: [],
    categories: [],
    localities: [],
    ads: [],

    listing: [],
    filters: { 
      'venue.title': 'Test Venue'
    }
  }

  eventService = new DatabaseService('/event')

  adService = new DatabaseService('/ads')

  componentDidMount() {
    let { city, search, when } = this.props.match.params
    let query = {}

    if(city!==undefined) {
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
      query = {
        ...query,
        venue: {
          city
        }
      }
      this.setState({ city })
    }

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

    if(when)
      this.eventService.recommend(query, {
        when
      }).then(({ data })=>{
        this.setState({
          events: data.results,
          listing: data.results
        })
      })
    else
      this.eventService.searchBy(query).then(({ data })=>{
        this.setState({
          events: data.results,
          listing: data.results
        })
      })

    // Advertising
    this.adService.searchBy({
      city
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

  filterEvents = () => {
    let { listing } = this.state
    for (const key in this.state.filters)
      if (this.state.filters.hasOwnProperty(key))
        listing = listing.filter(list => serialize(list)[key]===this.state.filters[key])
    console.log(serialize(listing[0]['venue.title']))
    this.setState({
      listing
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

        <section className="listing">
          {/* <div className="filters">
            <div className="drawer">
              <Button id="drawer-open" onClick={()=>{
                this.filterEvents()
              }}>
                Filters
              </Button>
            </div>
          </div> */}

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
