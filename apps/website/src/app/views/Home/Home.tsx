import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'

import './Home.scss'

import { Story, StoryContainer, StoryDisplay } from '@clubgo/website/components'
import { Banner, Textbox } from '@clubgo/website/components'
import { Event, EventsContainer } from '@clubgo/website/components'
import Context from '../../ContextProvider'

type URLParams = { 
  whatever: string
}

interface IComponentProps {
  
}
export default class Home extends Component<RouteComponentProps<URLParams> & IComponentProps> {
  render() {
    return (
      <article>
        <header>
          <section className="container">
            <h1 id="site-title">ClubGo</h1>

            <Textbox spellCheck={false} placeholder="Search"/>
          </section>
        </header>

        <section className="container">
          <Banner imageURL="https://i.guim.co.uk/img/media/843fe2c5546f7e50bb973e3ed3a00a1d2faf872c/15_100_813_488/master/813.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=9a543f0c29ed8d437fcfee9a45377784"/>
        </section>

        <section className="container"> 
          <h3>Highlights</h3>
          <StoryContainer>
            {
              [
                { 
                  imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png",
                  faceImageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
                },
                { 
                  imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg",
                  faceImageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
                },
                { 
                  imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png",
                  faceImageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
                },
                { 
                  imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg",
                  faceImageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
                }
              ].map((story, index)=>(
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
        
        <section className="container">
          <h2>Events</h2>

          <EventsContainer>
            <Event/>
            <Event/>
            <Event/>
            <Event/>
          </EventsContainer>

          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
          <p>Lorm</p>
        </section>
      </article>
      
    )
  }
}
