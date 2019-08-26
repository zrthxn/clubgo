import React, { Component } from 'react'
import './Story.scss'

export interface IStoryProps {

}
export class Story extends Component<IStoryProps> {
  state = {
    storyState: "story"
  }

  openStory = () => {
    this.setState({
      storyState: this.state.storyState + " " + "open"
    })
  }

  closeStory = () => {
    this.setState({
      storyState: "story"
    })
  }

  render() {
    return (
      <div className={this.state.storyState}>
        <div className="face-container" onClick={this.openStory}>
          <img src="https://st2.depositphotos.com/5868334/11799/v/950/depositphotos_117993120-stock-illustration-letter-se-sc-logo-concrpt.jpg" 
            onClick={this.openStory}
            alt=""/>
        </div>

        <div className="story-container" onClick={this.closeStory}>
          <img src="https://st2.depositphotos.com/5868334/11799/v/950/depositphotos_117993120-stock-illustration-letter-se-sc-logo-concrpt.jpg" 
            onClick={this.closeStory}
            alt=""/>
        </div>
      </div>
    )
  }
}

export function StoryContainer(props) {
  return (
    <div className="stories-container">
      {
        props.children
      }
    </div>
  )
}

export default Story
