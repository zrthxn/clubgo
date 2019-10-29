import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { conf } from '@clubgo/util'

import './Footer.scss'
import { Grid } from '@material-ui/core'
import { DatabaseService } from '@clubgo/api'

export default class Footer extends Component {
  state = {
    locations: [
      {
        city: undefined,
        localities: []
      }
    ]
  }

  locationService = new DatabaseService('/location')

  componentDidMount() {
    this.locationService.list().then(({ data })=>{
      this.setState({
        locations: data.results
      })
    }) 
  }
  
  render() {
    return (
      <footer>
        <article className="cities">
          <section className="container">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2>Discover your City</h2>
              </Grid>

              {
                this.state.locations.map((city)=>(
                  city.city!==undefined ? (
                    <Grid item md={3} xs={6}>
                      <Grid container spacing={1} key={city.city}>
                        <Grid item xs={12} className="footer-city">
                          <a href={`/events/in/${city.city.toLowerCase()}`}><b>{ city.city }</b></a>
                        </Grid>
                        {
                          city.localities.map((locality)=>(
                            <Grid item xs={12} key={locality.name} className="footer-locality">
                              <a href={`/events/in/${city.city.toLowerCase()}/${locality.name.toLowerCase().trim().replace(/ /g, '-')}`}>
                                { locality.name }
                              </a>
                            </Grid>
                          ))
                        }
                      </Grid>
                    </Grid>
                  ) : null
                ))
              }
            </Grid>
          </section>
        </article>
        
        <article className="mobile-advert">
          <section className="container">
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <div className="app-mockup">
                  <img src="/assets/img/appmockup.png" alt=""/>
                </div>
              </Grid>
              <Grid item md={8} xs={12}>
                <h3>Carry the Party in Your Pocket</h3>
                <p>
                  Discover the best parties, music and travel & food happening 
                  in your city. Find the coolest people to party with. <br/>
                  All this and more with the ClubGo<sup>TM</sup> Mobile App.
                </p>

                <div className="app-icons">
                  <img src="/assets/google-play-badge.png" width="150px" alt=""/>
                  <img src="/assets/app-store-badge.svg" width="150px" alt=""/>
                </div>
              </Grid>
            </Grid>
          </section>
        </article>

        <article className="base">
          <section className="container">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h1>ClubGo</h1>
              </Grid>

              <Grid item md={6} xs={12}>
                <p style={{ margin: 0 }}>
                  ClubGo<sup>TM</sup>  is a platform that helps you discover and buy the best in events, 
                  travel and food in your city. We strive to curate experiences that are worth 
                  your time and money, possibly something you have never tried before.
                </p>
              </Grid>

              <Grid item md={6} xs={12}>
                <p style={{ margin: 0 }}>
                  ClubGo<sup>TM</sup>  is a platform that helps you discover and buy the best in events, 
                  travel and food in your city. We strive to curate experiences that are worth 
                  your time and money, possibly something you have never tried before.
                </p>
              </Grid>
            </Grid>
          </section>
        </article>
      </footer>
    )
}
}
