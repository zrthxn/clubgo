import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Banner, Recommender, Event } from '@clubgo/website/components'
import { Grid } from '@material-ui/core'

import './Events.scss'

import { DatabaseService } from '@clubgo/features/api'
import { IEventModel, IVenueModel } from '@clubgo/database'
import Context from '../../ContextProvider'

type URLParams = {
  id: string
}

interface EventDetailProps {
  pr: string
}

export default class EventDetails extends Component<RouteComponentProps<URLParams> & EventDetailProps> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')
  
  event:IEventModel

  venue:IVenueModel

  state = {
    loading: true,
    currentEventId: null,
    recommendations: {
      nearby: []
    }
  }
  
  componentDidMount() {
    let { id } = this.props.match.params
    this.fetchEventDetails(id)
  }

  componentDidUpdate() {
    let { id } = this.props.match.params
    if(id!==this.state.currentEventId && !this.state.loading) {
      this.setState({ loading: true })
      this.fetchEventDetails(id)
    }
  }

  fetchEventDetails = (id) => {
    this.eventService.findById(id).then((event)=>{
      this.event = event.data.results

      this.venueService.findById(this.event.venue.venueId).then((venue)=>{
        this.venue = venue.data.results
        
        this.setState({
          loading: false,
          currentEventId: id
        })
      })
    })
  }
  
  openBooking = () => {
    this.context.router('/bookings/' + this.event._id + '/start')
  }
  
  render() {
    if(!this.state.loading)
      return (
        <article className="event-details">
          <section>
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <Banner image={'https://i.guim.co.uk/img/media/843fe2c5546f7e50bb973e3ed3a00a1d2faf872c'+
                  '/15_100_813_488/master/813.jpg?width=1200&height=630&quality=85&auto=format&fit=crop'+
                  '&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc'+
                  '&enable=upscale&s=9a543f0c29ed8d437fcfee9a45377784'}/>
              </Grid>

              <Grid item md={4} xs={12} style={{ position: 'relative' }}>
                <div className="action">
                  <div className="floater">
                    <div className="block">
                      <h2 className="event-name">{ this.event.eventTitle }</h2>
                      <h3 className="venue-name">{ this.event.venue.title }</h3>
                      <span>Dates | Offers</span>
                    </div>
                    <button onClick={this.openBooking}>Book Now</button>
                  </div>
                  
                  <div className="attendees">
                    <p>Attending</p>
                    {
                      [1,2,3,4].map((user, index)=>(
                        <span key={`attendee-${index}`}>
                          <img src="" alt="" hidden/>
                        </span>
                      ))
                    }
                  </div>
                </div>
              </Grid>

              <Grid item md={8} xs={12}>
                <div className="details">
                  <h2>About</h2>
                  <p>{ this.event.description }</p>
  
                  <div className="venue">
                    <h2>Venue</h2>
                    <p>{ this.venue.venueTitle }</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </section>

          <section>
            <h2>Similar Events</h2>
            <h4>Events recommended for you</h4>
            <Recommender maxItemCount={10}
              render={(eventProps:IEventModel)=>(
                <Event data={eventProps} key={`recom-item-${eventProps._id}`}/>
              )}
            />
          </section>
        </article>
      )
    else
      return (
        <article>
          <section style={{ height: '50vh' }} className="center">
            <h1 style={{ margin: '5em 0' }}>Loading</h1>
          </section>
        </article>
      )
  }
}
