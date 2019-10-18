import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
// import './Venues.scss'

import { Story, StoriesContainer, FlexContainer, Flexbox, Venue } from '@clubgo/website/components'
import RootContext from '../../RootContextProvider'

import { Advert } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'

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

  componentDidMount() {
    let { city } = this.props.match.params
    if(city!==undefined) {
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
      this.context.actions.setUserContext({ city })
      this.setState({
        city
      })
    }
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
                this.state.venues.nearby.map((Venue, index)=>{
                  return (
                    <Venue key={`Venue_${index}`} data={Venue}/>
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
