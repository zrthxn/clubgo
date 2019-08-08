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
      uiType: 'create'
    }))
  }

  openVenueEditor = (intent, data?) => {
    console.log('Venue Editor')
    this.setState((prevState, props)=>{
      if(data!==null)
        return {
          uiType: intent,
          venueData: data
        }
      else
        return {
          uiType: intent
        }
    })
  }

  openVenueListing = () => {
    console.log('Venue List')
    this.setState((prevState, props)=>({
      uiType: 'list'
    }))
  }

  render() {
    return (
      <VenueContext.Provider
        value={{
          state: this.state,
          actions: {
            openVenueEditor: this.openVenueEditor,
            openVenueListing: this.openVenueListing
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
