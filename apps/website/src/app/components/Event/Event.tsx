import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Event.scss'

import RootContext from '../../RootContext'
import { Image } from '../Image/Image'
import { IEventModel } from '@clubgo/database'
import { formatTime, getFormattedDate } from '@clubgo/util'

interface EventComponentProps {
  data: IEventModel
  size?: 'small' | 'large'
  color?: 'dark' | 'white'
  image?: string
}

export class Event extends Component<EventComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    calculatedLowestPrices: 0
  }

  detailsPageURL = `/event/${this.props.data._id}/${this.props.data.eventTitle.toLowerCase().trim().replace(/ /g,'-')}`

  componentDidMount() {
    this.calculatePrice()
  }

  calculatePrice = () => {
    let lowest = 999999999
    if(!this.props.data.bookings.isTakingOnsiteBookings)
      lowest = 0
    else
      for (const ticket of this.props.data.bookings.tickets) {
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

  openEventDetails = () => {
    window.scrollTo(0, 0)
    this.context.actions.putObjectPreload({ event: this.props.data })
    this.context.router(this.detailsPageURL)
  }

  render() {
    var eventCardStyle = 'event'

    if(this.props.size!==undefined)
      eventCardStyle += ' ' + this.props.size
      
    if(this.props.color!==undefined)
      eventCardStyle += ' ' + this.props.color

    return (
      <RootContext.Consumer>
        {
          appContext => (
            <div className={eventCardStyle} onClick={this.openEventDetails}>
              <div className="image-container">
                {
                  this.props.data.media.images.length!==0 ? (
                    <Image src={ this.props.data.media.images[0].url }/>
                  ) : (
                    <Image src="/assets/clubgo.png"/>
                  )
                }
              </div>
      
              <div className="category">
                <p>{ this.props.data.categories[0] }</p>
              </div>
              
              <Link to={this.detailsPageURL} onClick={this.openEventDetails}>
                <h3 className="event-title">{ this.props.data.eventTitle }</h3>
              </Link>
      
              <h4 className="event-venue">{ this.props.data.venue.title }</h4>
      
              <p style={{ margin: '0.75em 0 0.5em 0', fontSize: '0.75em', opacity: 0.75 }}>
                <span>
                  { 
                    getFormattedDate((new Date(this.props.data.scheduling.customDates[0]))).shortNaturalDate
                  }
                </span>
                <span style={{ marginLeft: '0.5em' }}>
                  { 
                    formatTime(this.props.data.scheduling.timing.startTime, {
                      hideMinutes: true
                    }) 
                  }
                </span>
              </p>

              {
                this.props.data.bookings.isTakingOnsiteBookings ? (
                  this.props.data.bookings.tickets.length!==0 ? (
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9em', position: 'absolute', bottom: '1em' }}>
                      {
                        this.state.calculatedLowestPrices===0 ? 'Free' : 'From \u20B9 ' + this.state.calculatedLowestPrices
                      }
                    </p>
                  ) : (
                    <p style={{ margin: 0, fontSize: '0.75em', opacity: 0.75 }}><i>Bookings Starting Soon</i></p>
                  )
                ) : (
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9em', position: 'absolute', bottom: '1em' }}>
                    Registration
                  </p>
                )
              }
            </div>
          )
        }
      </RootContext.Consumer>
    )
  }
}

export function EventPlaceholder(props) {
    var eventCardStyle = 'event placeholder'

    if(props.size!==undefined)
      eventCardStyle += ' ' + this.props.size
      
    if(props.color!==undefined)
      eventCardStyle += ' ' + this.props.color

    return (
      <div className={eventCardStyle}>
        <div className="image-container">
          <Image src="/assets/clubgo.png"/>
        </div>

        <h3 className="event-title">Placeholder Event Title</h3>
        <h4 className="event-venue">Placeholder Venue</h4>

        <p className="desc">Placeholder</p>
      </div>
    )
}

export default Event
