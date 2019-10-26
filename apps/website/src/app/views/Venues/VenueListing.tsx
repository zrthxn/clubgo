import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Venues.scss'

import { FlexContainer, Flexbox, Venue, Carousel } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'

type URLParams = { 
  city: string
}

export default class VenueListing extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    city: null,
    ads: [],
    venues: {
      nearby: []
    }
  }

  venueService = new DatabaseService('/venue')

  adService = new DatabaseService('/ads')

  componentDidMount() {
    let { city } = this.props.match.params
    if(city!==undefined) {
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
      this.setState({
        city
      })
    }
    
    this.venueService.searchBy({ city }).then(({ data })=>{
      this.setState({
        venues: {
          nearby: data.results
        }
      })
    })

    // Advertising
    this.adService.searchBy({
      city
    }).then(({ data })=>{
      let ads = []
      for (const ad of data.results) {
        ads.push({
          src: ad.imageURL, link: ad.link
        })
      }
      this.setState({
        ads
      })
    })
  }

  render() {
    return (
      <article>
        <section className="container">
          <Carousel items={this.state.ads}/>
        </section>

        <section className="container center">
          {
            this.state.city!==null ? (
              <h1>Venues in { this.state.city }</h1>
            ) : (
              <h1>Venues Nearby</h1>
            )
          }
        </section>

        <section className="container listing">
          <div className="filters">

          </div>

          <div className="list">
            <FlexContainer>
              <Flexbox flow="row">
                {
                  this.state.venues.nearby.map((venue, index)=>{
                    return (
                      <Venue key={venue._id} data={venue}/>
                    )
                  })
                }
              </Flexbox>
            </FlexContainer>
          </div>
        </section>
      </article>
    )
  }
}
