import React, { Component } from 'react'
import './Event.scss'

export class Event extends Component {
  render() {
    return (
      <div className="event">
        <img alt="Image"
          src="http://cgsquad.in/backend/images/event/1559398045.png"
        />

        <h3>Event Name</h3>
        <h4>Venue</h4>

        <p>Date | Time</p>
      </div>
    )
  }
}

export default Event
