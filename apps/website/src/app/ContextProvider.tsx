import React, { Component } from 'react'

import WebsiteController from './Website'
import { Context } from './Context'

export default class ContextProvider extends WebsiteController {
  state = {

  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: {
            
          }
        }}
      >
        {
          this.props.children
        }
      </Context.Provider>
    )
  }
}
