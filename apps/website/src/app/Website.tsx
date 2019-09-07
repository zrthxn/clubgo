import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Global.scss'

import { LoginService } from '@clubgo/features/api'
import Context from './ContextProvider'
import { ContextProvider } from './ContextProvider'

import Home from './views/Home/Home'

export default class WebsiteController extends Component {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  state = {
    appValidationFinished: false
  }

  componentDidMount() {
    this.validateApplication()    
  }

  async validateApplication() {
    const appAuthentication = new LoginService('auth')
    try {
      await appAuthentication.authenticate()
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        appValidationFinished: true
      })
    }
  }

  render() {
    if(this.state.appValidationFinished)
      return (
        <ContextProvider>
          <Context.Consumer>
            {
              appContext => (
                <Router>
                  <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/:whatever" render={(routeProps)=>(
                      <Home { ...routeProps }/>
                    )}/>
                  </Switch>
                </Router>
              )
            }
          </Context.Consumer>
        </ContextProvider>
      )
    else
      return (
        <div style={{
          height: '100vh',
          padding: '4em',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 style={{ 
            textAlign: 'center',
            margin: 'auto'
          }}>
            Loading...
          </h1>
        </div>
      )
  }
}
