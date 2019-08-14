import React from 'react'

export const EventContext = React.createContext({
  state: {
    uiType: null,
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: { 
      message: 'Success', 
      details: undefined
    },
    eventData: {
      
    }
  },
  actions: {
    openEventEditor: (intent, data?) => {
      console.log()
    },
    openEventListing: () => {
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

export default EventContext
