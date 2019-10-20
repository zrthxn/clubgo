import React, { Component } from 'react'
import { RouteComponentProps, Switch, Route, Router } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import QueryString from 'query-string'

import './Booking.scss'
import { Button, Textbox, Lightbox } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel, IVenueModel } from '@clubgo/database'

import { TicketSelector } from './ui/TicketSelector'
import { Details } from './ui/Details'
import { } from '../Login/Login'
import RootContext from '../../RootContext'
import Payment from './ui/Payment'
import Confirmation from './ui/Confirmation'

type URLParams = {
  id: string
}

export default class BookingController extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    loading: true,
    loginValidated: false,
    ticketSelectionDone: false,
    bookingComplete: false,
    ticket: null,
    user: null,
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

  setTicket = (ticket) => {
    this.setState({
      ticket
    })
  }

  validateLogin = async () => {
    this.setState({
      loginValidated: false,
      ticketSelectionDone: true
    })
  }

  createBooking = async (txn) => {
    let { ticket, user } = this.state
    let { event, venue } = this
    try {
      let booking = await this.bookingService.create({ ticket, user, txn, event, venue })
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
                if(this.state.loginValidated)
                  if(this.state.bookingComplete)
                    return (
                      <Confirmation booking={this.state.booking}/>
                    )
                  else
                    return (
                      <Payment payment={this.state.ticket.payment} 
                        options={{
                          
                        }}
                        onComplete={(txn)=>{
                          this.createBooking(txn)
                        }}
                      />
                    )
                else
                  return (
                    <Details onComplete={(details)=>{
                      this.setState({
                        user: details,
                        loginValidated: true
                      })
                    }}/>
                  )
              else
                return (
                  <TicketSelector event={this.event} venue={this.venue}
                    onComplete={(ticket)=>{
                      this.validateLogin().then(()=>{
                        this.setTicket(ticket)
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
