import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Banner, Recommender, Event } from '@clubgo/website/components'
import { Grid } from '@material-ui/core'

import './Events.scss'

import { DatabaseService } from '@clubgo/api'
import { IEventModel, IVenueModel } from '@clubgo/database'
import RootContext from '../../RootContext'

type URLParams = {
  id: string
}

interface EventDetailProps {
  pr: string
}

export default class EventDetails extends Component<RouteComponentProps<URLParams> & EventDetailProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

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
          <section className="container">
            <Grid container spacing={3}>
              <Grid item md={8} xs={12}>
                <Banner image={ this.event.media.images[0].url }/>
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
  
                  <div>
                    <h2>Venue</h2>
                    <p>{ this.venue.venueTitle }</p>
                  </div>
                </div>
              </Grid>
            </Grid>
          </section>

          <section className="container">
            <h2>Similar Events</h2>
            <h4>Events recommended for you</h4>
            <Recommender maxItemCount={10}
              query={{
                venue: {
                  city: this.props.city
                }
              }}
              render={(eventProps:IEventModel)=>(
                <Event key={eventProps._id} data={eventProps} />
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
