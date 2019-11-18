import React, { Component, useState, useContext, ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import { DatabaseService } from '@clubgo/api'
import ContextStore from './ContextStore'

var _istate = {
  loading: true  
}

var _iaction = Object()

export class ContextProvider extends Component<ContextProps> {
  state = {
    contextState: _istate,
    contextStore: ContextStore
  }

  componentDidMount() {
    this.fetchCategories()
    this.fetchLocations()
    
    this.setContextState({ 
      loading: false
    })
  }

  setContextState(payload:object, callback?: (() => void) | undefined) {
    let { contextState } = this.state
    for (const key in payload)
      if (payload.hasOwnProperty(key))
        contextState[key] = payload[key]
    this.setState({ contextState }, callback)
  }

  updateStore(payload:object, callback?: (() => void) | undefined) {
    let { contextStore } = this.state
    for (const key in payload)
      if (payload.hasOwnProperty(key))
        contextStore[key] = payload[key]
    this.setState({ contextStore }, callback)
  }

  async fetchCategories() {
    const categoryService = new DatabaseService('/category')
    try {
      let { data } = await categoryService.list()
      this.updateStore({
        categories: data.results
      })
    } catch (error) {
      console.error(error)
    } finally {
      return
    }
  }

  async fetchLocations() {
    const locationService = new DatabaseService('/location')
    try {
      let { data } = await locationService.list()
      this.updateStore({
        locations: data.results
      })
    } catch (error) {
      console.error(error)
    } finally {
      return
    }
  }

  render() {
    return (
      <Route render={({ history })=>{
        return (
          <Context.Provider
            value={{
              state: this.state.contextState,
              actions: _iaction,
              store: this.state.contextStore,
              router: (path) => {
                window.scrollTo({ top: window.screenTop })
                history.push(path)
              }
            }}
          >
            {
              this.props.children
            }
          </Context.Provider>
        )
      }}/>
    )
  }
}

export const Context = React.createContext({
  state: _istate,
  actions: _iaction,
  store: ContextStore,
  router: Function(),
})

export interface ContextProps {
  ContextStore?: typeof ContextStore
  children?: ReactElement | ReactElement[]
}

export default Context
