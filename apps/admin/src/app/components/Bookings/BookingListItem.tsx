import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'
import '../scss/Bookings.scss'

import BookingDetails from './BookingDetails'

interface BookingListItemProps {
  data: IBookingModel
}

export class BookingListItem extends Component<BookingListItemProps> {
  state = {
    openDetailsModal: false
  }

  render() {
    return (
      <div className="booking-list-item">
        <p>{ this.props.data.name }</p>
        <p>{ this.props.data.email }</p>
        <p>{ this.props.data.phone }</p>

        <p>Paid</p>

        <p>
          { (new Date(this.props.data.createdOn)).toDateString() }
        </p>

        <BookingDetails data={this.props.data} open={this.state.openDetailsModal}/>
      </div>
    )
  }
}

export default BookingListItem