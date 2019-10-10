import React from 'react'

export const AdminContext = React.createContext({
  state: {
    authenticated: false,
    admin: {
      role: null,
      username: null,
      name: null,
      email: null,
      profile: {
        avatar: null,
      }
    },

    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: { 
      message: 'Success',
      details: undefined
    }
  },
  actions: {
    authenticateLogin: (data) => {
      console.log()
    },
    logout: (data) => {
      console.log()
    },
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