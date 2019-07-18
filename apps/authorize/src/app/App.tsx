import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.scss'

import NoAuth from './pages/NoAuth'
import Authorize from './pages/Authorize'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path={'/'} component={ NoAuth } />
            <Route path={'/authorize'} component={ Authorize } />
          </Switch>
        </Router>
      </div>
    )
  }
}
