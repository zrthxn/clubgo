import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Banner } from '@clubgo/website/components'
import { Grid } from '@material-ui/core'

import './Events.scss'

import { DatabaseService } from '@clubgo/features/api'
import { IEventModel, IVenueModel } from '@clubgo/database'
import Context from '../../ContextProvider'

type URLParams = {
  eventRef: string
}

interface EventDetailProps {
  pr: string
}

export default class Details extends Component<RouteComponentProps<URLParams> & EventDetailProps> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')
  
  event:IEventModel

  venue:IVenueModel

  state = {
    loading: true
  }
  
  componentDidMount() {
    let { eventRef } = this.props.match.params
    this.eventService.searchBy({
      ref: eventRef
    }).then((event)=>{
      this.event = event.data.results[0]

      this.venueService.findById(this.event.venue.venueId).then((venue)=>{
        this.venue = venue.data.results
      })

      this.setState({
        loading: false
      })
    })
  }

  openBooking = () => {
    this.context.router('/event/booking/' + this.event.ref)
  }
  
  render() {
    if(!this.state.loading)
      return (
        <article className="event-details">
          <section className="container head">
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
                    {/* <span>45+</span> */}
                  </div>
                </div>
              </Grid>

              <Grid item md={8} xs={12}>
                <div className="details">
                  <p>
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye bye
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be 
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be
                    Details page this that heelo hi bye be
                  </p>

                  <h2>Venue</h2>
                  <p>
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye bye
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be 
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be
                    Details page this that heelo hi bye be
                  </p>
                  <p>
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye bye
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be 
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be
                    Details page this that heelo hi bye be
                  </p>
                  <p>
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye bye
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be 
                    Details page this that heelo hi bye be Details page this that heelo hi bye be Details page this that heelo hi bye be
                    Details page this that heelo hi bye be
                  </p>
                </div>
              </Grid>
            </Grid>
          </section>
        </article>
      )
    else
      return (
        <article>
          <section style={{ height: '100vh' }} className="center">
            <h1 style={{ margin: '5em' }}>Loading</h1>
          </section>
        </article>
      )
  }
}
