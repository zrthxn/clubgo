import React, { Component } from 'react'
import { EventContext } from './EventContext'
import { EventController } from './EventController'

export class EventContextProvider extends EventController {
  static contextType = EventContext

  state = {
    uiType: null,
    openSuccessFeedback: false,
    openErrorFeedback: false,
    feedbackMessage: {
      message: 'Success',
      details: undefined
    },
    eventData: {

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

  openEventEditor = (intent:'create'|'edit', data?) => {
    console.log('Event Editor')
    this.setState((prevState, props)=>{
      if(data!==null)
        return {
          uiType: intent,
          eventData: data
        }
      else
        return {
          uiType: intent
        }
    })
  }

  openEventListing = () => {
    console.log('Event List')
    this.setState((prevState, props)=>({
      uiType: 'list'
    }))
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
      <EventContext.Provider
        value={{
          state: this.state,
          actions: {
            openEventEditor: this.openEventEditor,
            openEventListing: this.openEventListing,

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
      </EventContext.Provider>
    )
  }
}

export default EventContextProvider
