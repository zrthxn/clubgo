import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'

import '../Confirmation.scss'

interface ConfirmationProps {
  booking: IBookingModel
}

export default class Confirmation extends Component<ConfirmationProps> {
  formatTime = (time, options?) => {
    if(options) {
      if(options.hideMinutes)
        return ((time - (time % 60)) / 60) > 12 ? (
          (
            (((time - (time % 60)) / 60) - 12).toString()==='0' ? '12' : (
              (((time - (time % 60)) / 60) - 12).toString()
            )
          ) + 'PM'
        ) : (
          (
            (((time - (time % 60)) / 60)).toString()==='0' ? '12' : (
              (((time - (time % 60)) / 60)).toString()
            )
          ) + 'AM'
        )
    }
    else
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
              <h2>{ this.props.booking.event.eventTitle }</h2>
              <h3>{ this.props.booking.venue.venueTitle }</h3>

              <h4>
                { 
                  (new Date(this.props.booking.schedule.date)).toDateString() 
                }, {
                  this.formatTime(this.props.booking.event.startTime, { hideMinutes: true })
                } - {
                  this.formatTime(this.props.booking.event.endTime, { hideMinutes: true })
                }
              </h4>
            </div>

            <img src={
              `https://barcode.tec-it.com/barcode.ashx?data=${this.props.booking.bookingReference}&`+
              `code=QRCode&unit=Fit&dpi=96&imagetype=png&rotation=0&color=%23000000&bgcolor=%23ffffff&qunit=Mm&quiet=1`
            } alt=""/>
          </div>

          <div className="booking-details">
            <p style={{ margin: 0 }}>
              <b>Dear { this.props.booking.name }</b>, <br/>
              Your booking was confirmed
            </p>
            
            <p style={{ margin: '0.5em 0' }}>
              <b>Your booking reference is { this.props.booking.bookingReference }</b><br/>
              Please show this ticket at the venue to get entry and avail offers.  
            </p>

            <p style={{ margin: 0, opacity: 0.75 }}>
              <b>Your last entry time is { this.formatTime(this.props.booking.schedule.time) }</b><br/>
              Please note, the guest list will be closed sharp at the last entry time. After this, entry will 
              be chargeable.
            </p>

            <div className="people">
              {
                this.props.booking.people.couple!==0 ? (
                  <div className="people-block">
                    <div className="left">Couple</div>
                    <div className="right">{ this.props.booking.people.couple }</div>
                  </div>
                ) : null
              }

              {
                this.props.booking.people.female!==0 ? (
                  <div className="people-block">
                    <div className="left">Female</div>
                    <div className="right">{ this.props.booking.people.female }</div>
                  </div>
                ) : null
              }

              {
                this.props.booking.people.male!==0 ? (
                  <div className="people-block">
                    <div className="left">Male</div>
                    <div className="right">{ this.props.booking.people.male }</div>
                  </div>
                ) : null
              }

              {
                this.props.booking.people.single!==0 ? (
                  <div className="people-block">
                    <div className="left">Single</div>
                    <div className="right">{ this.props.booking.people.single }</div>
                  </div>
                ) : null
              }
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

            <div className="tnc">
              <span>Terms and Conditions</span>
            </div>
          </div>
        </section>
      </article>
    )
  }
}
