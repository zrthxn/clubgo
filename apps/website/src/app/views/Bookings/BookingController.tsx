import React, { Component } from 'react'
import { RouteComponentProps, Switch, Route, Router } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import QueryString from 'query-string'

import './Booking.scss'
import { Button, Textbox, Lightbox, Checkout } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel, IVenueModel } from '@clubgo/database'

import { TicketSelector } from './ui/TicketSelector'
import RootContext from '../../RootContext'
import Confirmation from './ui/Confirmation'

type URLParams = {
  id: string
}

export default class BookingController extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    loading: true,
    ticketSelectionDone: false,
    bookingComplete: false,
    ticket: null,
    booking: null
  }

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')

  bookingService = new DatabaseService('/booking')
  
  event:IEventModel
  venue:IVenueModel

  componentDidMount() {
    this.fetchEventDetails(this.props.match.params.id).then(()=>{
      this.setState({ 
        loading: false
      })
    })
  }

  fetchEventDetails = async (id) => {
    let event = await this.eventService.findById(id)
    this.event = event.data.results

    let venue = await this.venueService.findById(this.event.venue.venueId)
    this.venue = venue.data.results
    
    return
  }

  createBooking = async (user, txn) => {
    let { ticket } = this.state, { event, venue } = this
    try {
      let booking = await this.bookingService.create({ ticket, user, txn, event, venue })
      booking = booking.data.results
      this.setState({
        booking, bookingComplete: true
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  render() {
    if(!this.state.loading) {
      return (
        <RootContext.Consumer>
          {
            appContext => {
              if(this.state.ticketSelectionDone)
                if(this.state.bookingComplete)
                  return (
                    <Confirmation booking={this.state.booking}/>
                  )
                else
                  return (
                    <Checkout payment={this.state.ticket.payment}
                      options={{
                        processingFeePercent: this.event.bookings.processingFeePercent,
                        taxPercent: this.event.bookings.taxPercent
                      }}
                      onComplete={(user, txn)=>{
                        this.createBooking(user, txn)
                      }}
                    />
                  )
              else
                return (
                  <TicketSelector event={this.event} venue={this.venue}
                    onComplete={(ticket)=>{
                      this.setState({
                        ticket, ticketSelectionDone: true
                      })
                    }}
                  />
                )
            }
          }
        </RootContext.Consumer>
      )
    }
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
