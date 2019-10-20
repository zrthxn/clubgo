import React, { Component } from 'react'
import { RouteComponentProps, Switch, Route, Router } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import QueryString from 'query-string'

import './Booking.scss'
import { Button, Textbox, Lightbox } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { IEventModel, IVenueModel } from '@clubgo/database'

import { Ticket } from './ui/Ticket'
import { Details } from './ui/Details'
import { BookingContext, BookingContextProvider } from './BookingContextProvider'
import RootContext from '../../RootContext'

type URLParams = {
  id: string
}

export default class BookingController extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    loading: true
  }

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')
  
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

  validateLogin = async () => {
    this.context.router('/login?' + QueryString.stringify({
      utm_source: 'bookings',
      intent: 'basic',
      return: '/bookings/' + this.event._id + '/start'
    }))
    return
  }

  render() {
    if(!this.state.loading) {
      return (
        <RootContext.Consumer>
          {
            appContext => (
              <BookingContextProvider>
                <BookingContext.Consumer>
                  {
                    bookingContext => {
                      return (
                        <Ticket event={this.event} venue={this.venue}
                          onComplete={(ticket)=>{
                            bookingContext.actions.setTicket(ticket)
                            this.validateLogin()
                          }}
                        />
                      )
                    }
                  }
                </BookingContext.Consumer>
              </BookingContextProvider>
            )
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
