import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import './Admin.scss'

import LoginPage from './pages/LoginPage'
import AdminPanel from './pages/AdminPanel'

export class Admin extends Component {
  state = {
    authenticated: false
  }

  onExecute = () => {
    this.setState({
      authenticated: true
    })
  }

  onAuthenticate = () => {
    return (
      <AdminPanel />
    )
  }

  render() {
    return (
      <div className="admin-root">
        {
          this.state.authenticated ? (
            this.onAuthenticate()
          ) : (
            <LoginPage loginHandler={ this.onExecute } />
          )
        }
      </div>
    )
  }
}

export default Admin