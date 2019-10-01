import React, { Component } from 'react'
import { RouteComponentProps, Switch, Route, Router } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import QueryString from 'query-string'

import './Booking.scss'
import { Button, Textbox } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/features/api'
import { IEventModel, IVenueModel } from '@clubgo/database'

import { Ticket } from './ui/Ticket'
import { Details } from './ui/Details'
import { BookingContext, BookingContextProvider } from './BookingContextProvider'
import Context from '../../ContextProvider'

type URLParams = {
  id: string
}

export default class BookingController extends Component<RouteComponentProps<URLParams>> {
  state = {
    loading: true,
    loginExists: false,
    ticket: {

    },
    user: {

    }
  }

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')
  
  event:IEventModel

  venue:IVenueModel

  componentDidMount() {
    this.fetchEventDetails(this.props.match.params.id).then(()=>{
      this.validateLogin().then(()=>{
        this.setState({ 
          loading: false,
          loginExists: true 
        })
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
    // Check if login exists, validate
    // If fail, go to login
    // .then(()=>{
    // 
    // })
    return
  }

  render() {
    if(!this.state.loading) {
      return (
        <Context.Consumer>
          {
            appContext => (
              <BookingContextProvider>
                <Ticket event={this.event} venue={this.venue}
                  onComplete={(ticket)=>{
                    this.setState({ ticket })
                    appContext.router('/login?' + QueryString.stringify({
                      utm_source: 'bookings',
                      intent: 'basic',
                      return: '/bookings/' + this.event._id + '/start'
                    }))
                  }}
                />
                
                <p>
                  {
                    JSON.stringify(appContext.state.user)
                  }
                </p>
              </BookingContextProvider>
            )
          }
        </Context.Consumer>
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
