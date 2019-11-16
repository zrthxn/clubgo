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
    
    let { contextState } = this.state
    contextState.loading = false
    this.setState({ 
      contextState 
    })
  }
  
  async fetchCategories() {
    const categoryService = new DatabaseService('/category')
    let { contextStore } = this.state
    try {
      let { data } = await categoryService.list()
      contextStore.categories = data.results
      this.setState({ 
        contextStore 
      })
    } catch (error) {
      
    } finally {
      return
    }
  }

  async fetchLocations() {
    const locationService = new DatabaseService('/location')
    let { contextStore } = this.state
    try {
      let { data } = await locationService.list()
      contextStore.locations = data.results
      this.setState({ 
        contextStore 
      })
    } catch (error) {
      
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
