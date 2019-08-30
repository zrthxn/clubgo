import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Global.scss'

import Context from './ContextProvider'
import { ContextProvider } from './ContextProvider'

import Home from './views/Home/Home'

export default class WebsiteController extends Component {
  static contextType = Context

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
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
  }
}
