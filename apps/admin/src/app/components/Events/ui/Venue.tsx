import React, { Component, CSSProperties, HTMLAttributes } from 'react'
import { Grid, Paper, InputAdornment, MenuItem, Fab, IconButton } from '@material-ui/core'
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
  venueService = new DatabaseService('/venue')

  state = {
    loading: true,
    suggestions:{
      city: [ ],
      venueCategory: [ ],
      venue: [ ],
      locality: [ ]
    },
    selectCity: null,
    selectVenue: null,
    selectVenueCategory: null,
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
        let venue = this.props.data
        return {
          data: venue,
          loading: false,
          selectCity: { label: venue.city, value: venue.city },
          selectVenue: { label: venue.title, value: venue }
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

  assignVenue = (venue:IVenueModel) => {
    let { data } = this.state
                    
    this.setState(()=>{
      data.venueId = venue._id
      data.title = venue.venueTitle
      data.address = venue.address

      return {
        data,
        selectCity: { label: venue.city, value: venue.city },
        selectVenue: { label: venue.venueTitle, value: venue }
      }
    })
  }

  clearVenue = () => {
    this.setState(()=>{
      return {
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
            <Switch id="isCustomVenue" color="primary" 
              defaultChecked={this.state.data.isCustomVenue} onChange={this.handleChangeById}/>
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
                        return `Search ${this.state.selectVenueCategory.label} in ${this.state.selectCity.label}`
                      } catch(e) {
                        return `Search Venues in ${this.state.selectCity.label}`
                      }
                    } catch(e) {
                      return 'Search Venues'
                    }
                  })()}
                  backspaceRemovesValue={true}
                  value={this.state.selectVenue}
                  options={this.state.suggestions.venue}
                  onInputChange={(value, { action }) => {
                    if(action==="input-change" && value.length>3) {
                      let { selectCity, selectVenueCategory } = this.state
                      this.venueService.searchBy({
                        city: selectCity!==null ? selectCity.value : undefined,
                        categories: selectVenueCategory!==null ? selectVenueCategory.value : undefined,
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
                  onChange={({ value })=>{
                    this.assignVenue(value)
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

                      <IconButton className="float-right" onClick={this.clearVenue}>
                        <Delete/>
                      </IconButton>
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
                <TextField  id="customVenueDetails/locality" fullWidth label="Locality" style={{ margin: 0 }}
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.customVenueDetails.locality}/>
              </Grid>

              <Grid item xs={12}>
                <TextField id="title" fullWidth label="Venue Name" variant="outlined" 
                  onChange={this.handleChangeById} value={this.state.data.title}/>

                <TextField id="address" fullWidth multiline label="Address" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.address}/>

                <TextField id="customVenueDetails/coordinates" fullWidth multiline label="Coordinates (map)" 
                  variant="outlined" margin="dense"/>
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