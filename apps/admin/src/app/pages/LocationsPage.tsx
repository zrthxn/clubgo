import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import './scss/Pages.scss'

import { Map } from '@clubgo/components'

import LocationEditor from '../components/Locations/LocationEditor'
import LocalityEditor from '../components/Locations/LocalityEditor'

export class LocationsPage extends Component {
  state = { 
    openLocationEditor: false,
    openLocalityEditor: false
  }

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Locations</h1>

          <div className="page-nav clearfix">
            <p>
              Select one of the options. <br/>
              Other details will come here.
            </p>

            <Button color="primary" size="lg" style={{ margin: '0 0.5em 0 0' }} onClick={()=>{
              this.setState({
                openLocationEditor: true
              })
            }}>
              Create New Location
            </Button>

            <Button color="secondary" disabled size="lg" style={{ margin: '0 0 0 0.5em' }} onClick={()=>{
              this.setState({
                openLocalityEditor: true
              })
            }}>
              Create New Locality
            </Button>
          </div>
        </article>
            
        <LocationEditor open={this.state.openLocationEditor}
          close={()=>{
            this.setState({
              openLocationEditor: false
            })
          }}
          onComplete={()=>{
            this.setState({
              openLocationEditor: false
            })
          }}
        />

        <LocalityEditor open={this.state.openLocalityEditor}
          city="Delhi"
          initCoordinates={{
            _lat: 0,
            _lon: 0
          }}
          close={()=>{
            this.setState({
              openLocalityEditor: false
            })
          }}
          onComplete={()=>{
            this.setState({
              openLocalityEditor: false
            })
          }}
        />

        <article className="page-content">
          
        </article>
      </div>
    )
  }
}

export default LocationsPage