import React, { Component, CSSProperties, HTMLAttributes } from 'react'
import { Grid, Paper, InputAdornment, MenuItem, Fab, IconButton } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, Chip } from '@material-ui/core'
import Select from 'react-select'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { DatabaseService } from '@clubgo/api'
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
      cities: [ ],
      venueCategory: [ ],
      venue: [ ]
    },
    selectCity: null,
    selectVenue: null,
    selectVenueCategory: null,
    synchronized: false,
    data: {
      city: String(),
      venueId: String(),
      title: String(),
      locality: String(), 
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
    this.fetchCities()
    this.fetchVenueCategories()
  }

  locationService = new DatabaseService('/location')
  categoryService = new DatabaseService('/category')

  fetchCities = async () => {
    let { data } = await this.locationService.list()
    let { suggestions } = this.state
    suggestions.cities = data.results
    this.setState({
      suggestions
    })
    return
  }

  fetchVenueCategories = async () => {
    let { data } = await this.categoryService.list()
    let { suggestions } = this.state
    data = data.results.filter((cat)=>cat.categoryType==='venue')
    suggestions.venueCategory = data
    this.setState({
      suggestions
    })
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        let { data } = this.state
        for (const key in this.props.data)
          if (data.hasOwnProperty(key))
            data[key] = this.props.data[key]
        let venue = this.props.data
        return {
          data,
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
      data.locality = venue.locality
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
                  inputId="venue.city"
                  placeholder="Select City"
                  value={this.state.selectCity}
                  options={this.state.suggestions.cities.map((item, index)=>({
                    label: item.city, value: item
                  }))}
                  onChange={ selected => {
                    let { selectVenueCategory, data } = this.state
                    data.city = selected.value.city

                    this.venueService.searchBy({
                      city: selected!==null ? selected.value.city : undefined,
                      categories: selectVenueCategory!==null ? selectVenueCategory.value : undefined
                    }).then((response)=>{
                      let apiResponse = response.data
                      
                      if (apiResponse.results.length!==0) {
                        let { suggestions } = this.state
                        suggestions.venue = apiResponse.results.map((item:IVenueModel)=>({
                          label: item.venueTitle, value: item
                        }))
                  
                        this.setState({
                          suggestions,
                          data: data,
                          selectCity: selected
                        })
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Select
                  inputId="venue.venueCategory"
                  placeholder="Venue Catgory"
                  value={this.state.selectVenueCategory}
                  options={this.state.suggestions.venueCategory.map((cat)=>({
                    label: cat.name, value: cat.name.toLowerCase()
                  }))}
                  onChange={ selected => {
                    let { selectCity, data } = this.state
                    data.city = selected.value

                    this.venueService.searchBy({
                      city: selectCity!==null ? selectCity.value.city : undefined,
                      categories: selected!==null ? selected.value : undefined
                    }).then((response)=>{
                      let apiResponse = response.data
                      
                      if (apiResponse.results.length!==0) {
                        let { suggestions } = this.state
                        suggestions.venue = apiResponse.results.map((item:IVenueModel)=>({
                          label: item.venueTitle, value: item
                        }))
                  
                        this.setState({
                          suggestions,
                          data: data,
                          selectVenueCategory: selected
                        })
                      }
                    })
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
                  // onInputChange={(value, { action }) => {
                  //   if(action==="input-change" && value.length>3) {
                  //     let { selectCity, selectVenueCategory } = this.state
                  //     this.venueService.searchBy({
                  //       city: selectCity!==null ? selectCity.value.city : undefined,
                  //       categories: selectVenueCategory!==null ? selectVenueCategory.value : undefined,
                  //       $text: {
                  //         $search: value
                  //       }
                  //     }).then((response)=>{
                  //       let apiResponse = response.data
                        
                  //       if (apiResponse.results.length!==0) {
                  //         let { suggestions } = this.state
                  //         suggestions.venue = apiResponse.results.map((item:IVenueModel)=>({
                  //           label: item.venueTitle, value: item
                  //         }))
                    
                  //         this.setState({
                  //           suggestions
                  //         })
                  //       }
                  //     }) 
                  //   }
                  // }}
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
                  inputId="venue.city"
                  placeholder="Select City"
                  value={this.state.selectCity}
                  options={this.state.suggestions.cities.map((item, index)=>({
                    label: item.city, value: item
                  }))}
                  onChange={ selected => {
                    let { data } = this.state
                    data.city = selected.value.city
                    this.setState((prevState, props)=>({ 
                      data: data,
                      selectCity: selected
                    }))
                  }}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TextField  id="venue.customVenueDetails/locality" fullWidth label="Locality"
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.customVenueDetails.locality}/>
              </Grid>

              <Grid item xs={12}>
                <TextField id="venue.title" fullWidth label="Venue Name" variant="outlined" 
                  onChange={this.handleChangeById} value={this.state.data.title}/>

                <TextField id="venue.address" fullWidth multiline label="Address" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.address}/>

                <TextField id="venue.customVenueDetails/coordinates" fullWidth multiline label="Coordinates (map)" 
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