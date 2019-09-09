import React, { Component } from 'react'
import './Event.scss'

import Context from '../../ContextProvider'

interface EventComponentProps {
  image?: string
}

export class Event extends Component<EventComponentProps> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  openEventDetails = () => {
    this.context.router('/event/details/k05ignyt')
  }

  render() {
    return (
      <div className="event" onClick={this.openEventDetails}>
        <img alt="Image" src="http://cgsquad.in/backend/images/event/1559398045.png"/>

        <h3>Event Name</h3>
        <h4>Venue</h4>

        <p>Date | Time</p>
      </div>
    )
  }
}

export default Event
