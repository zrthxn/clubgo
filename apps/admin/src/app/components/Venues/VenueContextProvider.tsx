import React, { Component } from 'react'
import { VenueContext } from './VenueContext'
import { VenueController } from './VenueController'

export class VenueContextProvider extends VenueController {
  state = {
    uiType: null,
    venueData: {
      
    }
  }

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.setState((prevState, props)=>({
      uiType: 'list'
    }))
  }

  createVenue = () => {
    console.log('Venue Create')
    this.setState((prevState, props)=>({
      uiType: 'create'
    }))
  }

  listVenue = () => {
    console.log('Venue List')
    this.setState((prevState, props)=>({
      uiType: 'list'
    }))
  }
  
  editVenue = (venueData) => {
    console.log('Venue Edit')
    this.setState((prevState, props)=>({
      uiType: 'edit',
      venueData: venueData
    }))
  }
  
  deleteVenue = (_id) => {
    console.log('Venue Delete')
    // this.setState((prevState, props)=>({
    //   uiType: 'delete'
    // }))
  }

  render() {
    return (
      <VenueContext.Provider
        value={{
          state: this.state,
          actions: {
            createVenue: this.createVenue,
            listVenue: this.listVenue,
            editVenue: this.editVenue,
            deleteVenue: this.deleteVenue
          }
        }}
      >
        {
          this.props.children
        }
      </VenueContext.Provider>
    )
  }
}

export default VenueContextProvider
