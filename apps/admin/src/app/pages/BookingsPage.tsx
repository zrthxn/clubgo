import React, { Component } from 'react'
import Select from 'react-select'
import { RouteComponentProps } from 'react-router-dom'
import { Checkbox, Grid, Button } from '@material-ui/core'
import './scss/Pages.scss'

import { DatabaseService } from '@clubgo/api'
import BookingDetails from '../components/Bookings/BookingDetails'
import { BookingListItem } from '../components/Bookings/BookingListItem'
import { IEventModel } from '@clubgo/database'

// tslint:disable-next-line: interface-over-type-literal
type URLParams = {
  eventId: string
}

export default class BookingsPage extends Component<RouteComponentProps<URLParams>> {
  state = {
    loading: false, //true,
    selectedEventId: 2, //undefined,
    selectedEvent: null,
    selectedBookings: [

    ],

    suggestions: {
      events: []
    },

    listing: [
      1,2,3,4
    ]
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
  }

  fetchBookings = (eventId) => {
    this.bookingService.searchBy({
      event: {
        eventId
      }
    }).then(({ data })=>{
      this.setState({
        listing: data.results,
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

                        // -------------------
                        this.bookingService.create({
                          createdOn: (new Date()).toJSON(),
                          bookingReference: 'FGYHHY67UHGFR56YGVBHUIJ',
                          name: 'Alisamar Husain',
                          email: 'zrthxn@gmail.com',
                          phone: '+91 9971521167',
                          event: {
                            eventTitle: suggestions.events[0].value.eventTitle,
                            eventId: suggestions.events[0].value._id
                          },
                          venue: {
                            venueTitle: suggestions.events[0].value.venue.title,
                            city: suggestions.events[0].value.venue.city,
                            locality: suggestions.events[0].value.venue.locality,
                            venueId: suggestions.events[0].value.venue.venueId
                          },
                          schedule: {
                            date: (new Date()).toJSON(),
                            time: 500
                          },
                          appliedOffers: [],
                          payments: {
                            transactionId: '987UYFGIUY8UOHVGTI7UGHVKBJLH',
                            bookingAmountPaid: false,
                            amount: 100,
                            processingFee: 50,
                            tax: 10,
                            totalBookingAmount: 168
                          }
                        })
                        // -------------------
                  
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

            <Grid item md={2} style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ margin: 'auto 0' }} variant="outlined" onClick={()=>{
                this.setState({
                  loading: false, //true,
                  selectedEventId: 2, //undefined,
                  selectedEvent: null,
                  selectedBookings: [

                  ],

                  suggestions: {
                    events: []
                  },

                  listing: [
                    1,2,3,4
                  ]
                })
              }}>
                Clear
              </Button>
            </Grid>
            
            <Grid item md={6}></Grid>

            {
              this.state.selectedEvent!==null ? (
                <Grid item md={8}>
                  <div>
                    <h3>Selected Event</h3>

                    <h2>{ this.state.selectedEvent.eventTitle }</h2>
                    <p>{ this.state.selectedEvent.venue.title }</p>
                  </div>
                </Grid>
              ) : null
            }
          </Grid>
        </article>

        {
          this.state.selectedEventId!==undefined ? (
            <article className="page-content">
              {
                !this.state.loading ? (
                  this.state.listing.map((booking, index)=>(
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '0.5em 0' }}>
                      <Checkbox color="primary" onChange={()=>{

                      }}/>

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
          ) : (
            <article className="page-content">
              <section>
                <p>Please select an Event</p>  
              </section>  
            </article>
          )
        }
      </div>
    )
  }
}
