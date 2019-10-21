import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch } from '@material-ui/core'
import { Slider } from '@material-ui/lab'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { Label } from 'reactstrap';

interface HoursProps {
  syncParentData?: Function,
  syncData?: boolean,
  populate?: boolean,
  data?: object
}

export class Hours extends Component<HoursProps> {
  state = {
    synchronized: false,
    data: {
      timings: []
    }
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        return {
          loading: false,
          data: {
            timings: this.props.data
          }
        }
      }
      else {
        let days = [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' 
        ]
    
        let { data } = this.state
        let timings = []
        for (const day of days) {
          timings.push({
            day,
            isOpen: false,
            openTime: 720,
            closeTime: 1440,
            busy: 0,
          })
        }
        data.timings = timings
        return {
          loading: false,
          data
        }
      }
    })
  }

  componentDidUpdate() {    
    if(this.props.syncData!==this.state.synchronized) {
      if(this.props.syncData) {
        this.props.syncParentData([...this.state.data.timings], 'timings')
        this.setState({
          synchronized: this.props.syncData
        })
      }
    }
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Opening Hours</h3>

        <Grid item container spacing={3}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {
              this.state.data.timings.map((day, index) => {
                let busynessLabel
                if(day.busy<=25)
                  busynessLabel = 'Empty'
                else if(day.busy>25 && day.busy<=50)
                  busynessLabel = 'Mild'
                else if(day.busy>50 && day.busy<=75)
                  busynessLabel = 'Busy'
                else if(day.busy>75)
                  busynessLabel = 'Very Busy'

                return (
                  <Grid item xs={12} key={ day.day } style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ margin: '1em' }}>
                      <b>{ day.day }</b>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
                      <span style={{ margin: '1em' }}>
                        <span>
                          {
                            this.state.data.timings[index].isOpen ? 'Open' : 'Closed'
                          }
                        </span>
                        <Switch id={`timings#${index}/isOpen`} color={'primary'} onChange={this.handleChangeById}
                          checked={ this.state.data.timings[index].isOpen }
                        />
                      </span>
                      
                      <TimePicker
                        disabled={!this.state.data.timings[index].isOpen}
                        style={{ margin: '0 1em' }}
                        margin="dense"
                        id={`timings#${index}/openTime`}
                        label="Opening Time"
                        value={{
                          hour: ((this.state.data.timings[index].openTime - (this.state.data.timings[index].openTime % 60)) / 60),
                          minute: this.state.data.timings[index].openTime % 60
                        }}
                        onChange={(d)=>{
                          let time = (d.hours() * 60) + d.minutes()
                          let { timings } = this.state.data, { data } = this.state
                          timings[index].openTime = time
                          data.timings = timings
                          this.setState((prevState, props)=>{
                            return {
                              data
                            }
                          })
                        }}
                      />

                      <TimePicker
                        disabled={!this.state.data.timings[index].isOpen}
                        style={{ margin: '0 1em' }}
                        margin="dense"
                        id={`timings#${index}/closeTime`}
                        label="Closing Time"
                        value={{
                          hour: ((this.state.data.timings[index].closeTime - (this.state.data.timings[index].closeTime % 60)) / 60),
                          minute: this.state.data.timings[index].closeTime % 60
                        }}
                        onChange={(d)=>{
                          let time = (d.hours() * 60) + d.minutes()
                          let { timings } = this.state.data, { data } = this.state
                          timings[index].closeTime = time
                          data.timings = timings
                          this.setState((prevState, props)=>{
                            return {
                              data
                            }
                          })
                        }}
                      />

                      <span style={{ width: '10em' }}>
                        <Label>{ busynessLabel }</Label>
                        <Slider max={100}
                          disabled={!this.state.data.timings[index].isOpen}
                          value={this.state.data.timings[index].busy}
                          onChangeCommitted={(event, value)=>{
                            let { timings } = this.state.data, { data } = this.state
                            timings[index].busy = value
                            data.timings = timings
                            this.setState((prevState, props)=>{
                              return {
                                data
                              }
                            })
                          }}
                        />
                      </span>

                      <span style={{ margin: 'auto 1em' }}>
                        <Button size="small" onClick={()=>{
                          let { data } = this.state
                          for (let i=0; i<this.state.data.timings.length; i++) {
                            data.timings[i] = {
                              day: data.timings[i].day,
                              isOpen: this.state.data.timings[index].isOpen,
                              openTime: this.state.data.timings[index].openTime,
                              closeTime: this.state.data.timings[index].closeTime,
                              busy: this.state.data.timings[index].busy
                            }
                          }
                          this.setState(()=>({
                            data
                          }))
                        }}>
                          Apply to All
                        </Button>
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
