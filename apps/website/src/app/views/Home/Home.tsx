import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'

import './Home.scss'

import { Story, StoriesContainer } from '@clubgo/website/components'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { Event, Flexbox, FlexContainer } from '@clubgo/website/components'
import Context from '../../ContextProvider'

import { DatabaseService } from '@clubgo/features/api'

type URLParams = { 
  city: string
}

export default class Home extends Component<RouteComponentProps<URLParams>> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  eventService = new DatabaseService('/event')

  state = {
    city: null,
    events: {
      nearby: []
    }
  }

  componentDidMount() {
    this.eventService.searchBy({
      venue: {
        city: this.props.match.params.city
      }
    }).then(({ data })=>{
      let { events } = this.state
      events.nearby = data.results
      this.setState({
        city: this.props.match.params.city,
        events
      })
    })
  }
  
  render() {
    return (
      <article>
        <section className="container">
          <Banner image={'https://i.guim.co.uk/img/media/843fe2c5546f7e50bb973e3ed3a00a1d2faf872c'+
            '/15_100_813_488/master/813.jpg?width=1200&height=630&quality=85&auto=format&fit=crop'+
            '&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc'+
            '&enable=upscale&s=9a543f0c29ed8d437fcfee9a45377784'}/>
        </section>


        {
          // Highlights Section
          // ----------------------------------------------
        }
        <section className="container"> 
          <StoriesContainer/>
        </section>    

        {
          // Events Section
          // ----------------------------------------------
        }
        <section className="container">
          <h2>Featured Events</h2>
          <Recommender direction="horizontal">
            {
              this.state.events.nearby.slice(0, 10).map((event, index)=>{
                return (
                  <Event key={`event_${index}`} data={event}/>
                )
              })
            }
          </Recommender>
        </section>

        <section className="container">
          <h2>Nearby</h2>
          <FlexContainer>
            <Flexbox flow="row">
              {
                this.state.events.nearby.map((event, index)=>{
                  return (
                    <Event key={`nearby-event-${index}`} data={event}/>
                  )
                })
              }
            </Flexbox>
          </FlexContainer>
        </section>

        <section className="container">
          <h2>Recommended</h2>
          <Recommender direction="horizontal">
            {
              this.state.events.nearby.slice(0, 10).map((event, index)=>{
                return (
                  <Event key={`event_${index}`} data={event}/>
                )
              })
            }
          </Recommender>          
        </section>
      </article>
      
    )
  }
}
