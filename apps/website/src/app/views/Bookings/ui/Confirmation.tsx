import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'

interface ConfirmationProps {
  booking: IBookingModel
}

export default class Confirmation extends Component<ConfirmationProps> {
  render() {
    return (
      <article>
        <section className="center">
          <h1>Confirmation</h1>
          <h2>Thank You</h2>

          <section>
            <p>
              Your booking was successsful. Your booking reference number is given below.
            </p>

            {/* <img src={`${this.props.booking.bookingReference}`} alt=""/> */}
            <h3>{ this.props.booking.bookingReference }</h3>
          </section>
        </section>
      </article>
    )
  }
}
