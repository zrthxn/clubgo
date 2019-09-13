import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { Story, StoriesContainer, FlexContainer, Flexbox, Event } from '@clubgo/website/components'
import Context from '../../ContextProvider'

import { Advert } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'

type URLParams = { 
  city: string
}

export default class Events extends Component<RouteComponentProps<URLParams>> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  state = {
    city: null,
    events: {
      nearby: []
    }
  }

  componentDidMount() {  
    if(this.props.match.params.city!==undefined) {
      let { city } = this.props.match.params
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
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
              <h1>Events in { this.state.city }</h1>
            ) : (
              <h1>Events Nearby</h1>
            )
          }

          <FlexContainer>
            <Flexbox flow="row">
              {
                this.state.events.nearby.map((event, index)=>{
                  return (
                    <Event key={`event_${index}`} data={event}/>
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
