import React, { Component } from 'react'
import { VenueContext } from './VenueContext'
import { VenueController } from './VenueController'

export class VenueContextProvider extends VenueController {
  state = {
    uiType: null,
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: 'Success',
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

  openSuccessFeedback = (message?:string) => {
    this.setState((prevState, props)=>{
      if(message!==null)
        return {
          openSuccessFeedback: true,
          feedbackMessage: message
        }
      else
        return {
          openSuccessFeedback: true
        }
    })
  }

  closeSuccessFeedback = () => {
    this.setState((prevState, props)=>({
      openSuccessFeedback: false
    }))
  }

  openErrorFeedback = (message?:string) => {
    this.setState((prevState, props)=>{
      if(message!==null)
        return {
          openErrorFeedback: true,
          feedbackMessage: message
        }
      else
        return {
          openErrorFeedback: true
        }
    })
  }

  closeErrorFeedback = () => {
    this.setState((prevState, props)=>({
      openErrorFeedback: false
    }))
  }

  render() {
    return (
      <VenueContext.Provider
        value={{
          state: this.state,
          actions: {
            openVenueEditor: this.openVenueEditor,
            openVenueListing: this.openVenueListing,

            openSuccessFeedback: this.openSuccessFeedback,
            closeSuccessFeedback: this.closeSuccessFeedback,
            
            openErrorFeedback: this.openErrorFeedback,
            closeErrorFeedback: this.closeErrorFeedback
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
