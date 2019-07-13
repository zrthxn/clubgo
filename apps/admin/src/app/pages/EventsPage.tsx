import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import { CreateEvent } from '../components/CreateEvent/CreateEvent'
import { EventListing } from '../components/EventListing/EventListing'

export class Events extends Component {
  render() {
    return (
      <div>
        <h2 className="title">Events</h2>
        <article>
          <Router basename={'/events'}>
            <div className="section-nav">
              <Nav tabs>
                <NavItem>
                  <Link className="nav-link" to="/create">
                    Create
                  </Link>
                </NavItem>
                
                <NavItem>
                  <Link className="nav-link" to="/list">
                    List
                  </Link>
                </NavItem>
              </Nav>
            </div>

            <section className="tab-content">
              <Switch>
                <Route path="/create" component={ CreateEvent }/>
                <Route path="/list" component={ EventListing }/>
                
                <Route>
                  <article>
                    <div>
                      Select one of the options above. <br/>
                      Other details will come here
                    </div>
                  </article>
                </Route>
              </Switch>
            </section>
          </Router>
        </article>
      </div>
    )
  }
}

export default Events