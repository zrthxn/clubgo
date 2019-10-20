import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import '../Booking.scss'
import { Button, Textbox } from '@clubgo/website/components'
import { IEventModel, IVenueModel } from '@clubgo/database'
import { Add, Remove } from '@material-ui/icons'

interface TicketViewProps {
  event:IEventModel
  venue:IVenueModel
  onComplete: Function
}

export class TicketSelector extends Component<TicketViewProps> {
  state = {
    selectedDateIndex: 0,
    selectedTimeIndex: 0,
    people: {
      male: 0,
      female: 0,
      couple: 0,
      single: 0
    },
    appliedOffers: null,
    payment: {
      subtotal: 0,
      total: 0
    }
  }
  
  event:IEventModel

  venue:IVenueModel

  constructor(props) {
    super(props)
    this.event = this.props.event
    this.venue = this.props.venue
  }
  
  incrementPeople = (key) => {
    let { people, payment } = this.state
    this.setState(()=>{
      if(key==='single') 
        people[key]++
      else if(key==='female' && people.male!==0){
        people.couple++
        people.male--
        key = 'couple'
      }
      else if(key==='male' && people.female!==0){
        people.couple++
        people.female--
        key = 'couple'
      }
      else {
        if(people.male <= this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.malesPerCoupleRatio)
          people[key]++
      }

      payment = this.calculatePayment(people)
      return {
        people, payment
      }
    })
  }

  decrementPeople = (key) => {
    let { people, payment } = this.state
    this.setState(()=>{
      if(people[key] > 0)
        people[key]--
      
      payment = this.calculatePayment(people)
      return {
        people, payment
      }
    })
  }

  calculatePayment = (people) => {
    let subtotal = 0, total = 0
    subtotal += people.couple * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.admissionPrice
    subtotal += people.female * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.admissionPrice
    subtotal += people.male * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.admissionPrice
    subtotal += people.single * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.admissionPrice

    total = subtotal * (1 + (this.event.bookings.processingFeePercent/100))
    total = total * (1 + (this.event.bookings.taxPercent/100))     

    return { subtotal, total }
  }
  
  render() {
    return (
      <article>
        <section>
          <h1 className="center">Tickets</h1>

          <section className="booking">
            <Grid container>
              <Grid item md={2}/>
              <Grid item md={5} xs={12}>
                <section className="ticket">
                  <div className="event-details">
                    <h2 className="event-name">{ this.event.eventTitle }</h2>
                    <h3 className="venue-name">{ this.event.venue.title }</h3>
                  </div>

                  <h3 className="bold">Dates</h3>
                  <h4 style={{ color: '#000', fontSize: '0.85em' }}>Select a date you want to attend</h4>
                  <div className="dates">
                    {
                      this.event.scheduling.customDates.map((date, index)=>(
                        <div className={this.state.selectedDateIndex===index ? 'select-pill selected' : 'select-pill'}
                          onClick={()=>{
                            this.setState({
                              selectedDateIndex: index
                            })
                          }}
                        >
                          { (new Date(date)).toDateString() }
                        </div>
                      ))
                    }
                  </div>
                  <br/>

                  <h3 className="bold">Timings</h3>
                  <h4 style={{ color: '#000', fontSize: '0.85em' }}>Select your entry time</h4>
                  {/* <p style={{ margin: 0, opacity: 0.75 }}>Last entry time is <b>1:00 AM</b></p> */}
                  <div className="timings">
                    {
                      this.event.bookings.tickets.map((item, index)=>(
                        <div className={this.state.selectedTimeIndex===index ? 'select-pill selected' : 'select-pill'}
                          onClick={()=>{
                            this.setState({
                              selectedTimeIndex: index,
                              people: {
                                male: 0,
                                female: 0,
                                couple: 0,
                                single: 0
                              },
                              appliedOffers: null,
                              payment: {
                                subtotal: 0,
                                total: 0
                              }
                            })
                          }}
                        >
                          {
                            ((item.activate - (item.activate % 60)) / 60) > 12 ? (
                              (
                                (((item.activate - (item.activate % 60)) / 60) - 12).toString()==='0' ? '12' : (
                                  (((item.activate - (item.activate % 60)) / 60) - 12).toString()
                                )
                              ) + ':' + (
                                (item.activate % 60).toString().length < 2 ? (
                                  '0' + (item.activate % 60).toString()
                                ) : (
                                  (item.activate % 60).toString()
                                ) 
                              ) + 'PM'
                            ) : (
                              (
                                (((item.activate - (item.activate % 60)) / 60)).toString()==='0' ? '12' : (
                                  (((item.activate - (item.activate % 60)) / 60)).toString()
                                )
                              ) + ':' + (
                                (item.activate % 60).toString().length < 2 ? (
                                  '0' + (item.activate % 60).toString()
                                ) : (
                                  (item.activate % 60).toString()
                                ) 
                              ) + 'AM'
                            )
                          }
                        </div>
                      ))
                    }
                  </div>
                  <br/>

                  <h3 className="bold">People</h3>
                  <h4 style={{ color: '#000', fontSize: '0.85em' }}>Select the number of guests</h4>
                  {
                    this.event.bookings.tickets[this.state.selectedTimeIndex].entry.entryType==='couple' ? (
                      <div className="people">
                        <div className="people-block">
                          <div className="people-label">
                            Couple
                            <p className="price">
                              { 
                                '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.admissionPrice 
                              }
                            </p>
                          </div>
                          <span className="people-add" onClick={()=>{
                            this.incrementPeople('couple')
                          }}>
                            <Add/>
                          </span>
                          <span className="people-count">{ this.state.people.couple }</span>
                          <span className="people-remove" onClick={()=>{
                            this.decrementPeople('couple')
                          }}>
                            <Remove/>
                          </span>
                        </div>

                        <div className="people-block">
                          <div className="people-label">
                            Female
                            <p className="price">
                              { 
                                '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.admissionPrice
                              }
                            </p>
                          </div>
                          <span className="people-add" onClick={()=>{
                            this.incrementPeople('female')
                          }}>
                            <Add/>
                          </span>
                          <span className="people-count">{ this.state.people.female }</span>
                          <span className="people-remove" onClick={()=>{
                            this.decrementPeople('female')
                          }}>
                            <Remove/>
                          </span>
                        </div>

                        <div className="people-block">
                          <div className="people-label">
                            Male
                            <p className="price">
                              { 
                                '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.admissionPrice 
                              }
                            </p>
                          </div>
                          <span className="people-add" onClick={()=>{
                            this.incrementPeople('male')
                          }}>
                            <Add/>
                          </span>
                          <span className="people-count">{ this.state.people.male }</span>
                          <span className="people-remove" onClick={()=>{
                            this.decrementPeople('male')
                          }}>
                            <Remove/>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="people">
                        <div className="people-block">
                          <div className="people-label">
                            Single
                            <p className="price">
                              { 
                                '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.admissionPrice
                              }
                            </p>
                          </div>
                          <span className="people-add" onClick={()=>{
                            this.incrementPeople('single')
                          }}>
                            <Add/>
                          </span>
                          <span className="people-count">{ this.state.people.single }</span>
                          <span className="people-remove" onClick={()=>{
                            this.decrementPeople('single')
                          }}>
                            <Remove/>
                          </span>
                        </div>
                      </div>
                    )
                  }
                </section>
              </Grid>

              <Grid item md={4} xs={12}>
                <section className="payment">
                  <div className="offers">
                    <h3 className="bold">Offers</h3>

                    <div>
                      {
                        this.event.offers.availableOffers.map((offer, index)=>(
                          <div className="offer-item" key={`available-offer-${index}`}>
                            <span style={{ padding: '0 0.5em', fontWeight: 900, color: '#1c1c1c80' }}>#</span>
                            { offer.offerTitle }
                          </div>
                        ))
                      }
                    </div>

                    <div>
                      <Textbox spellCheck={false} variant="solid" placeholder="Coupon Code"
                        onChange={({ target })=>{
                          target.value = target.value.toUpperCase()
                        }}
                        InputAdornments={[
                          {
                            position: 'start',
                            element: (
                              <div
                                style={{
                                  color: '#1c1c1c80',
                                  padding: '0.5em 0.75em',
                                  borderRadius: '0.5em',
                                  fontWeight: 900,
                                }}
                              >
                                %
                              </div>
                            )
                          },
                          {
                            position: 'end',
                            element: (
                              <Button size="small" variant="text" onClick={()=>{
                                console.log()
                              }}>
                                Apply
                              </Button>
                            )
                          }
                        ]}
                      />
                    </div>
                  </div>
                  
                  <h3 className="bold">Payment</h3>

                  <div className="price">
                    <div className="right">
                      <h3>Sub-Total</h3>
                      <p>Processing Fee</p>
                      <p>GST</p>
                      <h3 className="bold">To Pay</h3>
                    </div>
                    <div className="left">
                      <h3>{ '\u20B9' + this.state.payment.subtotal.toFixed(0) }</h3>
                      <p>{ this.event.bookings.processingFeePercent } %</p>
                      <p>{ this.event.bookings.taxPercent } %</p>
                      <h3 className="bold">{ '\u20B9' + this.state.payment.total.toFixed(2) }</h3>
                    </div>
                  </div>
                  
                  <p style={{ margin: 0 }}>All charges payable at venue</p>

                  <div style={{ margin: '2em auto', width: '100%' }}>
                    <Button color="primary" variant="unconstrained" 
                      onClick={(event)=>{
                        this.props.onComplete({
                          date: {},
                          people: this.state.people,
                          payment: this.state.payment,
                          appliedOffers: {}
                        })
                      }}
                    >
                      Book Now
                    </Button>
                  </div>

                  <p className="center" style={{ opacity: 0.75, fontSize: '0.75em' }}>
                    By making this booking you <br/>
                    agree to our <Link to="/tnc">terms and conditions.</Link>
                  </p>
                </section>
              </Grid>
              <Grid item md={1}/>

              <Grid item md={1}/>
              <Grid item xs={8}>
                {/* <h2>Terms</h2>

                <p>
                  {
                    
                  }
                </p> */}
              </Grid>
              <Grid item md={1}/>
            </Grid>
          </section>
        </section>
      </article>
    )
  }
}

export default TicketSelector
