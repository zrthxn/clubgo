import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Event.scss'

import Context from '../../ContextProvider'
import { IEventModel } from '@clubgo/database'

interface EventComponentProps {
  data: IEventModel
  size?: 'small' | 'large'
  image?: string
}

export class Event extends Component<EventComponentProps> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  detailsPageURL = `/events/detail/${this.props.data._id}`

  openEventDetails = () => {
    window.scrollTo(0, 0)
    this.context.router(this.detailsPageURL)
  }

  render() {
    return (
      <div className={ this.props.size==='large' ? 'event large' : 'event' } onClick={this.openEventDetails}>
        <img alt="Image" src="http://cgsquad.in/backend/images/event/1559398045.png"/>
        
        <Link to={this.detailsPageURL}>
          <h3 className="event-title">{ this.props.data.eventTitle }</h3>
        </Link>

        <h4 className="event-venue">{ this.props.data.venue.title }</h4>

        <p>Date | Time</p>
      </div>
    )
  }
}

export default Event
