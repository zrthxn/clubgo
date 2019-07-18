import React, { Component } from 'react'
import { EventContext } from './EventContext'
import { EventController } from './EventController'

export class EventContextProvider extends EventController {
  state = {
    uiType: null,
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

  createEvent = () => {
    console.log('Event Creation')
    this.setState((prevState, props)=>({
      uiType: 'create'
    }))
  }

  listEvents = () => {
    console.log('Event Listing')
    this.setState((prevState, props)=>({
      uiType: 'list'
    }))
  }

  editEvent = (eventData) => {
    console.log('Event Editing')
    this.setState((prevState, props)=>({
      uiType: 'edit',
      eventData: eventData
    }))
  }

  deleteEvent = (_id) => {
    console.log('Event Delete')
    // this.setState((prevState, props)=>({
    //   uiType: 'delete'
    // }))
  }

  render() {
    return (
      <EventContext.Provider
        value={{
          state: this.state,
          actions: {
            createEvent: this.createEvent,
            listEvents: this.listEvents,
            editEvent: this.editEvent,
            deleteEvent: this.deleteEvent
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
