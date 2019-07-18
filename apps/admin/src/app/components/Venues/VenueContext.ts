import React from 'react'

export const VenueContext = React.createContext({
  state: {
    uiType: null,
    venueData: {
      
    }
  },
  actions: {
    createVenue: () => {
      console.log()
    },
    listVenue: () => {
      console.log()
    },
    editVenue: (venueData) => {
      console.log()
    },
    deleteVenue: (_id) => {
      console.log()
    }
  }
})