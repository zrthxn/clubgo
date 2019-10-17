import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'
import { TimePicker, DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import Select from 'react-select'
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker'
import MomentUtils from '@date-io/moment'
import { ThemeProvider } from '@material-ui/styles'

interface SchedulingProps {
  syncParentData?: Function
  syncData?: boolean
  populate?: boolean
  data?: any
}

export class Scheduling extends Component<SchedulingProps> {
  state = {
    endTimeBleedToNextDay: false,
    synchronized: false,
    data: {
      type: 'once',
      isRecurring: false,
      recurring: {
        date: undefined,
        day: undefined,
        month: undefined
      },
      customDates: [ ],
      noShowDates: [ ],
      timing: {
        startTime: 0,
        endTime: 720
      }
    }
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        return {
          loading: false,
          data: this.props.data
        }
      }
      else
        return {
          loading: false
        }
    })
  }

  componentDidUpdate() {    
    if(this.props.syncData!==this.state.synchronized) {
      if(this.props.syncData) {
        this.props.syncParentData(this.state.data, 'scheduling')
        this.setState({
          synchronized: this.props.syncData
        })
      }
    }
  }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title clearfix">
          Scheduling
          <div className="float-right">
            <span className="inline-text-label">Recurring</span>
            <Switch color="primary" defaultChecked={this.state.data.isRecurring}
              onChange={({ target })=>{
                this.setState(()=>{
                  let { data } = this.state
                  // data.isRecurring = !data.isRecurring
                  
                  if(target.checked)
                    data.type = 'daily'
                  else
                    data.type = 'once'

                  return {
                    data
                  }
                })
              }}
            />
          </div>
        </h3>
        
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <br/>
              <Label><b>Dates</b></Label>
            </Grid>

            {
              this.state.data.isRecurring ? (
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Select
                        inputId="type"
                        placeholder="Recurring Type"
                        defaultValue={{ 
                          label: this.state.data.type.substr(0,1).toUpperCase() + this.state.data.type.substr(1), 
                          value: this.state.data.type
                        }}
                        options={[
                          'daily', 'weekly', 'monthly', 'custom'
                        ].map((item)=>({
                          label: item.substr(0,1).toUpperCase() + item.substr(1), value: item
                        }))}
                        onChange={ selected => {
                          let { data } = this.state
                          data.type = selected.value
                          this.setState(()=>{
                            return {
                              data
                            }
                          })
                        }}
                      />
                    </Grid>

                    {
                      this.state.data.type==='daily' ? (
                        <Grid item xs={12}>
                          Every Day
                        </Grid>
                      ) : null
                    }

                    {
                      this.state.data.type==='weekly' ? (
                        <Grid item xs={12}>
                          Every Week
                        </Grid>
                      ) : null
                    }

                    {
                      this.state.data.type==='monthly' ? (
                        <Grid item xs={12}>
                          {/* <MultipleDatesPicker
                            open={true}
                            selectedDates={[]}
                            onCancel={()=>{
                              
                            }}
                            onSubmit={ dates => {
                              console.log('selected dates', dates)
                            }}
                          /> */}
                        </Grid>
                      ) : null
                    }
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <DatePicker
                    label="Event Date"
                    value={
                      this.state.data.customDates[0]!==undefined ?  (
                        new Date( this.state.data.customDates[0] )
                      ) : new Date()
                    }
                    onChange={(d)=>{
                      let date = d.toJSON()
                      let { data } = this.state
                      this.setState(()=>{
                        data.customDates = [
                          date
                        ]
                        return {
                          data
                        }
                      })
                    }}
                  />
                </Grid>
              )
            }

            <Grid item xs={12}>
              <hr/><br/>
              <Label><b>Timing</b></Label>
            </Grid>

            <Grid item xs={12}>
              <Label style={{ margin: 'auto 0.5em' }}>Start Time</Label>
              <TimePicker
                margin="dense"
                style={{ margin: '0 1em' }}
                label="Start Time"
                value={{
                  hour: ((this.state.data.timing.startTime - (this.state.data.timing.startTime % 60)) / 60),
                  minute: this.state.data.timing.startTime % 60
                }}
                onChange={(t)=>{
                  let time =  (t.hours() * 60) + t.minutes()
                  let { data } = this.state
                  data.timing.startTime = time
                  this.setState((prevState, props)=>{
                    return {
                      data
                    }
                  })
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Label style={{ margin: 'auto 0.5em' }}>End Time</Label>
              <TimePicker
                margin="dense"
                style={{ margin: '0 1em' }}
                label="End Time"
                value={{ 
                  hour: this.state.endTimeBleedToNextDay ? (
                    ((this.state.data.timing.endTime - 1440 - (this.state.data.timing.endTime % 60)) / 60)
                  ) : (
                    ((this.state.data.timing.endTime - (this.state.data.timing.endTime % 60)) / 60)
                  ),
                  minute: this.state.data.timing.endTime % 60
                 }}
                onChange={(t)=>{
                  let time =  (t.hours() * 60) + t.minutes()
                  let { data, endTimeBleedToNextDay } = this.state

                  if(time < data.timing.startTime)
                    endTimeBleedToNextDay = true
                  else
                    endTimeBleedToNextDay = false

                  if(endTimeBleedToNextDay)
                    time += 1440

                  data.timing.endTime = time
                  this.setState((prevState, props)=>{
                    return {
                      data,
                      endTimeBleedToNextDay
                    }
                  })
                }}
              />

              <Checkbox checked={this.state.endTimeBleedToNextDay} onChange={()=>{
                let { endTimeBleedToNextDay, data } = this.state

                if(endTimeBleedToNextDay) {
                  endTimeBleedToNextDay = false
                  data.timing.endTime -= 1440
                }
                else { 
                  endTimeBleedToNextDay = true
                  data.timing.endTime += 1440
                }

                this.setState(()=>({
                  data,
                  endTimeBleedToNextDay
                }))
              }}/>
              
              <Label style={{ margin: 'auto 0.5em' }}>Next Day</Label>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Paper>
    )
  }
}

export default Scheduling