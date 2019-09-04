import React, { Component, CSSProperties, HTMLAttributes } from 'react'
import { Grid, Paper, InputAdornment, MenuItem, Fab } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, Chip } from '@material-ui/core'
import Select from 'react-select'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { DatabaseService } from '@clubgo/features/api'
import { IVenueModel } from '@clubgo/database'
import { Delete } from '@material-ui/icons'

export interface VenueProps {
  syncParentData?: Function,
  syncData?: boolean,
  populate?: boolean,
  data?: any
}
export class Venue extends Component<VenueProps> {
  searchService = new DatabaseService('/venue')

  state = {
    loading: true,
    suggestions:{
      city: [ ],
      venueCategory: [ ],
      venue: [ ],
      locality: [ ]
    },
    selectCity: undefined,
    selectVenue: undefined,
    selectVenueCategory: undefined,
    selectCustomLocality: undefined,
    synchronized: false,
    data: {
      city: String(),
      venueId: String(),
      title: String(),
      address: String(),
      isCustomVenue: false,
      customVenueDetails: {
        locality: String(),
        coordinates: {
          _lat: Number(),
          _lon: Number()
        }
      }
    }
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

    this.state.suggestions = suggestions
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
        this.props.syncParentData(this.state.data, 'venue')
        this.setState({
          synchronized: this.props.syncData
        })
      }        
    }
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState)=>(
      result
    ))
  }

  clearVenue = () => {
    this.setState(()=>{
      return {
        loading: true,
        selectCity: null,
        selectVenue: null,
        selectVenueCategory: null,
        selectCustomLocality: null,
        synchronized: false,
        data: {
          city: String(),
          venueId: String(),
          title: String(),
          address: String(),
          isCustomVenue: false,
          customVenueDetails: {
            locality: String(),
            coordinates: {
              _lat: Number(),
              _lon: Number()
            }
          }
        }
      }
    })
  }

  render() {
    // Venue Details Section  ----------------------------------------------  Venue Details Section
    // ============================================================================================
    if(!this.state.loading) return (
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
                <Select
                  inputId="searchVenue"
                  style={{ padding: '2em' }}
                  placeholder={(()=>{
                    try {
                      try {
                        return `${this.state.selectVenueCategory.label} in ${this.state.selectCity.label}`
                      } catch(e) {
                        return `Venues in ${this.state.selectCity.label}`
                      }
                    } catch(e) {
                      return 'Venue Name'
                    }
                  })()}
                  backspaceRemovesValue={true}
                  value={this.state.selectVenue}
                  options={this.state.suggestions.venue}
                  onInputChange={(value, { action }) => {
                    if(action==="input-change" && value.length>3) {
                      this.searchService.searchBy({
                        city: this.state.selectCity!==undefined ? 
                          this.state.selectCity.value : undefined,
                        categories: this.state.selectVenueCategory!==undefined ? 
                          this.state.selectVenueCategory.value : undefined,
                        $text: {
                          $search: value
                        }
                      }).then((response)=>{
                        let apiResponse = response.data
                        
                        if (apiResponse.results.length!==0) {
                          let { suggestions } = this.state
                          suggestions.venue = apiResponse.results.map((item:IVenueModel)=>({
                            label: item.venueTitle, value: item
                          }))
                    
                          this.setState({
                            suggestions
                          })
                        }
                      }) 
                    }
                  }}
                  onChange={({ value }:{ value:IVenueModel })=>{
                    let { data } = this.state
                    
                    data.venueId = value._id
                    data.title = value.venueTitle
                    data.address = value.address

                    this.setState({
                      data,
                      selectVenue: {
                        label: value.venueTitle, value: value
                      }
                    })
                  }}
                />

                {
                  this.state.data.venueId!==String() ? (
                    <div
                      className="clearfix"
                      style={{
                        padding: '1em',
                        margin: '1em',
                        border: '1.5px solid #1c1c1c40',
                        borderRadius: '10px'
                      }}
                    >
                      <div className="float-left">
                        <h3>{ this.state.data.title }</h3>
                        <p>{ this.state.data.address }</p>
                      </div>

                      <Fab className="float-right"
                        onClick={this.clearVenue}
                      >
                        <Delete/>
                      </Fab>
                    </div>
                  ) : (
                    null
                  )
                }
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
    else return (
      <h3>Loading...</h3>
    )
  }
}

export default Venue