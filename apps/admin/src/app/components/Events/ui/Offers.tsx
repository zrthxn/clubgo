import React, { Component } from 'react'
import { Grid, Paper, Modal } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import Select from 'react-select'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { DatabaseService } from '@clubgo/api'
import { IOfferModel } from '@clubgo/database'
import { Offer } from '../../../components/Offers/Offer'

interface OffersProps {
  syncParentData?: Function
  syncData?: boolean
  populate?: boolean
  data?: object
}

export class Offers extends Component<OffersProps> {
  state = {
    loading: true,
    suggestions: {
      offers: [].map((item:IOfferModel)=>({
        label: item.offerTitle, value: item
      }))
    },
    synchronized: false,
    data: {
      maxOffers: Number,
      availableOffers: []
    }
  }

  offerService = new DatabaseService('/offer')

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
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

  componentDidUpdate() {
    if(this.props.syncData!==this.state.synchronized) {
      if(this.props.syncData) {
        this.props.syncParentData(this.state.data, 'offers')
        this.setState({
          synchronized: this.props.syncData
        })
      }        
    }
  }

  render() {
    return (
      <Paper className="create-block">
        <div className="title">Offers</div>
        <Grid item container spacing={3}>
          <Grid item xs={12}>
            <Select
              inputId="searchTicketName"
              placeholder="Search Offers"
              backspaceRemovesValue
              value={null}
              options={this.state.suggestions.offers}
              onInputChange={(value, { action }) => {
                if(action==="input-change") {
                  this.offerService.searchBy({
                    $text: {
                      $search: value
                    }
                  }).then((response)=>{
                    let apiResponse = response.data
                    if (apiResponse.results.length!==0) {
                      let { suggestions } = this.state
                      suggestions.offers = apiResponse.results.map((item:IOfferModel)=>({
                        label: item.offerTitle, value: item
                      }))
                
                      this.setState({
                        suggestions
                      })
                    }
                  }) 
                }
              }}
              onChange={({ value })=>{
                let { data } = this.state
                data.availableOffers.push(value)
                this.setState({
                  data
                })
              }}
            />
          </Grid>

          {
            this.state.data.availableOffers.map((offer, index)=>(
              <Offer data={offer} key={`applied-offer-${index}`}
                onEdit={(editedOffer:IOfferModel)=>{
                  let { data } = this.state
                  data.availableOffers[index] = editedOffer
                  this.setState({
                    data
                  })
                }}
                onDelete={()=>{
                  let { data } = this.state
                  data.availableOffers.splice(index, 1)
                  this.setState({ data })
                }}
              />
            ))
          }

          <Grid item xs={12}>
            <TextField id="maxOffers" fullWidth label="Max Offers" 
              variant="outlined" margin="dense" onChange={this.handleChangeById} 
              defaultValue={this.state.data.maxOffers}/>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Offers
