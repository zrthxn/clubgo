import React, { Component, useContext } from 'react'
import { Paper, Grid, TextField, Button, Modal } from '@material-ui/core'
import Select from 'react-select'

import '../scss/Offers.scss'

import { handleChangeById as inputHandler, verifyRequirements } from '@clubgo/util'
import AdminContext from '../../AdminContext'

interface CreateOfferProps {
  open: boolean
  onConfirm: Function
  onCancel: Function
  populate?: boolean
  data?: any
}

export class CreateOffer extends Component<CreateOfferProps> {
  static contextType = AdminContext
  context!: React.ContextType<typeof AdminContext>

  state = {
    selectCategory: null,
    data: {
      owner: 'admin',
      offerTitle: null,
      description: null,
      category: null,
      discountPercent: 0,
      terms: null
    }
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  componentDidMount() {
    this.setState(()=>{
      let { data } = this.props
      if(this.props.populate) {
        return {    
          data,
          selectCategory: {
            label: data.category.toUpperCase(), value: data.category
          },
          loading: false
        }
      }
      else
        return {
          loading: false
        }
    }) 
  }

  render() {
    return (
      <Modal open={this.props.open} style={{
        textAlign: 'center',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column'
      }}>
        <Paper style={{ 
          marginTop: '5em',
          marginLeft: '50%',
          left: '-14em',
          padding: '2em 4em',
          width: '28em',
          position: 'absolute' 
        }}>
          <Grid container spacing={1}>
            <h2 style={{ margin: '1em 0.25em' }}>Create Offer</h2>

            <Grid item xs={12}>
              <TextField fullWidth id="offerTitle" label="Offer Title" defaultValue={this.state.data.offerTitle}
                variant="outlined" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="description" multiline label="Description" defaultValue={this.state.data.description}
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item xs={6}>
              <Select
                inputId="category"
                placeholder="Category"
                backspaceRemovesValue
                defaultValue={this.state.selectCategory}
                options={
                  [ 'flat', 'coupon', 'platform', 'payment' ].map((item, index)=>({
                    label: item.toUpperCase(), value: item
                  }))
                }
                onChange={(selected)=>{
                  let { data } = this.state
                  data.category = selected.value
                  this.setState(()=>{
                    return {
                      selectCategory: selected,
                      data
                    }
                  })
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Discount" variant="outlined" margin="dense" 
                defaultValue={this.state.data.discountPercent}
                onChange={({ target })=>{
                  let { data } = this.state
                  if(target.value!=='')
                    data.discountPercent = parseInt(target.value, 10)
                  else
                    data.discountPercent = 0

                  this.setState({
                    data
                  })
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="terms" multiline label="Terms" defaultValue={this.state.data.terms}
                variant="outlined" onChange={this.handleChangeById}/>
            </Grid>
            
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={6}>
              <Button onClick={(e)=>{
                this.props.onCancel()
              }}>
                Close
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button color="primary"  onClick={(e)=>{
                this.props.onConfirm(this.state.data)
              }}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>      
    )
  }
}
