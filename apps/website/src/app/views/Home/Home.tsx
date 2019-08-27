import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'
import { Story, StoryContainer, StoryDisplay } from '@clubgo/website/components'
import Context from '../../ContextProvider';

type URLParams = { 
  whatever: string
}

interface IComponentProps {
  
}
export default class Home extends Component<RouteComponentProps<URLParams> & IComponentProps> {
  render() {
    return (
      <div className="container">

        <h1>ClubGo</h1>
        <h2>{ this.props.match.params.whatever }</h2>

        <h3>Highlights</h3>
        <StoryContainer>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
        </StoryContainer>

        <Context.Consumer>
          {
            appContext => (
              <StoryDisplay open={appContext.state.story.isOpen} url={appContext.state.story.imageURL} />
            )
          }
        </Context.Consumer>

        <h2>Featured</h2>
        <p>Lorm</p>

        <h2>Events</h2>
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
        <p>Lorm</p>
        <p>Lorm</p>
        <p>Lorm</p>
        <p>Lorm</p>
        <p>Lorm</p>
      </div>
    )
  }
}
