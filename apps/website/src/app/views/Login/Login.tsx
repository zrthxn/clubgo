import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import QueryString from 'query-string'

import { Details } from '../Bookings/ui/Details'
import RootContext from '../../RootContext'

export default class LoginManager extends Component<RouteComponentProps> {
  static contextType = RootContext
  context!: React.Context<typeof RootContext>

  state = {
    intent: null,
    returnURL: null
  }

  componentDidMount() {
    let queryParams = QueryString.parse(this.props.location.search)
    if(queryParams.utm_source!==null && queryParams.utm_source!==undefined) {
      if(queryParams.utm_source==='bookings')
        this.setState({
          intent: queryParams.intent, 
          returnURL: queryParams.return
        })
    }
  }  

  render() {
    if(this.state.intent==='basic')
      return (
        <RootContext.Consumer>
          {
            appContext => (
              <Details onComplete={()=>{
                appContext.router(this.state.returnURL)
              }}/>
            )
          }
        </RootContext.Consumer>
      )
    else
      return (
        <div>LOGIN</div>
      )
  }
}
