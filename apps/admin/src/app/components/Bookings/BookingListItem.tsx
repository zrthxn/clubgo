import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'
import '../scss/Bookings.scss'

import BookingDetails from './BookingDetails'
import { Grid, IconButton } from '@material-ui/core'
import { formatTime, getTime } from '@clubgo/util'
import { Delete } from '@material-ui/icons'
import ConfirmDelete from '../Modals/ConfirmDelete'

interface BookingListItemProps {
  data: IBookingModel
  onDelete: Function
}

export class BookingListItem extends Component<BookingListItemProps> {
  state = {
    openDetailsModal: false,
    openDeleteModal: false
  }

  render() {
    return (
      <div className="booking-list-item">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <p style={{ margin: 0 }}>
              { (new Date(this.props.data.createdOn)).toDateString() }
            </p>
            <p style={{ margin: 0 }}>
              { formatTime( getTime((new Date(this.props.data.createdOn))) ) }
            </p>
          </Grid>

          <Grid item xs={1}>
            { this.props.data.bookingReference }
          </Grid>

          <Grid item xs={2}>
            <b>{ this.props.data.name }</b>
            <p style={{ margin: 0, opacity: 0.75, fontSize: '0.9em' }}>
              Last Entry { this.props.data.schedule.time }
            </p>
          </Grid>

          <Grid item xs={3}>
            <a href={`https://clubgo.in/event/${ this.props.data.event.eventId }`}>
              { this.props.data.event.eventTitle.substr(0, 24) }...
            </a>
            <p style={{ margin: 0 }}>
              { this.props.data.event.startTime } to { this.props.data.event.endTime }
            </p>
          </Grid>

          <Grid item xs={2}>
            { this.props.data.people.couple } C/ 
            { this.props.data.people.female } F/ 
            { this.props.data.people.male } M/ 
            { this.props.data.people.single } S
          </Grid>

          <Grid item xs={2} className="container">
            <IconButton className="float-right" onClick={()=>{
              this.setState({
                openDeleteModal: true
              })
            }}>
              <Delete/>
            </IconButton>
          </Grid>
        </Grid>

        <BookingDetails data={this.props.data} open={this.state.openDetailsModal}/>

        <ConfirmDelete isOpen={this.state.openDeleteModal} 
          confirm={()=>{
            this.props.onDelete(this.props.data._id)
            this.setState({
              openDeleteModal: true
            })
          }}
          close={()=>{
            this.setState({
              openDeleteModal: true
            })
          }}
        >
          <h2>Delete Booking</h2>
          <p>Are you sure you want to delete this booking?</p>
        </ConfirmDelete>
      </div>
    )
  }
}

export default BookingListItem