import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import './Booking.scss'
import { Button, Textbox } from '@clubgo/website/components'
import { IEventModel, IVenueModel } from '@clubgo/database'

interface TicketViewProps {
  event:IEventModel
  venue:IVenueModel
}

export class Ticket extends Component<TicketViewProps> {
  state = {
    selectedDateIndex: 0,
    selectedTimeIndex: 0
  }
  
  event:IEventModel

  venue:IVenueModel

  constructor(props) {
    super(props)
    this.event = this.props.event
    this.venue = this.props.venue
  }

  componentDidMount() {
    
  }
  
  render() {
    return (
      <article>
        <section className="container">
          <h1 className="center">Tickets</h1>

          <section className="booking">
            <Grid container>
              <Grid item xs={1}/>
              <Grid item md={5} xs={12}>
                <section className="ticket">
                  <div className="event-details">
                    <h2 className="event-name">{ this.event.eventTitle }</h2>
                    <h3 className="venue-name">{ this.event.venue.title }</h3>
                  </div>

                  <h3 className="bold">Select a Date</h3>
                  <div className="dates">
                    {
                      [1,2].map((item, index)=>(
                        <div className={this.state.selectedDateIndex===index ? 'select-pill selected' : 'select-pill'}
                          onClick={()=>{
                            this.setState({
                              selectedDateIndex: index
                            })
                          }}
                        >
                          { 28 + index } Sept
                        </div>
                      ))
                    }
                  </div>
                  <hr/>

                  <h3 className="bold">Timings</h3>
                  <p style={{ margin: 0, opacity: 0.75 }}>Last entry time is <b>1:00 AM</b></p>
                  <div className="timings">
                    {
                      [1,2].map((item, index)=>(
                        <div className={this.state.selectedTimeIndex===index ? 'select-pill selected' : 'select-pill'}
                          onClick={()=>{
                            this.setState({
                              selectedTimeIndex: index
                            })
                          }}
                        >
                          { 1 + index }:00 PM
                        </div>
                      ))
                    }
                  </div>
                  <hr/>

                  <h3 className="bold">People</h3>
                  <div className="people">
                    <p>Couple</p>
                    <p>Women</p>
                    <p>Men</p>
                  </div>
                </section>
              </Grid>

              <Grid item md={5} xs={12}>
                <section className="payment">
                  <h3 className="bold">Payment</h3>

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
                                color: '#fff',
                                padding: '0.5em 0.75em',
                                backgroundColor: '#1c1c1c40',
                                borderRadius: '0.5em',
                                marginRight: '0.5em',
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
                            <Button size="small" variant="text">Apply</Button>
                          )
                        }
                      ]}
                    />
                  </div>
                  
                  <div className="price">
                    <h3>To Pay</h3>
                    <h3 className="bold">{ '\u20B9' + '3,000' }</h3>
                  </div>
                  <p style={{ margin: 0 }}>All charges payable at venue</p>

                  <div style={{ margin: '2em auto', width: '100%' }}>
                    <Button color="primary" variant="unconstrained">Book Now</Button>
                  </div>

                  <p className="center" style={{ opacity: 0.75, fontSize: '0.75em' }}>
                    By making this booking you <br/>
                    agree to our <Link to="/tnc">terms and conditions.</Link>
                  </p>
                </section>
              </Grid>
              <Grid item xs={1}/>
            </Grid>
          </section>
        </section>
      </article>
    )
  }
}

export default Ticket
