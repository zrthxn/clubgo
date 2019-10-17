import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { Grid, IconButton } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'

import './scss/Pages.scss'

import { Map } from '@clubgo/components'
import { DatabaseService } from '@clubgo/api'

import LocationEditor from '../components/Locations/LocationEditor'
import LocalityEditor from '../components/Locations/LocalityEditor'
import { ILocationModel } from '@clubgo/database'

export class LocationsPage extends Component {
  state = { 
    loading: true,
    openLocationEditor: false,
    openLocalityEditor: false,
    isSelectedCity: true,
    selectedCity: 0,
    selectedLocality: {
      name: null
    },

    locations: Array<ILocationModel>()
  }

  locationService = new DatabaseService('/location')

  componentDidMount() {
    this.locationService.list().then(({ data })=>{
      let { locations } = this.state
      locations = data.results
      this.setState(()=>{
        return {
          locations,
          loading: false
        }
      })
    })
  }

  render() {
    if(!this.state.loading)
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
            onComplete={(location)=>{
              this.locationService.create(location).then(()=>{  
                let { locations } = this.state
                locations.push(location)
                this.setState(()=>{
                  return  {
                    locations,
                    openLocationEditor: false
                  }
                })
              })
            }}
          />

          <LocalityEditor open={this.state.openLocalityEditor}
            city={
              this.state.locations.length!==0 ? (
                this.state.locations[this.state.selectedCity].city
              ) : (
                null
              )
            }
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
              let { locations } = this.state
              locations[this.state.selectedCity]['localities'].push(locality)
              this.locationService.update(
                locations[this.state.selectedCity]._id,
                locations[this.state.selectedCity]
              ).then(()=>{
                this.setState(()=>{
                  return {
                    openLocalityEditor: false,
                    locations
                  }
                })
              })
            }}
          />

          <article className="page-content">
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <h3>Cities</h3><br/>
                <Grid container spacing={3}>
                  {
                    this.state.locations.map((location, index)=>(
                      <Grid item xs={12}
                        style={
                          this.state.selectedCity===index ? { 
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
                              { location.city }
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
                      this.state.locations.length!==0 && 
                      this.state.locations[this.state.selectedCity].localities!==undefined &&
                      this.state.locations[this.state.selectedCity].localities.length!==0 &&
                      this.state.locations[this.state.selectedCity].localities.map((location, index)=>(
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
                                  <Edit onClick={()=>{
                                    // this.setState({
                                    //   openLocalityEditor: true
                                    // })
                                  }}/>
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
    else
      return (
        <article style={{ padding: '4em' }}>
          <section style={{ margin: 'auto' }}> 
            <h2>
              <span className="spinner"/> Loading
            </h2>
          </section>
        </article>
      )
  }
}

export default LocationsPage