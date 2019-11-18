import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'
import '../scss/Bookings.scss'

import BookingDetails from './BookingDetails'
import { Grid } from '@material-ui/core'

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
        <Grid container spacing={1}>
          <Grid item xs={1}>
            { this.props.data.bookingReference }
          </Grid>

          <Grid item xs={2}>
            { (new Date(this.props.data.createdOn)).toDateString() }
          </Grid>

          <Grid item xs={2}>
            { this.props.data.name }
          </Grid>

          <Grid item xs={3}>
            <a href={`https://clubgo.in/event/${ this.props.data.event.eventId }`}>
              { this.props.data.event.eventTitle.substr(0, 24) }...
            </a>
          </Grid>

          <Grid item xs={2}>
            { this.props.data.event.startTime } to { this.props.data.event.endTime }
          </Grid>

          <Grid item xs={2}>
            { this.props.data.people.couple } C/ 
            { this.props.data.people.female } F/ 
            { this.props.data.people.male } M/ 
            { this.props.data.people.single } S
          </Grid>
        </Grid>

        <BookingDetails data={this.props.data} open={this.state.openDetailsModal}/>
      </div>
    )
  }
}

export default BookingListItem