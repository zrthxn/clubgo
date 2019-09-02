import React, { Component } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, InputAdornment, Tooltip} from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Link, Phone } from '@material-ui/icons'
import { ITicketModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/features/api'

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
  searchService = new DatabaseService({ endpoint: 'api', path: '/ticket' })

  state = {
    breakpoint: 25,
    suggestions: {
      tickets: [].map((item:ITicketModel)=>({
        label: item.ticketTitle, value: item
      }))
    },
    synchronized: false,
    data: {
      isTakingOnsiteBookings: true,
      isTakingOnsitePayments: false,
      tickets: Array<IAssignTicket>(),
      registrationURL: String,
      registrationPhone: String
    }
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
    return (
      <Paper className="create-block">
        <h3 className="title">
          Booking
          <div className="float-right">
            <span className="inline-text-label">On-Site</span>
            <Switch color="primary" defaultChecked
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
                  <Switch color="primary"
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
                        this.searchService.findBy({
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
                    onChange={(selected)=>{
                      let { data } = this.state
                      data.tickets.push({
                        activate: undefined,
                        entry: selected.value
                      })

                      this.setState({
                        data
                      })
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} style={{ padding: '1em' }}>
                  {
                    this.state.data.tickets.map((ticket, index)=>{
                      return (
                        <div key={`ticketBooking_${index}`}>
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

                          <Slider value={[0, this.state.breakpoint]} 
                            onChange={(e, vals)=>{
                              this.setState(()=>({
                                breakpoint: vals[1]
                              }))
                            }}
                          />
                        </div>
                      )
                    })
                  }
                </Grid>
                

                {/* <Grid item xs={12}>
                  <Slider value={[0, this.state.breakpoint]} 
                    onChange={(e, vals)=>{
                      this.setState(()=>({
                        breakpoint: vals[1]
                      }))
                    }}
                  />

                  <Slider value={[this.state.breakpoint,100]}
                    onChange={(e, vals)=>{
                      this.setState(()=>({
                        breakpoint: vals[0]
                      }))
                    }}
                  />
                </Grid> */}

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
  }
}

export default Booking