import React, { Component } from 'react'
import { AdminContext } from './AdminContext'

export class AdminContextProvider extends Component {
  state = {
    authenticated: false,

    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: {
      message: 'Success',
      details: undefined
    }
  }

  readonly role = null

  constructor(props) {
    super(props)
    
    if(process.env.NODE_ENV!=='production') {
      this.state.authenticated = true
    }
  }

  authenticateLogin = (data) => {
    this.setState({
      authenticated: true
    })
  }

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
      <AdminContext.Provider
        value={{
          state: this.state,
          actions: {
            openSuccessFeedback: this.openSuccessFeedback,
            closeSuccessFeedback: this.closeSuccessFeedback,
            
            openErrorFeedback: this.openErrorFeedback,
            closeErrorFeedback: this.closeErrorFeedback,

            authenticateLogin: this.authenticateLogin
          }
        }}
      >
        {
          this.props.children
        }
      </AdminContext.Provider>
    )
  }
}

export default AdminContextProvider