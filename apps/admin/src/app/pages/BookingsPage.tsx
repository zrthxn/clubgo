import React, { Component } from 'react'
import Select from 'react-select'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox, Grid, Button, Switch } from '@material-ui/core'
import './scss/Pages.scss'

import { DatabaseService } from '@clubgo/api'
import { exportAsCSV } from '@clubgo/util'
import BookingDetails from '../components/Bookings/BookingDetails'
import { BookingListItem } from '../components/Bookings/BookingListItem'
import { IEventModel, ITicketModel, IBookingModel } from '@clubgo/database'

// tslint:disable-next-line: interface-over-type-literal
type URLParams = {
  eventId: string
}

export default class BookingsPage extends Component<RouteComponentProps<URLParams>> {
  state = {
    loading: true,
    selectedEventId: undefined,
    selectedEvent: null,
    selectedBookings: [],
    suggestions: {
      events: []
    },
    listing: [],
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

      this.fetchBookings(eventId)

      this.fetchEventDetails(eventId)
    }
    else {
      this.bookingService.list().then(({ data })=>{
        this.setState({
          listing: data.results.reverse(), loading: false
        })
      })
    }
  }

  fetchBookings = (eventId, when?) => {
    this.bookingService.searchBy({
      event: {
        eventId
      }
    }, {
      when
    }).then(({ data })=>{
      this.setState({
        listing: data.results.reverse(), loading: false
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

  convertBookingToCSVEntry = () => {
    exportAsCSV(this.state.selectedBookings, 'export.csv')
  }

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Bookings</h1>

          <Grid container spacing={3}>
            <Grid item md={4}>
              <Select
                inputId="searchEventName"
                placeholder="Search Event"
                backspaceRemovesValue
                value={this.state.selectedEvent!==null ? {
                  label: this.state.selectedEvent.eventTitle,
                  value: this.state.selectedEvent
                } : null}
                options={this.state.suggestions.events}
                onInputChange={(value, { action }) => {
                  if(action==="input-change") {
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
                  this.fetchBookings(value._id)
                  this.setState({
                    selectedEventId: value._id,
                    selectedEvent: value
                  })
                }}
              />
            </Grid>

            <Grid item md={4} style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ margin: 'auto 0' }} variant="outlined" onClick={()=>{
                this.setState({
                  loading: true,
                  selectedEventId: undefined,
                  selectedEvent: null,
                  selectedBookings: [],
                  suggestions: {
                    events: []
                  },
                  listing: []
                })
              }}>
                Clear
              </Button>

              <Button style={{ margin: 'auto 1em' }} variant="outlined" onClick={()=>{
                this.setState({
                  loading: true
                })
                this.fetchBookings(this.state.selectedEventId)
              }}>
                Reload
              </Button>
            </Grid>

            <Grid item md={4}></Grid>

            {
              this.state.selectedEvent!==null ? (
                <Grid item md={8}>
                  <div>
                    <h3>Selected Event</h3><br/>

                    <h2>{ this.state.selectedEvent.eventTitle }</h2>
                    <p>{ this.state.selectedEvent.venue.title }</p>
                  </div>
                </Grid>
              ) : null
            }
          </Grid>
        </article>

        <article className="page-content">
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
            { this.state.selectedBookings.length } selected out of { this.state.listing.length }
          </p>

          <label>Bookings Today</label>
          <Switch
            onChange={({ target })=>{
              let when
              if(target.checked)
                  when = 'today'
              this.fetchBookings(this.state.selectedEventId, when)
            }}
          />

          <Button variant="outlined" onClick={this.convertBookingToCSVEntry}>
            Export
          </Button>

          <br/><br/>

          {
            !this.state.loading ? (
              this.state.listing.map((booking:IBookingModel, index)=>(
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

                  <BookingListItem data={booking} />
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
    )
  }
}
