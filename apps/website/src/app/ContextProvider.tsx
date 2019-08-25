import React, { Component } from 'react'

var _iactions = Object()

// Initial State
const _istate = {
  
}

export class ContextProvider extends Component {
  state = _istate

  constructor(props) {
    super(props)

    // Register new actions here
    _iactions = {
      
    }
  }

  componentDidMount() {
    
  }  

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: _iactions
        }}
      >
        {
          this.props.children
        }
      </Context.Provider>
    )
  }
}

export const Context = React.createContext({
  state: _istate,
  actions: (()=>{
    new ContextProvider({})
    return _iactions
  })()
})

export default Context
