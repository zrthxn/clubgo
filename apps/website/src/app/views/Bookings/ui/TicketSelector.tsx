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
    appliedOffers: [ ],
    payment: {
      subtotal: 0,
      total: 0,
      processingFee: 0,
      tax: 0,
    }
  }
  
  event:IEventModel

  venue:IVenueModel

  constructor(props) {
    super(props)
    this.event = this.props.event
    this.venue = this.props.venue
  }

  formatTime = (time) => {
    if(time>=1440) time -= 1440
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
        if(people.male <= (people.couple * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.malesPerCoupleRatio))
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
    
    if(this.event.bookings.tickets[this.state.selectedTimeIndex].entry.entryType==='couple') {
      subtotal += people.couple * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.admissionPrice
      subtotal += people.female * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.admissionPrice
      subtotal += people.male * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.admissionPrice
    }
    else if(this.event.bookings.tickets[this.state.selectedTimeIndex].entry.entryType==='single')
      subtotal += people.single * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.admissionPrice

    let processingFee = subtotal * (this.event.bookings.processingFeePercent/100)
    let tax = processingFee * (this.event.bookings.taxPercent/100)

    total = subtotal + processingFee + tax

    return { subtotal, total, processingFee, tax }
  }

  onFinalize = () => {
    this.props.onComplete({
      date: this.event.scheduling.customDates[this.state.selectedDateIndex],
      time: this.event.bookings.tickets[this.state.selectedTimeIndex].activate,
      people: this.state.people,
      appliedOffers: this.state.appliedOffers,
      payment: this.state.payment,
    })
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
                    <h2 className="event-name"><b>{ this.event.eventTitle }</b></h2>
                    <h3 className="venue-name"><b>{ this.event.venue.title }</b></h3>
                  </div>

                  <h3 className="bold" style={{ flexGrow: 1 }}>Dates</h3>
                  <div className="dates">
                    {
                      this.event.scheduling.customDates.slice(0, 2).map((date, index)=>(
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

                  <h3 className="bold" style={{ flexGrow: 1 }}>Timings</h3>
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
                              appliedOffers: [ ],
                              payment: {
                                subtotal: 0,
                                total: 0
                              }
                            })
                          }}
                        >
                          {
                            this.formatTime(item.activate)
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
                            
                          <div className="people-controls">
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
                          
                          <div className="people-controls">
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
                          
                          <div className="people-controls">
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
                          
                          <div className="people-controls">
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
                      <h3 className="bold">Sub-Total</h3>
                      <p style={{ opacity: 0.5 }}>Processing Fee</p>
                      <p style={{ opacity: 0.5 }}>GST</p>
                      <h3 className="bold">To Pay</h3>
                    </div>
                    <div className="left">
                      <h3>{ '\u20B9' + this.state.payment.subtotal.toFixed(0) }</h3>
                      <p style={{ opacity: 0.5 }}>{ this.event.bookings.processingFeePercent } %</p>
                      <p style={{ opacity: 0.5 }}>{ this.event.bookings.taxPercent } %</p>
                      <h3 className="bold">{ '\u20B9' + this.state.payment.total.toFixed(2) }</h3>
                    </div>
                  </div>
                  
                  <p style={{ margin: 0 }}>All charges payable at venue</p>

                  <div style={{ margin: '2em auto', width: '100%' }}>
                    <Button color="primary" variant="unconstrained" 
                      onClick={(event)=>{
                        this.onFinalize()
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
