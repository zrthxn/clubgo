import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, InputAdornment, Tooltip} from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Link, Phone } from '@material-ui/icons'

export interface BookingProps {
  syncParentData: Function
}
export class Booking extends Component<BookingProps> {
  state = {
    takeBookings: true,
    takePayments: false,
    breakpoint: 25,
    data: {
      isTakingOnsiteBookings: true,
      isTakingOnsitePayments: false,
      tickets: [
        {
          ticketId: String,
          price: Number,
          activateTime: Date,
          deactivateTime: Date
        }
      ],
      registrationURL: String,
      registrationPhone: String
    },
    requiredFulfilled: true,
    required: [
      
    ],
    iterableMembers: [
      
    ]
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
                  <span className="inline-text-label">PAYMENTS</span>
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

                {
                  this.state.data.isTakingOnsitePayments ? (
                    <Grid item xs={12}>
                      <Slider
                        value={[0, this.state.breakpoint]} 
                        onChange={(e, vals)=>{
                          this.setState(()=>({
                            breakpoint: vals[1]
                          }))
                        }}
                      />
                      <Slider
                        value={[this.state.breakpoint,100]}
                        onChange={(e, vals)=>{
                          this.setState(()=>({
                            breakpoint: vals[0]
                          }))
                        }}
                      />
                    </Grid>  
                  ) : (
                    <div>
                      <p>Not Taking Payments</p>
                    </div>
                  )
                }             
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