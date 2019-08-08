import React from 'react'

export const VenueContext = React.createContext({
  state: {
    uiType: null,
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: 'Success',
    venueData: {
      
    }
  },
  actions: {
    openVenueEditor: (intent, data?) => {
      console.log()
    },
    openVenueListing: () => {
      console.log()
    },
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