import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { IEventModel } from '@clubgo/database'

// Initial State
const _istate = {
  
}

var _iactions = Object()

export class LoginContextProvider extends Component {
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
      <Route render={({ history })=>{
        return (
          <LoginContext.Provider
            value={{
              state: this.state,
              actions: _iactions
            }}
          >
            {
              this.props.children
            }
          </LoginContext.Provider>
        )
      }}/>
    )
  }
}

export const LoginContext = React.createContext({
  state: _istate,
  actions: (()=>{
    const _Context = new LoginContextProvider({})
    return _iactions
  })()
})

export default LoginContext
