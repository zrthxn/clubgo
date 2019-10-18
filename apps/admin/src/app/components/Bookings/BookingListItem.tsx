import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'
import '../scss/Bookings.scss'

interface BookingListItemProps {
  data: any, //IBookingModel
}

export class BookingListItem extends Component<BookingListItemProps> {
  render() {
    return (
      <div className="booking-list-item">
        <p>{ this.props.data.name }</p>
        <p>Email</p>
        <p>Phone</p>

        <p>Paid</p>
      </div>
    )
  }
}

export default BookingListItem