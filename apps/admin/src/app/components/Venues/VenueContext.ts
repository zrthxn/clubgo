import React from 'react'

export const VenueContext = React.createContext({
  state: {
    uiType: null,
    venueData: {
      
    }
  },
  actions: {
    openVenueEditor: (intent, data?) => {
      console.log()
    },
    openVenueListing: () => {
      console.log()
    }
  }
})