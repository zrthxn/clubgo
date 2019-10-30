import React, { Component } from 'react'
import '../Confirmation.scss'

import { IBookingModel } from '@clubgo/database'
import { formatTime } from '@clubgo/util'

interface ConfirmationProps {
  booking: IBookingModel
}

export default class Confirmation extends Component<ConfirmationProps> {
  render() {
    return (
      <article>
        <section className="center">
          <h2>Confirmation</h2>
        </section>

        <section className="booked-ticket">
          <div className="message">
            <p>
              <b>Dear { this.props.booking.name }</b>, <br/>
              Thank you for booking your tickets on ClubGo<sup>TM</sup>. Your booking was confirmed. <br/>
              Please show this ticket at the venue to get entry and avail offers.  
            </p>
          </div>

          <div className="ticket">
            <div className="event-details">
              <h2>{ this.props.booking.event.eventTitle }</h2>
              <h3>{ this.props.booking.venue.venueTitle }</h3>

              <h4>
                { 
                  (new Date(this.props.booking.schedule.date)).toDateString() 
                }, {
                  formatTime(this.props.booking.event.startTime, { hideMinutes: true })
                } - {
                  formatTime(this.props.booking.event.endTime, { hideMinutes: true })
                }
              </h4>
            </div>

            <div className="booking-details">
              <div className="booking-details-items">
                <p style={{ margin: '0.5em 0', fontSize: '1.25em', textAlign: 'center' }}>
                  Booking Reference <b>{ this.props.booking.bookingReference }</b><br/>
                </p>

                <div className="people">
                  {
                    this.props.booking.people.couple!==0 ? (
                      <div className="people-block">
                        { this.props.booking.people.couple } x Couple Entry
                      </div>
                    ) : null
                  }

                  {
                    this.props.booking.people.female!==0 ? (
                      <div className="people-block">
                        { this.props.booking.people.female } x Female Entry
                      </div>
                    ) : null
                  }

                  {
                    this.props.booking.people.male!==0 ? (
                      <div className="people-block">
                        { this.props.booking.people.male } x Male Entry
                      </div>
                    ) : null
                  }

                  {
                    this.props.booking.people.single!==0 ? (
                      <div className="people-block">
                        { this.props.booking.people.single } x Single Entry
                      </div>
                    ) : null
                  }
                </div>
              </div>

              <img className="barcode"
                src={
                  `https://barcode.tec-it.com/barcode.ashx?data=${this.props.booking.bookingReference}&`+
                  `code=QRCode&unit=Fit&dpi=96&imagetype=png&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=1`
                }
              />
            </div>
            
            <div className="pricing">
              <div className="left">
                <p><b>Subtotal</b></p>
                <p>Convinience Fee</p>
                <p>GST</p>

                <h3>Amount</h3>
              </div>

              <div className="right">
                <p><b>{ this.props.booking.payment.amount }</b></p>
                <p>{ this.props.booking.payment.processingFee }</p>
                <p>{ this.props.booking.payment.tax }</p>

                <h3>{ this.props.booking.payment.total }</h3>
              </div>
            </div>
          </div>
        
          <div className="tnc">
            <span>Terms and Conditions</span>
            <p>
              {
                this.props.booking.termsAndConditions
              }
            </p>
          </div>
        </section>
      </article>
    )
  }
}
