import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'

import '../Confirmation.scss'

interface ConfirmationProps {
  booking: any, //IBookingModel
}

export default class Confirmation extends Component<ConfirmationProps> {
  render() {
    return (
      <article>
        <section className="center">
          <h1>Confirmation</h1>
          <h2>Thank You</h2>
        </section>

        <section className="booked-ticket">
          <div className="event-details">
            <div className="deets">
              <h2>Event Name</h2>
              <h3>Event Venue</h3>

              <h4>
                { (new Date(this.props.booking.schedule.date)).toDateString() }
              </h4>
            </div>

            <img src={
              `https://barcode.tec-it.com/barcode.ashx?data=${this.props.booking.bookingReference}&`+
              `code=QRCode&unit=Fit&dpi=96&imagetype=png&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=1`
            } alt=""/>
          </div>

          <div className="booking-details">
            <p style={{ margin: 0 }}>
              <b>Dear Ajit</b>, <br/>
              Your booking was confirmed
            </p>
            
            <p style={{ margin: '0.5em 0' }}>
              <b>Your booking reference is { this.props.booking.bookingReference }</b><br/>
              Please show this ticket at the venue to get entry and avail offers.  
            </p>

            <p style={{ margin: 0, opacity: 0.75 }}>
              <b>Your last entry time is { this.props.booking.schedule.time }</b><br/>
              Please note, the guest list will be closed sharp at TIME. After this, entry will 
              be chargeable.
            </p>

            <div className="people">
              <div className="people-block">
                <div className="left">Couple</div>
                <div className="right">3</div>
              </div>

              <div className="people-block">
                <div className="left">Female</div>
                <div className="right">3</div>
              </div>

              <div className="people-block">
                <div className="left">Male</div>
                <div className="right">3</div>
              </div>
            </div>

            <div className="pricing">
              <div className="left">
                <p><b>Subtotal</b></p>
                <p>Convinience Fee</p>
                <p>GST</p>

                <h3>Amount Paid</h3>
              </div>

              <div className="right">
                <p><b>500</b></p>
                <p>0</p>
                <p>0</p>

                <h3>500</h3>
              </div>
            </div>

            <div className="tnc">
              <span>Terms and Conditions</span>
            </div>
          </div>
        </section>
      </article>
    )
  }
}
