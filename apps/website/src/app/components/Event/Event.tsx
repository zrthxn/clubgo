import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Event.scss'

import Context from '../../ContextProvider'
import { IEventModel } from '@clubgo/database'

interface EventComponentProps {
  data: IEventModel
  image?: string
}

export class Event extends Component<EventComponentProps> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  openEventDetails = () => {
    // this.context.router(`/events/detail/${this.props.data._id}`)
  }

  render() {
    return (
      <div className="event" onClick={this.openEventDetails}>
        <img alt="Image" src="http://cgsquad.in/backend/images/event/1559398045.png"/>
        
        <Link to={`/events/detail/${this.props.data._id}`}>
          <h3>{ this.props.data.eventTitle }</h3>
        </Link>

        <h4>{ this.props.data.venue.title }</h4>

        <p>Date | Time</p>
      </div>
    )
  }
}

export default Event
