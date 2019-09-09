import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type URLParams = {
  eventRef: string
}

export default class Booking extends Component<RouteComponentProps<URLParams>> {
  render() {
    return (
      <article>
        <section className="container">
          <h1>Start Bookings</h1>

          <section>
            <p>
              { this.props.match.params.eventRef }
            </p>
          </section>
        </section>
      </article>
    )
  }
}
