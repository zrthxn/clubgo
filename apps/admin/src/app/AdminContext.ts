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
    authenticateLogin: (data) => {},
    logout: (data) => {},
    getAdminUsername: () => String(),
    getAdminRole: () => String(),
    openSuccessFeedback: (message?:string) => {},
    closeSuccessFeedback: () => {},    
    openErrorFeedback: (message?:string, details?:string) => {},
    closeErrorFeedback: () => {}
  }
})

export default AdminContext