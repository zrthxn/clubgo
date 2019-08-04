import React, { Component } from 'react'

import { ClubGo } from './ClubGo'
import { AppContext } from './AppContext'

export default class AppContextProvider extends ClubGo {
  state = {

  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: {
            
          }
        }}
      >
        {
          this.props.children
        }
      </AppContext.Provider>
    )
  }
}
