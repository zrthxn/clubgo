import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { Grid, IconButton } from '@material-ui/core'

import './scss/Pages.scss'

import { Map } from '@clubgo/components'

import LocationEditor from '../components/Locations/LocationEditor'
import LocalityEditor from '../components/Locations/LocalityEditor'
import { Delete, Edit } from '@material-ui/icons'

export class LocationsPage extends Component {
  state = { 
    openLocationEditor: false,
    openLocalityEditor: false,
    isSelectedCity: true,
    selectedCity: 0,
    selectedLocality: {
      name: null
    },
    cities: [
      { name: 'Delhi', localities: [ {name: 'CP'}, {name: 'GK'} ] },
      { name: 'Mumbai', localities: [ {name: 'Juhu'} ] },
      { name: 'Gurgaon', localities: [ {name: 'Sector 29'} ] },
    ]
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

            <Button color="secondary" disabled={!this.state.isSelectedCity} size="lg" style={{ margin: '0 0 0 0.5em' }} 
              onClick={()=>{
                this.setState({
                  openLocalityEditor: true
                })
              }}
            >
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
          city={this.state.cities[this.state.selectedCity].name}
          initCoordinates={{
            _lat: 0,
            _lon: 0
          }}
          close={()=>{
            this.setState({
              openLocalityEditor: false
            })
          }}
          onComplete={(locality)=>{
            let { cities } = this.state
            cities[this.state.selectedCity].localities.push(locality)
            this.setState({
              openLocalityEditor: false,
              cities
            })
          }}
        />

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <h3>Cities</h3><br/>
              <Grid container spacing={3}>
                {
                  this.state.cities.map((city, index)=>(
                    <Grid item xs={12}
                      style={
                        this.state.cities[this.state.selectedCity].name===city.name ? { 
                          borderRadius: '5px', border: '2px solid #0080ff', backgroundColor: '#0080ff0f',
                          margin: '0.5em', padding: '1em', color: '#0080ff' 
                        } : { 
                          borderRadius: '5px', border: '2px solid #1c1c1c40', 
                          margin: '0.5em', padding: '1em' 
                        }
                      }
                      onClick={()=>{
                        this.setState({
                          isSelectedCity: true,
                          selectedCity: index
                        })
                      }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={8} style={{ margin: 'auto' }}>
                          <p style={{ margin: 0, fontWeight: 600 }}>
                            { city.name }
                          </p>
                        </Grid>

                        <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row' }}>
                          <span className="float-right" style={{ marginLeft: 'auto' }}>
                            <IconButton>
                              <Edit/>
                            </IconButton>

                            <IconButton>
                              <Delete/>
                            </IconButton>
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>

            <Grid item md={4} xs={12}>
              <h3>Localities</h3><br/>
              <Grid container spacing={3}>
                {
                  this.state.isSelectedCity ? (
                    this.state.cities[this.state.selectedCity].localities.map((location, index)=>(
                      <Grid item xs={12}
                        style={{ 
                          borderRadius: '5px', border: '1px solid #1c1c1c40', 
                          margin: '0.5em', padding: '1em' 
                        }}
                        onClick={()=>{
                          this.setState({
                            selectedLocality: location
                          })
                        }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={8} style={{ margin: 'auto' }}>
                            <p style={{ margin: 0 }}>
                              { location.name }
                            </p>
                          </Grid>

                          <Grid item xs={4} style={{ display: 'flex', flexDirection: 'row' }}>
                            <span className="float-right" style={{ marginLeft: 'auto' }}>
                              <IconButton>
                                <Edit/>
                              </IconButton>

                              <IconButton>
                                <Delete/>
                              </IconButton>
                            </span>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <div style={{ 
                        opacity: 0.5
                      }}>
                        Select a City
                      </div>
                    </Grid>
                  )
                }
              </Grid>
            </Grid>

            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>

            <Grid item md={10} xs={12}>
              <h3>Map</h3><br/>
              <Map/>
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}

export default LocationsPage