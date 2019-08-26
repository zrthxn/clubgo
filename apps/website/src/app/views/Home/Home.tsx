import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Story, StoryContainer } from '@clubgo/website/components'

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
        </StoryContainer>

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
