import React from 'react'

export const AdminContext = React.createContext({
  state: {
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: { 
      message: 'Success',
      details: undefined
    }
  },
  actions: {
    openSuccessFeedback: (message?:string) => {
      console.log()
    },
    closeSuccessFeedback: () => {
      console.log()
    },    
    openErrorFeedback: (message?:string, details?:string) => {
      console.log()
    },
    closeErrorFeedback: () => {
      console.log()
    }
  }
})