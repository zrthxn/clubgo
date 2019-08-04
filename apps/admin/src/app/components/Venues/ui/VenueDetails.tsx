import React, { Component } from 'react'
import { Grid, Paper, Modal } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import Select from 'react-select'
import CreateableSelect from 'react-select/creatable'

import { handleChangeById as inputHandler } from '@clubgo/util'

export interface VenueDetailsProps {
  syncParentData: Function
}
export class VenueDetails extends Component<VenueDetailsProps> {
  state = {
    openMapModal: false,
    suggestions: {
      locality: [
        { label: 'Locality 1' },
        { label: 'Locality 2' },
        { label: 'Locality 3' }
      ].map(item=>({
        label: item.label, value: item.label
      })),
      category: [
        { label: 'EDM' },
        { label: 'Clubbing' },
        { label: 'Comedy' },
        { label: 'General' },
      ].map(item=>({
        label: item.label, value: item.label
      }))
    },
    selectCategory: null,
    selectLocality: null,
    data: {
      venueTitle: null,
      description: null,
      categories: [],
      locality: null,
      address: null,
      altAddress: null,
      nearestMetroStation: null,
      coordinates: {
        _lat: null,
        _lon: null
      },
      knownFor: [],
      cuisines: null,
      facilities: [],
      costForTwo: null,      
    },
    requiredFulfilled: false,
    required: [
      
    ],
    iterableMembers: []
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.props.syncParentData(this.state.data, 'root')
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    return (
      <Grid item container spacing={3}>
        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Venue</h3>

            <Grid item container spacing={3}>
              <Grid item xs={12}>
                <TextField id="venueTitle" required fullWidth label="Venue Name"
                  variant="outlined" onChange={this.handleChangeById}/>

                <TextField id="description" required multiline fullWidth label="Description" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}/>

                <Select
                  inputId="category"
                  placeholder="Category"
                  value={this.state.selectCategory}
                  options={this.state.suggestions.category}
                  isMulti
                  onChange={ selected => {
                    let { data } = this.state
                    data.categories = []
                    // if(typeof selected==='[object Object]')
                    for(let item of selected)
                      data.categories.push(item.value)
                    
                    this.setState((prevState, props)=>{
                      this.props.syncParentData(data, 'root')
                      return {
                        data,
                        selectCategory: selected
                      }
                    })
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <p>Location</p>

                <TextField id="address" required multiline fullWidth label="Address" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}/>

                <TextField id="altAddress" multiline fullWidth label="Alternate Address" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}/>

                <Select
                  inputId="locality"
                  placeholder="Locality"
                  value={this.state.selectLocality}
                  options={this.state.suggestions.locality}
                  onChange={ selected => {
                    let { data } = this.state
                    data.locality = selected.value
                    this.setState((prevState, props)=>{
                      this.props.syncParentData(data, 'root')
                      return {
                        data,
                        selectLocality: selected
                      }
                    })
                  }}
                />

                <TextField id="nearestMetroStation" fullWidth label="Nearest Metro Station" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}/>
              </Grid>

              <Grid item xs={12}>
                <span>Venue Coordinates</span>
                <Button variant="contained" color="primary" style={{ margin: '1em' }}
                  onClick={()=>{
                    this.setState({
                      openMapModal: true
                    })
                  }}
                >
                  Open Map
                </Button>

                <Modal open={false}>
                  <div></div>
                </Modal>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">About</h3>

            <TextField id="cuisines" fullWidth label="Cuisines" 
              variant="outlined" margin="dense" onChange={this.handleChangeById}/>

            <Grid item container spacing={3}>
              <Grid item xs={12}>                
                <div style={{ padding: '0.5em 0' }}>
                  <CreateableSelect
                    isMulti
                    isClearable
                    placeholder="Known For"
                    onChange={(value:any) => {
                      let { knownFor } = this.state.data, { data } = this.state
                      knownFor = [ ...value ]
                      data.knownFor = knownFor
                      this.setState((prevState, props)=>{
                        this.props.syncParentData(data, 'root')
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
                    onChange={(value:any) => {
                      let { facilities } = this.state.data, { data } = this.state
                      facilities = [ ...value ]
                      data.facilities = facilities
                      this.setState((prevState, props)=>{
                        this.props.syncParentData(data, 'root')
                        return {
                          data
                        }
                      })
                    }}
                  />
                </div>
                
                <TextField id="costForTwo" fullWidth label="Cost For Two (&#x20B9;)" 
                  variant="outlined" margin="dense" onChange={this.handleChangeById}/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default VenueDetails