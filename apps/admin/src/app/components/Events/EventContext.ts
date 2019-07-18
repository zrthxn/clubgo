import React from 'react'

export const EventContext = React.createContext({
  state: {
    uiType: null,
    eventData: {}
  },
  actions: {
    createEvent: () => {
      console.log()
    },
    listEvents: () => {
      console.log()
    },
    editEvent: (eventData) => {
      console.log(eventData)
    },    
    deleteEvent: (_id) => {
      console.log(_id)
    },
  }
})

export default EventContext
