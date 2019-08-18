import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper, TextField, Button, Switch } from '@material-ui/core'
import { RadioGroup, Radio } from '@material-ui/core'

import { handleChangeById as inputHandler } from '@clubgo/util'

export interface CreateTicketProps {
  onFinalize: Function,
  onCancel: Function,
  populate?: boolean,
  data?: any
}
export class CreateTicket extends Component<CreateTicketProps> {
  state = {
    loading: true,
    data: {
      ticketTitle: undefined,
      description: undefined,
      entryType: 'stag',
      pricing: {
        couple: {
          admissionPrice: undefined,
          bookingDescription: undefined,
          discount: undefined,
          malesPerCoupleRatio: undefined,
          female: {
            admissionPrice: undefined,
            bookingDescription: undefined,
            discount: undefined
          },
          male: {
            admissionPrice: undefined,
            bookingDescription: undefined,
            discount: undefined
          },
        },        
        stag: {
          admissionPrice: undefined,
          bookingDescription: undefined,
          discount: undefined
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

            <TextField id="description" required multiline fullWidth label="Description" 
              variant="outlined" margin="dense" onChange={this.handleChangeById}
              value={this.state.data.description}
            />
            
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
                          data.pricing.couple.admissionPrice = parseInt(target.value, 10)
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={((this.state.data.pricing.couple.discount*100)*-1)}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.couple.discount = -1*((parseInt(target.value, 10))/100)
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
                          data.pricing.couple.female.admissionPrice = parseInt(target.value, 10)
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={((this.state.data.pricing.couple.female.discount*100)*-1)}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.couple.female.discount = -1*((parseInt(target.value, 10))/100)
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
                          data.pricing.couple.male.admissionPrice = parseInt(target.value, 10)
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={((this.state.data.pricing.couple.male.discount*100)*-1)}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.couple.male.discount = -1*((parseInt(target.value, 10))/100)
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
                          data.pricing.stag.admissionPrice = target.value
                          this.setState({ data }) 
                        }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField multiline fullWidth label="Discount %" 
                        type="number" value={((this.state.data.pricing.stag.discount*100)*-1)}
                        variant="outlined" margin="dense" onChange={({target})=>{ 
                          let { data } = this.state
                          data.pricing.stag.discount = -1*((parseInt(target.value, 10))/100)
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

export default CreateTicket
