import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'

import './Home.scss'

import { Story, StoriesContainer } from '@clubgo/website/components'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { Event, Flexbox, FlexContainer } from '@clubgo/website/components'
import RootContext from '../..//RootContext'

import { DatabaseService } from '@clubgo/api'
import { IEventModel } from '@clubgo/database'
import { SelectCity } from '@clubgo/website/components'

type URLParams = { 
  city: string
}

interface HomeProps {
  city: string
  locality: string
}

export default class Home extends Component<HomeProps & RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  eventService = new DatabaseService('/event')

  state = {
    searchQuery: null,
    events: {
      nearby: [

      ]
    }
  }

  componentDidMount() {
    let { city } = this.props
    if(city===undefined) {
      city = this.context.actions.getUserContext().city
      if(city!==undefined)
        this.context.router(`/in/${city.toLowerCase()}`)
      else {
        this.context.router('/in/delhi')
        this.context.actions.setUserContext({ city: 'Delhi' })
        // ^ open modal to select city here
      }
    }
    else
      this.context.actions.setUserContext({
        city: this.props.city
      })

    this.eventService.searchBy({
      venue: {
        city
      }
    }).then(({ data })=>{
      let { events } = this.state
      events.nearby = data.results
      this.setState({
        events
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
          <h2>Featured Events</h2>
          <Recommender query={{
            settings: {
              isFeatured: true
            },
            venue: {
              city: this.props.city
            }
          }}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} size="large" data={eventProps} />
            )}
          />
        </section>

        <section className="container">
          <h2>Events Near You</h2>
          <Recommender query={{
            venue: {
              city: this.props.city,
              locality: undefined
            }
          }}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} data={eventProps} />
            )}
          />
        </section>

        <section className="container">
          <h2>Recommended</h2>
          <Recommender query={{
            venue: {
              city: this.props.city
            }
          }}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} data={eventProps} />
            )}
          />        
        </section>
      </article>      
    )
  }
}
