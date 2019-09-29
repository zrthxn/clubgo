import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import './Booking.scss'
import { Button, Textbox } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/features/api'
import { IEventModel, IVenueModel } from '@clubgo/database'

import { Ticket } from './Ticket'
import { Details } from './Details'

type URLParams = {
  id: string
}

export default class BookingController extends Component<RouteComponentProps<URLParams>> {
  state = {
    loading: true,
    loginExists: false
  }

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')
  
  event:IEventModel

  venue:IVenueModel

  user = null

  componentDidMount() {
    this.fetchEventDetails(this.props.match.params.id).then(()=>{
      // Check if login exists, validate
      // If fail, go to login
      // .then(()=>{
          this.setState({ 
            loading: false,
            // loginExists: true 
          })
      // })
    })
  }

  fetchEventDetails = async (id) => {
    let event = await this.eventService.findById(id)
    this.event = event.data.results

    let venue = await this.venueService.findById(this.event.venue.venueId)
    this.venue = venue.data.results
    
    return
  }

  render() {
    if(!this.state.loading) {
      if(this.state.loginExists)
        return (
          <Ticket event={this.event} venue={this.venue}/>
        )
      else
        return (
          <Details onComplete={(data)=>{
            this.setState({
              loginExists: true
            })
          }}/>
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
