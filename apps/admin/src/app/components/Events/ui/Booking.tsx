import React, { Component } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, InputAdornment, Tooltip} from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Link, Phone } from '@material-ui/icons'
import { ITicketModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/api'

import { Ticket } from '../../Tickets/Ticket'

export interface BookingProps {
  syncParentData?: Function,
  syncData?: boolean,
  populate?: boolean,
  data?: any
}
export interface IAssignTicket {
  activate: number,
  deactivate?: number,
  entry: ITicketModel
}

export class Booking extends Component<BookingProps> {
  searchService = new DatabaseService('/ticket')

  state = {
    loading: true,
    breakpoints: [0, 100],
    suggestions: {
      tickets: [].map((item:ITicketModel)=>({
        label: item.ticketTitle, value: item
      }))
    },
    synchronized: false,
    data: {
      isTakingOnsiteBookings: true,
      isTakingOnsitePayments: false,
      details: undefined,
      taxPercent: undefined,
      processingFeePercent: undefined,
      tickets: Array<IAssignTicket>(),
      registrationURL: String,
      registrationPhone: String
    }
  } 

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        return {
          data: this.props.data,
          loading: false,
        }
      }
      else
        return {
          loading: false,
        }
    })  
  }

  componentDidUpdate() {    
    // if(this.state.synchronized)
    //   this.setState({ synchronized: false })
      
    if(this.props.syncData!==this.state.synchronized) {
      if(this.props.syncData) {
        this.props.syncParentData(this.state.data, 'bookings')
        this.setState({
          synchronized: this.props.syncData
        })
      }        
    }
  }

  render() {
    if(!this.state.loading) return (
      <Paper className="create-block">
        <h3 className="title clearfix">
          Booking
          <div className="float-right">
            <span className="inline-text-label">On-Site</span>
            <Switch color="primary" defaultChecked={this.state.data.isTakingOnsiteBookings}
              onChange={()=>{
                this.setState(()=>{
                  let { data } = this.state
                  data.isTakingOnsiteBookings = !data.isTakingOnsiteBookings
                  return {
                    data
                  }
                })
              }}
            />
          </div>
        </h3>

        <Grid item container xs={12} spacing={3}>
          {
            this.state.data.isTakingOnsiteBookings ? (
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <span className="inline-text-label">ON-SITE PAYMENTS</span>
                  <Switch color="primary" defaultChecked={this.state.data.isTakingOnsitePayments}
                    onChange={()=>{
                      this.setState(()=>{
                        let { data } = this.state
                        data.isTakingOnsitePayments = !data.isTakingOnsitePayments
                        return {
                          data
                        }
                      })
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Select
                    inputId="searchTicketName"
                    placeholder="Search Ticket"
                    backspaceRemovesValue
                    value={null}
                    options={this.state.suggestions.tickets}
                    onInputChange={(value, { action }) => {
                      if(action==="input-change") {
                        this.searchService.searchBy({
                          $text: {
                            $search: value
                          }
                        }).then((response)=>{
                          let apiResponse = response.data
                          if (apiResponse.results.length!==0) {
                            let { suggestions } = this.state
                            suggestions.tickets = apiResponse.results.map((item:ITicketModel)=>({
                              label: item.ticketTitle, value: item
                            }))
                      
                            this.setState({
                              suggestions
                            })
                          }
                        }) 
                      }
                    }}
                    onChange={({ value }:{ value:ITicketModel })=>{
                      let { data, breakpoints } = this.state
                      data.tickets.push({
                        activate: undefined,
                        entry: value
                      })

                      if(data.tickets.length>1) {
                        let terminus = breakpoints.pop(), penultimate = breakpoints.pop()
                        let added = penultimate + ((terminus - penultimate) / 2)
                        breakpoints = [ ...breakpoints, penultimate, added, terminus ]
                      }

                      this.setState({
                        data,
                        breakpoints
                      })
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} style={{ padding: '1em', height: 'fit-content' }}>
                  {
                    this.state.data.tickets.map((ticket, index)=>{
                      return (
                        <div key={`ticketBooking_${index}`} style={{ height: 'fit-content' }}>
                          <Ticket data={ticket.entry}
                            onDelete={()=>{
                              let { data, breakpoints } = this.state
                              
                              if(data.tickets.length>1)
                                breakpoints.splice(index, 1)
                              data.tickets.splice(index, 1)

                              this.setState({
                                data,
                                breakpoints
                              })
                            }}
                            onEdit={(updatedTicket)=>{
                              let { data } = this.state
                              data.tickets[index].entry = updatedTicket 
                              this.setState({
                                data
                              })
                            }}
                          />

                          <div style={{ padding: '0 2em' }}>
                            <Slider value={[this.state.breakpoints[index], this.state.breakpoints[index + 1]]} 
                              onChange={(e, vals)=>{
                                this.setState(()=>{
                                  let { breakpoints } = this.state
                                  breakpoints[index] = vals[0]
                                  breakpoints[index + 1] = vals[1]
                                  return {  
                                    breakpoints
                                  }
                                })
                              }}
                            />
                          </div>
                        </div>
                      )
                    })
                  }
                </Grid>
              </Grid>
            ) : (
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={12}>
                  <Label>Registration URL</Label>
                  <TextField fullWidth variant="outlined" margin="dense" placeholder="https://example.com/register"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">
                        <Link/>
                      </InputAdornment>,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Label>Phone</Label>
                  <TextField fullWidth variant="outlined" margin="dense" placeholder="+91-9988776655"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">
                        <Phone/>
                      </InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>              
            )
          }
        </Grid>
      </Paper>
    )
    else return (
      <h3>Loading...</h3>
    )
  }
}

export default Booking