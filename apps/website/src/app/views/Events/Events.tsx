import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { Story, StoriesContainer, FlexContainer, Flexbox, Event } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { Advert } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'

type URLParams = { 
  city: string
}

export default class EventListing extends Component<RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    city: null,
    events: {
      nearby: [
        
      ]
    }
  }

  eventService = new DatabaseService('/event')

  componentDidMount() {
    let { city } = this.props.match.params
    if(city!==undefined) {
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
      this.setState({
        city
      })
    }

    this.eventService.searchBy({
      venue: {
        city
      }
    }).then(({ data })=>{
      this.setState({
        events: {
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
