import React, { Component } from 'react'
import { Grid, Paper, Modal } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import Select from 'react-select'
import CreateableSelect from 'react-select/creatable'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { DatabaseService } from '@clubgo/api'
import { Map } from '@clubgo/components'

export interface VenueDetailsProps {
  syncParentData?: Function,
  syncData?: boolean,
  populate?: boolean,
  data?: any
}
export class VenueDetails extends Component<VenueDetailsProps> {
  state = {
    loading: true,
    openMapModal: false,
    selectCategories: [],
    selectCity: undefined,
    selectLocality: undefined,
    suggestions: {
      cities: [],
      category: [
        { label: 'Nightclubs' },
        { label: 'Clubs and Bars' }
      ]
    },
    synchronized: false,
    data: {
      venueTitle: undefined,
      description: undefined,
      categories: [],
      city: undefined,
      locality: undefined,
      address: undefined,
      altAddress: undefined,
      nearestMetroStation: undefined,
      coordinates: {
        _lat: 0,
        _lon: 0
      },
      knownFor: [],
      cuisines: undefined,
      facilities: [],
      costForTwo: undefined,      
    }
  }

  locationService = new DatabaseService('/location')

  constructor(props) {
    super(props)
  } 

  fetchCities = async () => {
    let { data } = await this.locationService.list()
    let { suggestions } = this.state
    suggestions.cities = data.results
    this.setState({
      suggestions
    })
    return
  }

  componentDidMount() {
    this.fetchCities()
    
    this.setState(()=>{
      if(this.props.populate) {
        let { selectCategories } = this.state
        this.props.data.categories.forEach(cat => selectCategories.push({
          label: cat, value: cat
        }))

        return {
          selectCategories,
          selectLocality: { 
            label: this.props.data.locality,
            value: this.props.data.locality
          },
          selectCity: { 
            label: this.props.data.city,
            value: {
              city: this.props.data.city,
              localities: []
            }
          },
    
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
        this.props.syncParentData(this.state.data, 'root')
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
    if(!this.state.loading) return (
      <Grid item container spacing={3}>
        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Venue</h3>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <TextField id="venueTitle" required fullWidth label="Venue Name"
                  variant="outlined" onChange={this.handleChangeById}
                  value={this.state.data.venueTitle}
                />

                <TextField id="description" required multiline fullWidth label="Description" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.description}
                />

                <Select
                  inputId="category"
                  placeholder="Category"
                  value={this.state.selectCategories}
                  options={this.state.suggestions.category.map(item=>({
                    label: item.label, value: item.label
                  }))}
                  isMulti
                  onChange={ selected => {
                    let { data } = this.state
                    data.categories = []
                    for(let item of selected)
                      data.categories.push(item.value)
                    
                    this.setState((prevState, props)=>{
                      return {
                        data,
                        selectCategories: selected
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <p><b>Location</b></p>
              </Grid>

              <Grid item xs={6}>
                <Select
                  inputId="city"
                  placeholder="City"
                  value={this.state.selectCity}
                  options={this.state.suggestions.cities.map((item)=>({ 
                    label: item.city, value: item 
                  }))}
                  onChange={ selected => {
                    let { data } = this.state
                    data.city = selected.value.city
                    this.setState((prevState, props)=>{
                      return {
                        data,
                        selectCity: selected,
                        selectLocality: null
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Select
                  inputId="locality"
                  placeholder="Locality"
                  value={this.state.selectLocality}
                  options={
                    this.state.selectCity!==undefined ? (
                      this.state.selectCity.value.localities.map((item)=>({ 
                        label: item.name, value: item 
                      }))
                    ) : []
                  }
                  onChange={ selected => {
                    let { data } = this.state
                    data.locality = selected.value.name
                    this.setState((prevState, props)=>{
                      return {
                        data,
                        selectLocality: selected
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField id="address" required multiline fullWidth label="Address" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.address}
                />

                <TextField id="altAddress" multiline fullWidth label="Alternate Address" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.altAddress}
                />

                <TextField id="nearestMetroStation" fullWidth label="Nearest Metro Station" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.nearestMetroStation}
                />
              </Grid>

              <Grid item xs={12}>
                <Map/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">About</h3>

            <TextField id="cuisines" fullWidth label="Cuisines" 
              variant="outlined" margin="dense" onChange={this.handleChangeById}
              value={this.state.data.cuisines}
            />

            <Grid item container spacing={3}>
              <Grid item xs={12}>                
                <div style={{ padding: '0.5em 0' }}>
                  <CreateableSelect
                    isMulti
                    isClearable
                    placeholder="Known For"
                    value={(()=>{
                      let setKnown = []
                      for (const known of this.state.data.knownFor) {
                        setKnown.push({
                          label: known
                        })
                      }
                      return setKnown
                    })()}
                    onChange={(values:any) => {
                      let labels = []
                      for(let { label } of values)
                        labels.push(label)

                      let { data } = this.state
                      data.knownFor = labels
                      this.setState((prevState, props)=>{
                        return {
                          data
                        }
                      })
                    }}
                  />
                </div>

                <div style={{ padding: '0.5em 0' }}>
                  <CreateableSelect
                    isMulti
                    isClearable
                    placeholder="Facilities"
                    options={[
                      { label: 'Wheelchair Accessible' },
                      { label: 'Free WiFi' },
                      { label: 'Outdoor Seating' }
                    ].map(item=>({
                      label: item.label, value: item.label
                    }))}
                    value={(()=>{
                      let setFacilities = []
                      for (const fac of this.state.data.facilities) {
                        setFacilities.push({
                          label: fac
                        })
                      }
                      return setFacilities
                    })()}
                    onChange={(values:any) => {
                      let labels = []
                      for(let { label } of values)
                        labels.push(label)

                      let { data } = this.state
                      data.facilities = labels
                      this.setState((prevState, props)=>{
                        return {
                          data
                        }
                      })
                    }}
                  />
                </div>
                
                <TextField id="costForTwo" fullWidth label="Cost For Two (&#x20B9;)" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}
                  value={this.state.data.costForTwo}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
    else return (
      <h3>Loading...</h3>
    )
  }
}

export default VenueDetails