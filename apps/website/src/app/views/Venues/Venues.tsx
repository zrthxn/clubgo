import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Venues.scss'

import { Story, StoriesContainer, FlexContainer, Flexbox, Venue } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'

type URLParams = { 
  city: string
}

export default class VenueListing extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    city: null,
    venues: {
      nearby: [
        
      ]
    }
  }

  venueService = new DatabaseService('/venue')

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
  }

  render() {
    return (
      <article>
        <section className="container"> 
          <StoriesContainer/>
        </section>

        <section className="container">
          {
            this.state.city!==null ? (
              <h1>Venues in { this.state.city }</h1>
            ) : (
              <h1>Venues Nearby</h1>
            )
          }

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
        </section>
      </article>
    )
  }
}
