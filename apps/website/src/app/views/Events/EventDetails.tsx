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
  bookingService = new DatabaseService('/booking')
  venueService = new DatabaseService('/venue')
  
  event:IEventModel

  venue:IVenueModel

  state = {
    loading: true,
    currentEventId: null,
    calculatedLowestPrices: 0,
    attendees: 0,
    recommendations: {
      nearby: []
    }
  }
  
  componentDidMount() {
    let { id } = this.props.match.params
    this.fetchEventDetails(id).then(()=>{
      this.calculatePrice()
    })
  }

  componentDidUpdate() {
    let { id } = this.props.match.params
    if(id!==this.state.currentEventId && !this.state.loading) {
      this.setState({ loading: true })
      this.fetchEventDetails(id)
    }
  }

  calculatePrice = () => {
    let lowest = 999999999
    for (const ticket of this.event.bookings.tickets) {
      if(ticket.entry.entryType==='couple') {
        if(ticket.entry.pricing.couple.admissionPrice < lowest)
          lowest = ticket.entry.pricing.couple.admissionPrice
      }
      else if(ticket.entry.entryType==='single') {
        if(ticket.entry.pricing.single.admissionPrice < lowest)
          lowest = ticket.entry.pricing.single.admissionPrice
      }
    }

    this.setState({
      calculatedLowestPrices: lowest
    })
  }

  fetchEventDetails = async (id) => {
    let { event } = this.context.actions.fetchObjectPreload()

    if(event!==null) {
      this.event = event
    }
    else {
      event = await this.eventService.findById(id)
      this.event = event.data.results
    }

    let venue = await this.venueService.findById(this.event.venue.venueId)
    this.venue = venue.data.results
    
    this.context.actions.putObjectPreload({
      venue: this.venue
    })

    let attendees = await this.bookingService.searchBy({ event: { eventId: this.event._id } })
    
    this.setState({
      loading: false,
      currentEventId: id,
      attendees: attendees.data.results.length
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
                      <h2 className="event-title">
                        { this.event.eventTitle }
                      </h2>
                      
                      <h3 className="event-dates">
                        <b>{ (new Date(this.event.scheduling.customDates[0])).toDateString() }</b>
                      </h3>

                      <h3 className="venue-title">
                        { this.event.venue.title }, { this.event.venue.city }
                      </h3>

                      <h3 className="event-price">
                        Starting from &#x20B9;{ this.state.calculatedLowestPrices } 
                        <span style={{ opacity: 0.5, margin: '0 0.5em' }}>
                          {
                            this.event.bookings.isTakingOnsitePayments && this.event.bookings.onsitePaymentRequired ? null : (
                              '(Pay at Venue)'
                            )
                          }
                        </span>
                      </h3>

                      <div className="offers">
                        {
                          this.event.offers.availableOffers.map((offer, item)=>(
                            <div className="offer-item">
                              { offer.offerTitle }
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="button-container">
                      <button onClick={this.openBooking}>Book Now</button>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item md={8} xs={12}>
                <h2 className="underline bold">Event Details</h2>
                <div className="event-detail-items">
                  <p className="detail-item">
                    <span className="label">ARTISTS</span>
                    { 
                      this.event.artists.map((artist)=>(
                        <span className="item">{ artist }</span>
                      )) 
                    }
                  </p>

                  <p className="detail-item">
                    <span className="label">MUSIC</span>
                    { 
                      this.event.music.map((music)=>(
                        <span className="item">{ music }</span>
                      ))
                    }
                  </p>

                  <p className="detail-item">
                    <span className="label">DRESS CODE</span>
                    <span className="item">{ this.event.dressCode.title }</span>
                  </p>
                </div>
              </Grid>

              <Grid item md={8} xs={12}>
                <h2 className="underline bold">About</h2>
                <span>{ this.event.description }</span>
              </Grid>

              <Grid item md={8} xs={12}>
                <h2 className="underline bold">Venue</h2>
                { 
                  this.event.venue.isCustomVenue ? (
                    <div>
                      <h3>{ this.event.venue.title }</h3>
                      <span>{ this.event.venue.address }</span><br/>
                      <span>{ this.event.venue.customVenueDetails.locality }, { this.event.venue.city }</span>
                    </div>
                  ) : (
                    <div>
                      <h3>{ this.venue.venueTitle }</h3>
                      <span>{ this.venue.address }</span><br/>
                      <span>{ this.venue.locality }, { this.venue.city }</span>
                    </div>
                  )
                }
              </Grid>

              <Grid item md={8} xs={12}>
                <h2 className="underline bold">Terms and Conditions</h2>
                <p></p>
              </Grid>
            </Grid>
          </section>

          <section className="container">
            <h2>Similar Events</h2>
            <h4>Events recommended for you</h4>
            <Recommender path="/event" maxItemCount={10}
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