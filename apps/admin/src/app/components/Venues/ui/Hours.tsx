import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { MuiPickersUtilsProvider, KeyboardTimePicker, TimePicker } from '@material-ui/pickers'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { Label } from 'reactstrap';

export interface HoursProps {
  syncParentData: Function
}
export class Hours extends Component<HoursProps> {
  state = {
    data: {
      timings: []
    },
    requiredFulfilled: false,
    required: [

    ],
    iterableMembers: [
      'timings'
    ]
  }

  constructor(props) {
    super(props)
    let { timings } = this.state.data
    let days = [
      { label: 'Monday' },
      { label: 'Tuesday' },
      { label: 'Wednesday' },
      { label: 'Thursday' },
      { label: 'Friday' },
      { label: 'Saturday' },
      { label: 'Sunday' },
    ].map(day => {
      timings.push({
        day: day.label,
        isOpen: false,
        openTime: null,
        closeTime: null,
        busy: null,
      })
    })
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.props.syncParentData([...this.state.data.timings], 'timings')
    this.setState((prevState, props)=>(
      result
    ))
  }

  getBusynessLabel = (busy) => {
    if(busy<=25)
      return 'Empty'
    else if(busy>25 && busy<=50)
      return 'Mild'
    else if(busy>50 && busy<=75)
      return 'Busy'
    else if(busy>75)
      return 'Very Busy'
  }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Opening Hours</h3>

        <Grid item container spacing={3}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {
              this.state.data.timings.map((day, index) => {
                return (
                  <Grid item xs={12} key={ day.day } style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                    <p
                      style={{
                        margin: '1em'
                      }}
                    ><b>{ day.day }</b></p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      margin: 'auto'
                    }}>
                      <span style={{ margin: '1em' }}>
                        <span>
                          {
                            this.state.data.timings[index].isOpen ? 'Open' : 'Closed'
                          }
                        </span>
                        <Switch id={`timings#${index}/isOpen`} color={'primary'} onChange={this.handleChangeById}/>
                      </span>
                      
                      <KeyboardTimePicker
                        disabled={!this.state.data.timings[index].isOpen}
                        style={{ margin: '0 1em' }}
                        margin="dense"
                        id={`timings#${index}/openTime`}
                        label="Opening Time"
                        value={{
                          hour: (this.state.data.timings[index].openTime/60).toFixed(0),
                          minute: this.state.data.timings[index].openTime%60
                        }}
                        onChange={(d)=>{
                          let time = d.hours()*60 + d.minutes()
                          let { timings } = this.state.data, { data } = this.state
                          timings[index].openTime = time
                          data.timings = timings
                          this.setState((prevState, props)=>{
                            this.props.syncParentData([...this.state.data.timings], 'timings')
                            return {
                              data
                            }
                          })
                        }}
                      />

                      <KeyboardTimePicker
                        disabled={!this.state.data.timings[index].isOpen}
                        style={{ margin: '0 1em' }}
                        margin="dense"
                        id={`timings#${index}/closeTime`}
                        label="Closing Time"
                        value={{
                          hour: (this.state.data.timings[index].closeTime/60).toFixed(0),
                          minute: this.state.data.timings[index].closeTime%60
                        }}
                        onChange={(d)=>{
                          let time = d.hours()*60 + d.minutes()
                          let { timings } = this.state.data, { data } = this.state
                          timings[index].closeTime = time
                          data.timings = timings
                          this.setState((prevState, props)=>{
                            this.props.syncParentData([...this.state.data.timings], 'timings')
                            return {
                              data
                            }
                          })
                        }}
                      />

                      <span style={{ width: '10em' }}>
                        <Label>
                          {
                            this.getBusynessLabel(this.state.data.timings[index].busy)
                          }
                        </Label>
                        <Slider max={100}
                          disabled={!this.state.data.timings[index].isOpen}
                          value={this.state.data.timings[index].busy}
                          onChangeCommitted={(event, value)=>{
                            let { timings } = this.state.data, { data } = this.state
                            timings[index].busy = value
                            data.timings = timings
                            this.setState((prevState, props)=>{
                              this.props.syncParentData([...this.state.data.timings], 'timings')
                              return {
                                data
                              }
                            })
                          }}
                        />
                      </span>
                    </div>
                  </Grid>
                )
              })
            }
          </MuiPickersUtilsProvider>
        </Grid>
      </Paper>
    )
  }
}

export default Hours
