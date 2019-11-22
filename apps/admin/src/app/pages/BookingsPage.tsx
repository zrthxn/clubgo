import React, { Component } from 'react'
import Select from 'react-select'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox, Grid, Button, Switch } from '@material-ui/core'
import './scss/Pages.scss'

import { DatabaseService } from '@clubgo/api'
import { exportAsCSV, compareDates } from '@clubgo/util'
import BookingDetails from '../components/Bookings/BookingDetails'
import { BookingListItem } from '../components/Bookings/BookingListItem'
import { IEventModel, ITicketModel, IBookingModel, IVenueModel } from '@clubgo/database'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

// tslint:disable-next-line: interface-over-type-literal
type URLParams = {
  eventId: string
}

export default class BookingsPage extends Component<RouteComponentProps<URLParams>> {
  state = {
    loading: true,
    selectedVenueId: undefined,
    selectedVenue: null,
    selectedEventId: undefined,
    selectedEvent: null,
    selectedBookings: [],
    filters: {
      from: null,
      to: null  
    },
    suggestions: {
      events: [],
      venues: []
    },
    listing: [],
    bookings: [],
    when: undefined
  }

  bookingService = new DatabaseService('/booking')

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')

  componentDidMount() {
    let { eventId } = this.props.match.params
    if(eventId) {
      this.setState({
        selectedEventId: eventId
      })

      this.fetchBookingsByEvent(eventId)

      this.fetchEventDetails(eventId)
    }
    else {
      this.bookingService.list().then(({ data })=>{
        this.setState({
          listing: data.results.reverse(), 
          bookings: data.results,
          loading: false
        })
      })
    }
  }

  fetchBookingsByEvent = (eventId) => {
    this.bookingService.searchBy({
      event: {
        eventId
      }
    }).then(({ data })=>{
      this.setState({
        listing: data.results.reverse(), 
        bookings: data.results,
        loading: false
      })
    })
  }

  fetchBookingsByVenue = (venueId) => {
    this.bookingService.searchBy({
      venue: {
        venueId
      }
    }).then(({ data })=>{
      this.setState({
        listing: data.results.reverse(), 
        bookings: data.results,
        loading: false
      })
    })
  }

  fetchEventDetails = (eventId) => {
    this.eventService.findById(eventId).then(({ data })=>{
      this.setState({
        selectedEvent: data.results
      })
    })
  }

  filterBookingsByDate = (from?:Date, to?:Date) => {
    let { bookings } = this.state
    bookings = this.state.listing
    if(from)
      bookings = bookings.filter((item:IBookingModel)=>{
        let bookingDate = new Date(item.createdOn)
        if(compareDates(bookingDate, from)===1)
          return true
        else 
          return false
      })

    if(to)
      bookings = bookings.filter((item:IBookingModel)=>{
        let bookingDate = new Date(item.createdOn)
        if(compareDates(to, bookingDate)===1)
          return true
        else 
          return false
      })

    this.setState({
      bookings
    })
  }

  filterBookingsByDay = (when: 'today' | 'yesterday' | 'previous') => {
    switch (when) {
      case 'today':
        this.filterBookingsByDate(new Date( Date.now() - (1 * 24 * 60 * 60 * 1000) ))
        break
      case 'yesterday':
        this.filterBookingsByDate(new Date( Date.now() - (2 * 24 * 60 * 60 * 1000) ))
        break
      case 'previous':
        this.filterBookingsByDate(undefined, new Date( Date.now() - (2 * 24 * 60 * 60 * 1000) ))
        break
    }
  }

  convertBookingToCSVEntry = () => {
    exportAsCSV(this.state.selectedBookings, 'export.csv')
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
      <div className="page">
        <article className="page-header">
          <h1 className="title">Bookings</h1>

          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Select
                inputId="searchEventName"
                placeholder="Search Bookings by Event"
                backspaceRemovesValue
                value={this.state.selectedEvent!==null ? {
                  label: this.state.selectedEvent.eventTitle,
                  value: this.state.selectedEvent
                } : null}
                options={this.state.suggestions.events}
                onInputChange={(value, { action }) => {
                  if(action==="input-change" && value.length >= 3) {
                    this.eventService.searchBy({
                      $text: {
                        $search: value
                      }
                    }).then((response)=>{
                      let apiResponse = response.data
                      if (apiResponse.results.length!==0) {
                        let { suggestions } = this.state
                        suggestions.events = apiResponse.results.map((item:IEventModel)=>({
                          label: item.eventTitle, value: item
                        }))
                        this.setState({
                          suggestions
                        })
                      }
                    }) 
                  }
                }}
                onChange={({ value })=>{
                  this.fetchBookingsByEvent(value._id)
                  this.setState({
                    selectedEventId: value._id,
                    selectedEvent: value,
                    loading: true
                  })
                }}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <Select
                inputId="searchVenueName"
                placeholder="Search Bookings by Venue"
                backspaceRemovesValue
                value={this.state.selectedVenue!==null ? {
                  label: this.state.selectedVenue.venueTitle,
                  value: this.state.selectedVenue
                } : null}
                options={this.state.suggestions.venues}
                onInputChange={(value, { action }) => {
                  if(action==="input-change" && value.length >= 3) {
                    this.venueService.searchBy({
                      $text: {
                        $search: value
                      }
                    }).then((response)=>{
                      let apiResponse = response.data
                      if (apiResponse.results.length!==0) {
                        let { suggestions } = this.state
                        suggestions.venues = apiResponse.results.map((item:IVenueModel)=>({
                          label: item.venueTitle, value: item
                        }))
                        this.setState({
                          suggestions
                        })
                      }
                    }) 
                  }
                }}
                onChange={({ value })=>{
                  this.fetchBookingsByVenue(value._id)
                  this.setState({
                    selectedVenueId: value._id,
                    selectedVenue: value,
                    loading: true
                  })
                }}
              />
            </Grid>

            <Grid item md={4} xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ margin: 'auto 0' }} variant="outlined" onClick={()=>{
                this.setState({
                  selectedEventId: undefined,
                  selectedEvent: null,
                  selectedVenueId: undefined,
                  selectedVenue: null,
                  selectedBookings: [],
                  listing: [], bookings: []
                })
              }}>
                Clear
              </Button>
            </Grid>

            {
              this.state.selectedEvent!==null ? (
                <Grid item md={8}>
                  <div>
                    <h3>Selected Event</h3><br/>

                    <h2>{ this.state.selectedEvent.eventTitle }</h2>
                    <h3>{ this.state.selectedEvent.venue.title }</h3>
                  </div>
                </Grid>
              ) : null
            }
          </Grid>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Checkbox color="primary" defaultChecked={false}
                onChange={({ target })=>{
                  let { selectedBookings, listing } = this.state
                  selectedBookings = []
                  if(target.checked)
                    for (const booking of listing)
                      selectedBookings.push(booking)
                  this.setState(()=>({
                    selectedBookings
                  }))
                }}
              />
              <label htmlFor="">Select All</label>

              <p style={{ display: 'inline', margin: '0 2em' }}>
                { this.state.selectedBookings.length } selected out of { this.state.bookings.length }
              </p>

              <Button variant="outlined" onClick={this.convertBookingToCSVEntry}>
                Export
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Select 
                    placeholder="When"
                    options={[ 'Today', 'Yesterday', 'Previous' ].map((item)=>({
                      label: item, value: item.toLowerCase()
                    }))}
                    onChange={({ value })=>{
                      this.filterBookingsByDay(value)
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <DatePicker
                    label="From"
                    maxDate={(new Date())}
                    value={this.state.filters.from}
                    onChange={(d)=>{
                      let { filters } = this.state
                      filters.from = new Date(d.toJSON())
                      this.setState({ filters })
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <DatePicker
                    label="To"
                    maxDate={(new Date())}
                    value={this.state.filters.to}
                    onChange={(d)=>{
                      let { filters } = this.state
                      filters.to = new Date(d.toJSON())
                      this.setState({ filters })
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Button variant="outlined" onClick={()=>{
                    this.filterBookingsByDate(this.state.filters.from, this.state.filters.to)
                  }}>
                    Filter
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <br/><br/>

          <div style={{ display: 'flex', flexDirection: 'row', margin: '0.5em 0 0.5em 2.5em' }}>
            <div className="booking-list-item">
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <b>BOOKED ON</b>
                </Grid>

                <Grid item xs={1}>
                  <b>REF</b>
                </Grid>

                <Grid item xs={2}>
                  <b>USER</b>
                </Grid>

                <Grid item xs={3}>
                  <b>EVENT</b>
                </Grid>

                <Grid item xs={2}>
                  <b>PEOPLE</b>
                </Grid>
              </Grid>
            </div>
          </div>

          {
            !this.state.loading ? (
              this.state.bookings.map((booking:IBookingModel, index)=>(
                <div style={{ display: 'flex', flexDirection: 'row', margin: '0.5em 0' }}>
                  <Checkbox color="primary" checked={this.state.selectedBookings.includes(booking)}
                    onChange={({ target })=>{
                      let { selectedBookings } = this.state
                      if(target.checked)
                        selectedBookings.push(booking)
                      else
                        selectedBookings = selectedBookings.filter((sel)=>( booking._id!==sel._id ))
                      this.setState(()=>({
                        selectedBookings
                      }))
                    }}
                  />

                  <BookingListItem data={booking} 
                    onDelete={(bookingId)=>{
                      let { listing } = this.state
                      listing = listing.filter((item:IBookingModel)=> item._id!==bookingId )
                      this.bookingService.delete(bookingId).then(()=>{
                        this.setState({
                          listing
                        })
                      })
                    }}
                  />
                </div>
              ))
            ) : (
              <div>
                <span className="spinner"/>
                <p>Loading</p>
              </div>
            )
          }
        </article>
      </div>
      </MuiPickersUtilsProvider>
    )
  }
}
