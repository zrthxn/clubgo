import React, { Component } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'
import { Grid, Paper, IconButton } from '@material-ui/core'
import { TextField, Button, Switch, InputAdornment, Tooltip} from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Link, Phone, Delete } from '@material-ui/icons'
import { ITicketModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/api'

import { Ticket } from '../../Tickets/Ticket'

interface BookingProps {
  syncParentData?: Function
  syncData?: boolean
  populate?: boolean
  data?: any
}

interface IAssignTicket {
  activate: number
  deactivate?: number
  ticketMaximumUses?: number
  entry: ITicketModel
}

export class Booking extends Component<BookingProps> {
  searchService = new DatabaseService('/ticket')

  state = {
    loading: true,
    suggestions: {
      tickets: [].map((item:ITicketModel)=>({
        label: item.ticketTitle, value: item
      }))
    },
    synchronized: false,
    data: {
      isTakingOnsiteBookings: true,
      isTakingOnsitePayments: false,
      onsitePaymentRequired: false,
      allowPreBookingUptoDays: undefined,
      maximumBookingUpto: undefined,
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

    this.searchService.searchBy({}).then((response)=>{
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

  componentDidUpdate() {
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
        
        {
          this.state.data.isTakingOnsiteBookings ? (
            <Grid item container xs={12} spacing={3}>
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

              {
                this.state.data.isTakingOnsitePayments ? (
                  <Grid item xs={6}>
                    <span className="inline-text-label">PAYMENT REQUIRED</span>
                    <Switch color="primary" defaultChecked={this.state.data.onsitePaymentRequired}
                      onChange={()=>{
                        this.setState(()=>{
                          let { data } = this.state
                          data.onsitePaymentRequired = !data.onsitePaymentRequired
                          return {
                            data
                          }
                        })
                      }}
                    />
                  </Grid>
                ) : null
              }

              <Grid item xs={12}>
                <Select
                  inputId="searchTicketName"
                  placeholder="Search Ticket"
                  backspaceRemovesValue
                  value={null}
                  options={this.state.suggestions.tickets}
                  // onInputChange={(value, { action }) => {
                  //   if(action==="input-change") {
                  //     this.searchService.searchBy({
                  //       $text: {
                  //         $search: value
                  //       }
                  //     }).then((response)=>{
                  //       let apiResponse = response.data
                  //       if (apiResponse.results.length!==0) {
                  //         let { suggestions } = this.state
                  //         suggestions.tickets = apiResponse.results.map((item:ITicketModel)=>({
                  //           label: item.ticketTitle, value: item
                  //         }))
                    
                  //         this.setState({
                  //           suggestions
                  //         })
                  //       }
                  //     }) 
                  //   }
                  // }}
                  onChange={({ value }:{ value:ITicketModel })=>{
                    let { data } = this.state
                    data.tickets.push({
                      activate: 0,
                      deactivate: 1440,
                      entry: value
                    })

                    this.setState({
                      data
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField id="maximumBookingUpto" fullWidth variant="outlined" margin="dense" type="number"
                  label="Total Maximum Entries" defaultValue={this.state.data.maximumBookingUpto}
                  onChange={({ target })=>{
                    let { data } = this.state
                    this.setState(()=>{
                      if(target.value!=='')
                        data.maximumBookingUpto = parseInt(target.value, 10)
                      else
                        data.maximumBookingUpto = 0
                      return {
                        data
                      }
                    })
                  }} 
                />
              </Grid>
              
              <Grid item xs={12} style={{ padding: '1em', height: 'fit-content' }}>
                {
                  this.state.data.tickets.map((ticket, index)=>{
                    return (
                      <div key={`ticketBooking-${index}`} style={{ 
                        height: 'fit-content', display: 'flex', flexDirection: 'column' 
                      }}>
                        <div style={{ margin: '1em auto' }}>
                          <Ticket data={ticket.entry}
                            onDelete={()=>{
                              let { data } = this.state
                              data.tickets.splice(index, 1)
                              this.setState({
                                data
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
                        </div>

                        <div style={{ margin: '0 auto 1em auto' }}>
                          <TextField id="ticketMaximumUses" variant="outlined" margin="dense" type="number"
                            label="Ticket Maximum Uses" defaultValue={this.state.data.tickets[index].ticketMaximumUses}
                            onChange={({ target })=>{
                              let { data } = this.state
                              this.setState(()=>{
                                if(target.value!=='')
                                  data.tickets[index].ticketMaximumUses = parseInt(target.value, 10)
                                else
                                  data.tickets[index].ticketMaximumUses = 0
                                return {
                                  data
                                }
                              })
                            }} 
                          />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <span style={{ margin: '0 1em' }}>
                            {
                              ((this.state.data.tickets[index].activate - 
                                (this.state.data.tickets[index].activate % 60))/60).toString().length===1 ? (
                                  '0'
                                ) : null
                            }{ 
                              (this.state.data.tickets[index].activate - (this.state.data.tickets[index].activate % 60))/60
                            }  
                            { ':' }
                            {
                              (this.state.data.tickets[index].activate % 60).toString().length===1 ? (
                                '0'
                              ) : null
                            }{
                              (this.state.data.tickets[index].activate % 60)
                            }
                          </span>

                          <Slider style={{ flexGrow: 1 }}
                            value={[
                              this.state.data.tickets[index].activate, this.state.data.tickets[index].deactivate
                            ]}
                            step={30}
                            max={1440}
                            onChange={(e, vals)=>{
                              this.setState(()=>{
                                let { data } = this.state
                                data.tickets[index].activate = vals[0]
                                data.tickets[index].deactivate = vals[1]
                                return {  
                                  data
                                }
                              })
                            }}
                          />

                          <span style={{ margin: '0 1em' }}>
                            {
                              ((this.state.data.tickets[index].deactivate - 
                                (this.state.data.tickets[index].deactivate % 60))/60).toString().length===1 ? (
                                  '0'
                                ) : null
                            }{ 
                              (this.state.data.tickets[index].deactivate - (this.state.data.tickets[index].deactivate % 60))/60
                            }
                            { ':' }
                            {
                              (this.state.data.tickets[index].deactivate % 60).toString().length===1 ? (
                                '0'
                              ) : null
                            }{
                              (this.state.data.tickets[index].deactivate % 60)
                            }
                          </span>
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
      </Paper>
    )
    else return (
      <h3>Loading...</h3>
    )
  }
}

export default Booking