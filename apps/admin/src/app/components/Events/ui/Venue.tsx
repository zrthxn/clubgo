import React, { Component, CSSProperties, HTMLAttributes } from 'react'
import { Grid, Paper, InputAdornment, MenuItem } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, Chip } from '@material-ui/core'
import Select from 'react-select';

import { handleChangeById as inputHandler } from '@clubgo/util'

export interface VenueProps {
  syncParentData?: Function
  populate?: boolean,
  data?: any
}
export class Venue extends Component<VenueProps> {
  state = {
    suggestions:{
      city: [ ],
      venueCategory: [ ],
      venue: [ ],
      locality: [ ]
    },
    selectCity: null,
    selectVenueCategory: null,
    selectCustomLocality: null,
    filters: [
      'selectCity', 'selectVenueCategory'
    ],
    data: {
      city: String,
      venueId: String,
      title: String,
      address: String,
      isCustomVenue: false,
      customVenueDetails: {
        locality: String,
        coordinates: {
          _lat: Number,
          _lon: Number
        }
      }
    },
    requiredFulfilled: false,
    required: [
      'city'
    ],
    iterableMembers: [ ]
  }

  constructor(props) {
    super(props)
    let { suggestions } = this.state

    suggestions.city = [
      { label: 'Delhi' },
      { label: 'Mumbai' },
      { label: 'Bangalore' },
      { label: 'Gurgaon' },
    ].map(item=>({
      value: item.label, label: item.label,
    }))

    suggestions.venueCategory = [
      { label: 'Nightclubs' },
      { label: 'Clubs and Bars' }
    ].map(item=>({
      value: item.label, label: item.label,
    }))

    suggestions.venue = [
      // 
    ].map(item=>({
      value: item.label, label: item.label,
    }))

    this.state.suggestions = suggestions
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState)=>(
      result
    ))
  }

  render() {
    // Venue Details Section  ----------------------------------------------  Venue Details Section
    // ============================================================================================
    return (
      <Paper className="create-block">
        <h3 className="title clearfix">
          Venue
          <div className="float-right">
            <span className="inline-text-label">Custom</span>
            <Switch id="isCustomVenue" color="primary" onChange={this.handleChangeById}/>
          </div>
        </h3>

        {
          !this.state.data.isCustomVenue ? (
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={6}>
                <Select
                  inputId="city"
                  placeholder="Select City"
                  value={this.state.selectCity}
                  options={this.state.suggestions.city}
                  onChange={ selected => {
                    let { data } = this.state
                    data.city = selected.value
                    this.setState((prevState, props)=>({ 
                      data: data,
                      selectCity: selected
                    }))
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Select
                  inputId="venueCategory"
                  placeholder="Venue Catgory"
                  value={this.state.selectVenueCategory}
                  options={this.state.suggestions.venueCategory}
                  onChange={ selected => {
                    this.setState((prevState, props)=>({
                      selectVenueCategory: selected
                    }))
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField id="title" fullWidth label={(()=>{
                  try {
                    try {
                      return `${this.state.selectVenueCategory.label} in ${this.state.selectCity.label}`
                    } catch(e) {
                      return `Venues in ${this.state.selectCity.label}`
                    }
                  } catch(e) {
                    return 'Venue Name'
                  }
                })()} variant="outlined"/>
              </Grid>
            </Grid>
          ) : (
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={6}>
                <Select
                  inputId="city"
                  placeholder="Select City"
                  value={this.state.selectCity}
                  options={this.state.suggestions.city}
                  onChange={ selected => {
                    let { data } = this.state
                    data.city = selected.value
                    this.setState((prevState, props)=>({ 
                      data: data,
                      selectCity: selected
                    }))
                  }}
                />
              </Grid>
              
              <Grid item xs={6}>
                <Select
                  inputId="customVenueDetails/locality"
                  placeholder="Select Locality"
                  value={this.state.selectCustomLocality}
                  options={this.state.suggestions.locality}
                  onChange={ selected => {
                    let { data } = this.state
                    data.customVenueDetails.locality = selected.value
                    this.setState((prevState, props)=>({ 
                      data: data,
                      selectCustomLocality: selected
                    }))
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField id="title" fullWidth label="Venue Name" variant="outlined"/>
                <TextField id="address" fullWidth label="Address" variant="outlined" multiline margin="dense"/>
                <TextField id="" fullWidth label="Coordinates (map)" variant="outlined" multiline margin="dense"/>
              </Grid>
            </Grid>
          )
        }
      </Paper>
    )
  }
}

export default Venue