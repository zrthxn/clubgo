import React, { Component } from 'react'
import { VenueContext } from './VenueContext'
import { VenueController } from './VenueController'
import { VenueService } from '@clubgo/features/api'

export class VenueContextProvider extends VenueController {
  static contextType = VenueContext
  venueService = new VenueService('admin')

  state = {
    uiType: null,
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: {
      message: 'Success',
      details: undefined
    },
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

  openVenueEditor = (uiType:string, data?:object) => {
    console.log('Venue Editor')
    this.setState((prevState, props)=>{
      if(data!==null)
        return {
          uiType: uiType,
          venueData: data
        }
      else
        return {
          uiType: uiType
        }
    })
  }

  openVenueListing = () => {
    console.log('Venue List')
    this.setState({
      uiType: 'list',
      venueData: {

      }
    })
  }
  
  // ------------------------------------------------------------------------
  create = async (venueData, publish?:boolean) => {
    if(publish)
      venueData.settings.isPublished = true

    try {
      return await this.venueService.createVenue(venueData)
    } catch(e) {
      return Promise.reject(e)
    }
  }

  list = async () => {
    return await this.venueService.listVenues()
  }

  update = async (id:string, updateBody, publish?:boolean) => {
    return await this.venueService.updateVenue(id, updateBody)
  }

  delete = async (id) => {
    return await this.venueService.deleteVenue(id)
  }

  // ------------------------------------------------------------------------
  openSuccessFeedback = (message?:string) => {
    this.setState((prevState, props)=>{
      if(message!==null)
        return {
          openSuccessFeedback: true,
          feedbackMessage: { message }
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

  openErrorFeedback = (message?:string, details?:string) => {
    this.setState((prevState, props)=>{
      if(message!==null)
        return {
          openErrorFeedback: true,
          feedbackMessage: { message, details }
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

            create: this.create,
            list: this.list,
            update: this.update,
            delete: this.delete,

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
