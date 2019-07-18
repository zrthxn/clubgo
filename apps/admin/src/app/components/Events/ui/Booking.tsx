import React, { Component } from 'react'
import * as Rs from 'reactstrap'

import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, InputAdornment, Tooltip} from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { Link } from '@material-ui/icons'

export class Booking extends Component {
  state = {
    takeBookings: false,
    takePayments: false,
    breakpoint: 25
  }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">
          Booking
          <div className="float-right">
            <span className="inline-text-label">Bookings</span>
            <Switch color="primary"
              onChange={()=>{
                this.setState(()=>({
                  takeBookings: !this.state.takeBookings
                }))
              }}
            />
          </div>
        </h3>

        <Grid container xs={12} spacing={3}>
          {
            this.state.takeBookings ? (
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <span className="inline-text-label">PAYMENTS</span>
                  <Switch color="primary"
                    onChange={()=>{
                      this.setState(()=>({
                        takePayments: !this.state.takePayments
                      }))
                    }}
                  />
                </Grid>

                {
                  this.state.takePayments ? (
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
              <Grid item xs={12}>
                <Rs.Label>Registration URL</Rs.Label>
                <TextField fullWidth variant="outlined" margin="dense" placeholder="https://example.com/register"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <Link/>
                    </InputAdornment>,
                  }}
                />
              </Grid>
            )
          }
        </Grid>
      </Paper>
    )
  }
}

export default Booking