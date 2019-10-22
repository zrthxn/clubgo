import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { FlexContainer, Flexbox, Event, Banner } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert, Carousel } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel } from '@clubgo/database'
import { serialize } from '@clubgo/util'

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

    listing: [],
    filters: { 
      'venue.title': 'Test Venue'
    }
  }

  eventService = new DatabaseService('/event')

  advertService = new DatabaseService('/ads')

  componentDidMount() {
    let { city } = this.props.match.params
    if(city!==undefined) {
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
      this.setState({
        city
      })
    }

    this.eventService.searchBy({
      venue: {
        city
      }
    }).then(({ data })=>{
      this.setState({
        events: data.results,
        listing: data.results
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
          <Carousel items={[
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            },
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            },
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            }
          ]}/>
        </section>
        
        <section className="container center">
          <h1>Where's the Party?</h1>
          {
            this.state.city!==null ? (
              <h3>{ this.state.listing.length } Events in { this.state.city }</h3>
            ) : (
              <h3>Events Nearby</h3>
            )
          }
        </section>

        <section className="container listing">
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
