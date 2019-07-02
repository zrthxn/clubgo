import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import { CreateVenue } from '../components/CreateVenue/CreateVenue'
import { VenueListing } from '../components/VenueListing/VenueListing'

export class Venues extends Component {
  render() {
    return (
      <div>
        <h2 className="title">Venues</h2>
        <article>
          <Router basename={'/venues'}>
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
                <Route path="/create" component={ CreateVenue }/>
                <Route path="/list" component={ VenueListing }/>
                
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

export default Venues