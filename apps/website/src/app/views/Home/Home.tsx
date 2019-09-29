import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'

import './Home.scss'

import { Story, StoriesContainer } from '@clubgo/website/components'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { Event, Flexbox, FlexContainer } from '@clubgo/website/components'
import Context from '../../ContextProvider'

import { DatabaseService } from '@clubgo/features/api'
import { IEventModel } from '@clubgo/database'

type URLParams = { 
  city: string
}

interface HomeProps {
  city: string
  locality: string
}

export default class Home extends Component<HomeProps & RouteComponentProps<URLParams>> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

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
      else
        this.context.router('/in/delhi')
        // ^ open modal to select city here
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
          <Banner image={'https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_800/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1569404644%2Fxrgm5nkqrbbyexjupwv9.png'}/>
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
          <h4>Our best featured events</h4>
          <Recommender 
            render={(eventProps:IEventModel)=>(
              <Event size="large" data={eventProps}/>
            )}
          />
        </section>

        <section className="container">
          <h2>Nearby</h2>
          <h4>Events near you</h4>
          <Recommender 
            render={(eventProps:IEventModel)=>(
              <Event data={eventProps}/>
            )}
          />
        </section>

        <section className="container">
          <h2>Recommended</h2>
          <h4>Events recommended for you</h4>
          <Recommender 
            render={(eventProps:IEventModel)=>(
              <Event data={eventProps}/>
            )}
          />        
        </section>
      </article>      
    )
  }
}
