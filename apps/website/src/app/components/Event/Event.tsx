import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Event.scss'

import RootContext from '../../RootContext'
import { Image } from '@clubgo/website/components'
import { IEventModel } from '@clubgo/database'

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

  detailsPageURL = `/event/${this.props.data._id}`

  componentDidMount() {
    this.calculatePrice()
  }

  calculatePrice = () => {
    let lowest = 999999999
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

  formatTime = (time) => {
    return ((time - (time % 60)) / 60) > 12 ? (
      (
        (((time - (time % 60)) / 60) - 12).toString()==='0' ? '12' : (
          (((time - (time % 60)) / 60) - 12).toString()
        )
      ) + ':' + (
        (time % 60).toString().length < 2 ? (
          '0' + (time % 60).toString()
        ) : (
          (time % 60).toString()
        ) 
      ) + 'PM'
    ) : (
      (
        (((time - (time % 60)) / 60)).toString()==='0' ? '12' : (
          (((time - (time % 60)) / 60)).toString()
        )
      ) + ':' + (
        (time % 60).toString().length < 2 ? (
          '0' + (time % 60).toString()
        ) : (
          (time % 60).toString()
        ) 
      ) + 'AM'
    )
  }

  openEventDetails = () => {
    window.scrollTo(0, 0)
    this.context.router(this.detailsPageURL)
  }

  render() {
    var eventCardStyle = 'event'

    if(this.props.size!==undefined)
      eventCardStyle += ' ' + this.props.size
      
    if(this.props.color!==undefined)
      eventCardStyle += ' ' + this.props.color

    return (
      <div className={eventCardStyle} onClick={this.openEventDetails}>
        <div className="image-container">
          {
            this.props.data.media.images.length!==0 ? (
              <img alt="Image" src={ this.props.data.media.images[0].url }/>
            ) : (
              <img alt="Image" src="/assets/clubgo.png"/>
            )
          }
        </div>
        
        <Link to={this.detailsPageURL}>
          <h3 className="event-title">{ this.props.data.eventTitle }</h3>
        </Link>

        <h4 className="event-venue">{ this.props.data.venue.title }</h4>

        <p style={{ margin: '0.75em 0 0.5em 0', fontSize: '0.75em', opacity: 0.75 }}>
          <span>{ (new Date(this.props.data.scheduling.customDates[0])).toDateString() }</span>
          <span style={{ marginLeft: '0.5em' }}>{ this.formatTime(this.props.data.scheduling.timing.startTime) }</span>
        </p>

        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9em' }}>
          Starting from { '\u20B9 ' + this.state.calculatedLowestPrices }
        </p>
      </div>
    )
  }
}

export default Event
