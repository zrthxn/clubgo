import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper, TextField, Button, Switch } from '@material-ui/core'
import { RadioGroup, Radio } from '@material-ui/core'

import { handleChangeById as inputHandler } from '@clubgo/util'

export interface TicketEditorProps {
  onFinalize: Function,
  onCancel: Function,
  populate?: boolean,
  data?: any
}
export class TicketEditor extends Component<TicketEditorProps> {
  state = {
    loading: true,
    data: {
      ref: Date.now().toString(36),
      owner: 'admin',
      ticketTitle: undefined,
      entryType: 'couple',
      pricing: {
        couple: {
          admissionPrice: undefined,
          bookingDescription: undefined,
          discount: 0,
          malesPerCoupleRatio: undefined,
          female: {
            admissionPrice: undefined,
            bookingDescription: undefined,
            discount: 0
          },
          male: {
            admissionPrice: undefined,
            bookingDescription: undefined,
            discount: 0
          },
        },        
        stag: {
          admissionPrice: undefined,
          bookingDescription: undefined,
          discount: 0
        }
      }
    },
    required: [],
    requiredFulfilled: true,
    iterableMembers: []
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

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  confirm = () => {
    this.props.onFinalize(this.state.data)
  }

  render() {
    return (
      <Paper style={{ padding: '2em', margin: '6em 0' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField id="ticketTitle" required fullWidth label="Ticket Title"
              variant="outlined" onChange={this.handleChangeById}
              value={this.state.data.ticketTitle}
            />
          </Grid>

          <Grid item xs={6}>
            <Label>Couples</Label>
            <Switch checked={(()=>this.state.data.entryType==='couple')()}
              onChange={()=>{
                this.setState(()=>{
                  let { data } = this.state
                  if(data.entryType==='stag') data.entryType = 'couple'
                  else if(data.entryType==='couple') data.entryType = 'stag'
                  return {
                    data
                  }
                })
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField id="malesPerCoupleRatio" required fullWidth label="Males Per Couple"
              disabled={(this.state.data.entryType!=='couple')}
              variant="outlined" margin="dense" //onChange={this.handleChangeById}
              //value={this.state.data.ticketTitle}
            />
          </Grid>

          <Grid item xs={12}>
          {
            this.state.data.entryType === 'couple' ? (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}><b>Couple</b></Grid>
                    <Grid item xs={10}><hr/></Grid>
                    <Grid item xs={8}>
                      <TextField multiline fullWidth label="Price" 
                        type="number" value={this.state.data.pricing.couple.admissionPrice}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.couple.admissionPrice = parseInt(target.value, 10)
                          else
                            data.pricing.couple.admissionPrice = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={this.state.data.pricing.couple.discount}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.couple.discount = parseInt(target.value, 10)
                          else
                            data.pricing.couple.discount = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField multiline fullWidth label="Booking Description" 
                        type="number" value={this.state.data.pricing.couple.bookingDescription}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.couple.bookingDescription = target.value
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}><b>Female</b></Grid>
                    <Grid item xs={8}><hr/></Grid>
                    <Grid item xs={6}>
                      <TextField multiline fullWidth label="Price" 
                        type="number" value={this.state.data.pricing.couple.female.admissionPrice}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.couple.female.admissionPrice = parseInt(target.value, 10)
                          else
                            data.pricing.couple.female.admissionPrice = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={this.state.data.pricing.couple.female.discount}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.couple.female.discount = parseInt(target.value, 10)
                          else
                            data.pricing.couple.female.discount = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField multiline fullWidth label="Booking Description" 
                        type="number" value={this.state.data.pricing.couple.female.bookingDescription}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.couple.female.bookingDescription = target.value
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={4}><b>Male</b></Grid>
                    <Grid item xs={8}><hr/></Grid>
                    <Grid item xs={6}>
                      <TextField multiline fullWidth label="Price" 
                        type="number" value={this.state.data.pricing.couple.male.admissionPrice}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.couple.male.admissionPrice = parseInt(target.value, 10)
                          else
                            data.pricing.couple.male.admissionPrice = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={this.state.data.pricing.couple.male.discount}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.couple.male.discount = parseInt(target.value, 10)
                          else
                            data.pricing.couple.male.discount = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField multiline fullWidth label="Booking Description" 
                        type="number" value={this.state.data.pricing.couple.male.bookingDescription}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.couple.male.bookingDescription = target.value
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={2}><b>Stag</b></Grid>
                    <Grid item xs={10}><hr/></Grid>
                    <Grid item xs={8}>
                      <TextField multiline fullWidth label="Price" 
                        type="number" value={this.state.data.pricing.stag.admissionPrice}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.stag.admissionPrice = target.value
                          else
                            data.pricing.stag.admissionPrice = 0
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={this.state.data.pricing.stag.discount}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          if(target.value!=='')
                            data.pricing.stag.discount = parseInt(target.value, 10)
                          else
                            data.pricing.stag.discount = 0
                          this.setState({ data })
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField multiline fullWidth label="Booking Description" 
                        type="number" value={this.state.data.pricing.stag.bookingDescription}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.stag.bookingDescription = target.value
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
          }
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" color="primary" style={{ margin: '1em' }}
              onClick={()=>{ this.props.onCancel() }}
            >
              Close
            </Button>
            
            <Button variant="contained" color="primary" style={{ margin: '1em' }}
              onClick={()=>{ this.confirm() }}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default TicketEditor
