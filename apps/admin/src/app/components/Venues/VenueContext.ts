import React from 'react'

export const VenueContext = React.createContext({
  state: {
    uiType: null,
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: { 
      message: 'Success',
      details: undefined
    },
    venueData: {
      
    }
  },
  actions: {
    openVenueEditor: (uiType:string, data?) => {
      console.log('Venue Editor')
    },
    openVenueListing: () => {
      console.log('Venue List')
    },
    // ------------------------------------------------------------------------
    create: (venueData, publish?:boolean) => {

    },
    list: () => {

    },
    update: (id:string, updateBody, publish?:boolean) => {
      
    },
    delete: (id:string) => {
  
    },
    // ------------------------------------------------------------------------
    openSuccessFeedback: (message?:string) => {
      console.log()
    },
    closeSuccessFeedback: () => {
      console.log()
    },    
    openErrorFeedback: (message?:string) => {
      console.log()
    },
    closeErrorFeedback: () => {
      console.log()
    }
  }
})