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
        <article className="mobile-advert">
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
                <a href="https://play.google.com/store/apps/details?id=in.clubgo.app&hl=en_IN">
                  <img src="/assets/google-play-badge.png" width="150px" alt=""/>
                </a>

                <a href="https://apps.apple.com/us/app/clubgo/id1205461095">
                  <img src="/assets/app-store-badge.svg" width="150px" alt=""/>
                </a>
              </div>
            </Grid>
          </Grid>
        </article>

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

        <article className="base">
          <section className="container">
            <Grid container spacing={3}>
              <Grid item md={3} xs={6}>
                <h3>Popular</h3>
                <a href="">Things to Do In Delhi</a><br/>
                <a href="">Best Parties In Gurgaon</a><br/>
                <a href="">Events Today In Mumbai</a><br/>
                <a href="">Events Tomorrow In Bangalore</a><br/>
                <a href="">Events This Week In Delhi</a><br/>
              </Grid>

              <Grid item md={3} xs={6}>
                <h3>Categories</h3>
                <a href="">DJ Night & Parties</a><br/>
                <a href="">Bollywood Night</a><br/>
                <a href="">Karaoke Night</a><br/>
                <a href="">Live Performance</a><br/>
                <a href="">Concert & Festivals</a><br/>
              </Grid>

              <Grid item md={3} xs={6}>
                <h3>Events</h3>
                <a href="">Upcoming Events</a><br/>
                <a href="">Event Tags</a><br/>
                <a href="">Past Events</a><br/>
              </Grid>

              <Grid item md={3} xs={6}>
                <h3>When</h3>
                <a href="">Events Today</a><br/>
                <a href="">Events Tomorrow</a><br/>
                <a href="">Events This Week</a><br/>
              </Grid>
            </Grid>
          </section>

          <section className="endcard">
            <h1 id="site-title">
              ClubGo
            </h1>

            <div className="social">
              <a href="https://www.facebook.com/clubgoapp/">
                <img src="/assets/icons/facebook.svg" width="25px" alt=""/>
              </a>

              <a href="https://www.instagram.com/clubgoapp/">
                <img src="/assets/icons/instagram.svg" width="25px" alt=""/>
              </a>
              
              <a href="https://www.youtube.com/channel/UCMYZYb6gbrkO5ao4XJUxnaQ">
                <img src="/assets/icons/youtube.svg" width="25px" alt=""/>
              </a>
            </div>

            <p>
              &copy; ClubGo
            </p>
          </section>
        </article>
      </footer>
    )
}
}
