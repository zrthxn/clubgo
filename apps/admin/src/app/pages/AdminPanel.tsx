import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Alert } from 'reactstrap'

import '../../assets/scss/AdminPanel.scss'

// import { version } from '@club';

const version = '0.1.0'

import { Dashboard } from '../sections/Dashboard/Dashboard'
import { Events } from '../sections/Events/Events'
import { Venues } from '../sections/Venues/Venues'
import { Tickets } from '../sections/Ticket/Tickets'

export class AdminPanel extends Component {
  render() {
    return (
      <div id="admin-panel-root">
        <section id="panel">          
          <Router>
            <input type="checkbox" id="sidebar-toggle" hidden/>

            <div id="sidebar">
              <div className="title">
                <h3>ClubGo</h3>
                <h4>Admin</h4>
                <p id="version">Version { version }</p>
                <hr/>
              </div>

              <Link to="/dashboard"> Dashboard </Link>
              <Link to="/events"> Events </Link>
              <Link to="/venues"> Venues </Link>
              <Link to="/tickets"> Tickets </Link>
            </div>

            <div id="section-root">
              
              <Navbar dark color="primary" expand="md">
                <Nav className="ml-1">
                  <NavItem>
                    <label htmlFor="sidebar-toggle" className="hamburger"><span></span></label>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  <NavItem>User</NavItem>         
                </Nav>
              </Navbar>

              <section id="content" className="container">
                <Switch>
                  <Route exact path="/" component={ Dashboard } />
                  <Route path="/dashboard" component={ Dashboard } />
                  <Route path="/events" component={ Events } />
                  <Route path="/venues" component={ Venues } />
                  <Route path="/tickets" component={ Tickets } />
                </Switch>
              </section>
            </div>
          </Router>
        </section>
      </div>
    )
  }
}

export default AdminPanel