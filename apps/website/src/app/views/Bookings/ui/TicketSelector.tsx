import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import '../Booking.scss'
import { Button, Textbox } from '@clubgo/website/components'
import { IEventModel, IVenueModel } from '@clubgo/database'
import { Add, Remove } from '@material-ui/icons'
import { getFormattedDate, formatTime } from '@clubgo/util'

interface TicketViewProps {
  event:IEventModel
  venue:IVenueModel
  onComplete: Function
}

export class TicketSelector extends Component<TicketViewProps> {
  state = {
    selectedDateIndex: 0,
    selectedTimeIndex: 0,
    ticketId: null,
    people: {
      male: 0,
      female: 0,
      couple: 0,
      single: 0
    },
    appliedOffers: [ ],
    payment: 0
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
      else if(key==='female' && people.male!==0) {
        people.couple++
        people.male--
        key = 'couple'
      }
      else if(key==='male') {
        if(people.male < (people.couple * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.malesPerCoupleRatio)) {
          if(people.female!==0) {
            people.couple++
            people.female--
            key = 'couple'
          }
          else
            people.male++
        }
      }
      else {
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
    let subtotal = 0
    
    if(this.event.bookings.tickets[this.state.selectedTimeIndex].entry.entryType==='couple') {
      subtotal += people.couple * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.admissionPrice
      subtotal += people.female * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.admissionPrice
      subtotal += people.male * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.admissionPrice
    }
    else if(this.event.bookings.tickets[this.state.selectedTimeIndex].entry.entryType==='single')
      subtotal += people.single * this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.admissionPrice

    return subtotal
  }

  onFinalize = () => {
    this.props.onComplete({
      ticketId: this.state.ticketId,
      date: this.event.scheduling.customDates[this.state.selectedDateIndex],
      time: this.event.bookings.tickets[this.state.selectedTimeIndex].deactivate,
      people: this.state.people,
      appliedOffers: this.state.appliedOffers,
      payment: this.state.payment,
    })
  }
  
  render() {
    return (
      <article>
        <section>
          <section className="book-event-details">
            <h2 className="event-name"><b>{ this.event.eventTitle }</b></h2>
            <h3 className="venue-name"><b>{ this.event.venue.title }</b></h3>
          </section>

          <section className="booking">
            <section className="ticket">
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
                      { 
                        getFormattedDate((new Date(date))).dayOfTheWeek 
                      }, { 
                        getFormattedDate((new Date(date))).date 
                      } { 
                        getFormattedDate((new Date(date))).month 
                      }
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
                          ticketId: item.entry._id,
                          people: {
                            male: 0,
                            female: 0,
                            couple: 0,
                            single: 0
                          },
                          appliedOffers: [ ],
                          payment: 0
                        })
                      }}
                    >
                      { item.entry.ticketTitle }
                    </div>
                  ))
                }
              </div>
              <p style={{ margin: 0 }}>
                From { 
                  formatTime(this.event.bookings.tickets[this.state.selectedTimeIndex].activate) 
                } to {
                  formatTime(this.event.bookings.tickets[this.state.selectedTimeIndex].deactivate) 
                }
              </p>
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
                            this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.admissionPrice===0 ? (
                              'Free'
                            ) : (
                              '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.admissionPrice
                            )
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
                    <p style={{ margin: 0, fontSize: '0.75em' }}>
                      { this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.bookingDescription }
                    </p>

                    <div className="people-block">
                      <div className="people-label">
                        Female
                        <p className="price">
                          { 
                            this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.admissionPrice===0 ? (
                              'Free'
                            ) : (
                              '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.admissionPrice
                            )
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
                    <p style={{ margin: 0, fontSize: '0.75em' }}>
                      { this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.female.bookingDescription }
                    </p>

                    <div className="people-block">
                      <div className="people-label">
                        Male
                        <p className="price">
                          { 
                            this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.admissionPrice===0 ? (
                              'Free'
                            ) : (
                              '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.admissionPrice 
                            )
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
                    <p style={{ margin: 0, fontSize: '0.75em' }}>
                      { this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.couple.male.bookingDescription }
                    </p>
                  </div>
                ) : (
                  <div className="people">
                    <div className="people-block">
                      <div className="people-label">
                        Single
                        <p className="price">
                          { 
                            this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.admissionPrice===0 ? (
                              'Free'
                            ) : (
                              '\u20B9' + this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.admissionPrice
                            )
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
                    <p style={{ margin: 0, fontSize: '0.75em' }}>
                      { this.event.bookings.tickets[this.state.selectedTimeIndex].entry.pricing.single.bookingDescription }
                    </p>
                  </div>
                )
              }
            </section>
            <section className="payment">
              <div className="offers">
                <h3 className="bold">Offers</h3>

                <div className="available-offers">
                  {
                    this.event.offers.availableOffers.map((offer, index)=>(
                      <div className="offer-item" key={`available-offer-${index}`}
                        style={(()=>{
                          let { appliedOffers } = this.state
                          let appliedOfferIds = []

                          if(appliedOffers.length!==0)
                            for (const appliedOffer of appliedOffers)
                              appliedOfferIds.push(appliedOffer.offerId)

                          if(appliedOfferIds.includes(offer._id))
                            return {
                              backgroundColor: '#ff9e00',
                              color: '#000',
                              fontWeight: 600,
                              fontSize: '0.85em'
                            }

                          return {}
                        })()}
                        onClick={()=>{
                          let { appliedOffers } = this.state
                          let appliedOfferIds = []
                          for (const appliedOffer of appliedOffers)
                            appliedOfferIds.push(appliedOffer.offerId)

                          if(appliedOfferIds.includes(offer._id))
                            appliedOffers = appliedOffers.filter((appliedOffer) => appliedOffer.offerId!==offer._id)
                          else { 
                            appliedOffers.push({
                              offerId: offer._id,
                              offerTitle: offer.offerTitle,
                              category: offer.category,
                              discountPercent: offer.discountPercent
                            })
                          }

                          this.setState({
                            appliedOffers
                          })
                        }}
                      >
                        <img src="assets/icons/offer.png" alt="" className="offer-icon" />
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

              <div className="price">
                <div className="right">
                  <h3 className="bold">To Pay</h3>
                </div>
                <div className="left">
                  <h3>{ '\u20B9' + this.state.payment.toFixed(0) }</h3>
                </div>
              </div>
              
              <p style={{ margin: 0 }}>All charges payable at venue</p>

              <div style={{ margin: '2em auto', width: '100%' }}>
                <Button color="primary" variant="unconstrained" 
                  onClick={(event)=>{
                    this.onFinalize()
                  }}
                >
                  Proceed
                </Button>
              </div>

              <p className="center" style={{ opacity: 0.75, fontSize: '0.75em' }}>
                By making this booking you <br/>
                agree to our <Link to="/tnc">terms and conditions.</Link>
              </p>
            </section>
          </section>
        </section>
      </article>
    )
  }
}

export default TicketSelector
