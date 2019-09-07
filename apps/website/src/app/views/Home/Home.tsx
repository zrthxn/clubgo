import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'

import './Home.scss'

import { Story, StoryContainer, StoryDisplay } from '@clubgo/website/components'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { Event, Flexbox, FlexContainer } from '@clubgo/website/components'
import Context from '../../ContextProvider'

import { DatabaseService } from '@clubgo/features/api'

type URLParams = { 
  whatever: string
}

export default class Home extends Component<RouteComponentProps<URLParams>> {
  eventService = new DatabaseService('/event')

  state = {
    stories: [
      { 
        imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
      },
      {
        imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
      },
      { 
        imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
      },
      { 
        imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
      },
      { 
        imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
      },
      { 
        imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
      }
    ],
    events: [

    ]
  }

  componentDidMount() {
    this.eventService.searchBy({
      venue: {
        city: 'Delhi'
      }
    }).then(({ data })=>{
      this.setState({
        events: data.results
      })
    })
  }
  
  render() {
    return (
      <article>
        <header>
          <section className="container">
            <h1 id="site-title">ClubGo</h1>

            <div style={{ margin: 'auto 0.5em' }}>
              <Textbox spellCheck={false} placeholder="Search" margins="dense"/>
            </div>
          </section>
        </header>

        <section className="container">
          <Banner imageURL={'https://i.guim.co.uk/img/media/843fe2c5546f7e50bb973e3ed3a00a1d2faf872c'+
            '/15_100_813_488/master/813.jpg?width=1200&height=630&quality=85&auto=format&fit=crop'+
            '&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc'+
            '&enable=upscale&s=9a543f0c29ed8d437fcfee9a45377784'}/>
        </section>


        {
          // Highlights Section
          // ----------------------------------------------
        }
        <section className="container"> 
          <h3>Highlights</h3>
          <StoryContainer>
            {
              this.state.stories.map((story, index)=>(
                <Story key={`story_${index}`}
                  story={story}
                />
              ))
            }
          </StoryContainer>

          <Context.Consumer>
            {
              appContext => (
                <StoryDisplay open={appContext.state.story.isOpen} 
                  url={appContext.state.story.imageURL}
                />
              )
            }
          </Context.Consumer>
        </section>
        

        {
          // Events Section
          // ----------------------------------------------
        }
        <section className="container">
          <h2>Featured Events</h2>
          <Recommender direction="horizontal">
            {
              [{},{},{}].map((event, index)=>{
                return (
                  <Event key={`event_${index}`}/>
                )
              })
            }
          </Recommender>

          <h2>Nearby</h2>
          <FlexContainer>
            <Flexbox flow="row">
              {
                this.state.events.map((event, index)=>{
                  return (
                    <Event key={`event_${index}`}/>
                  )
                })
              }
            </Flexbox>
          </FlexContainer>

          <h2>Recommended</h2>
          <FlexContainer>
            <Flexbox flow="row">
              {
                [{},{},{},{},{},{},{}].map((event, index)=>{
                  return (
                    <Event key={`event_${index}`}/>
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
