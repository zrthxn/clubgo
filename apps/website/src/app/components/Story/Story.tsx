import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import './Story.scss'

import RootContext from '../../RootContextProvider';

interface StoryProps {
  index: number
  story: {
    imageURL: string,
    faceImageURL?:  string
  }
}
export class Story extends Component<StoryProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    hasBeenOpened: false,
    imageURL: null,
    faceImageURL: null
  }

  componentDidMount() {
    let { imageURL, faceImageURL } = this.props.story
    if(faceImageURL===undefined) faceImageURL = imageURL
    this.setState({ 
      imageURL, faceImageURL 
    })
  }

  openStory = () => {
    this.context.actions.openStory(this.state.imageURL, this.props.index)
    this.setState({
      hasBeenOpened: true
    })
  }

  render(){
    return (
      <RootContext.Consumer>
        {
          appContext => (
            <div className={ this.state.hasBeenOpened ? 'story viewed' : 'story' } onClick={this.openStory}>
              <div className="face-container" onClick={this.openStory}>
                <img src={this.state.faceImageURL} alt="" onClick={this.openStory}/>
              </div>
            </div>
          )
        }
      </RootContext.Consumer>
    )
  }
}

export function StoriesContainer(props) {
  const scrollbarStyles = {
    borderRadius: 5
  }

  return (
    <div>
      <h4>Highlights</h4>
      <ScrollArea
        speed={1}
        horizontal={true}
        vertical={false}
        className="scroll-view-area"
        contentClassName="scroll-container-row"
        horizontalScrollbarStyle={scrollbarStyles}
        horizontalContainerStyle={scrollbarStyles}
        smoothScrolling= {true}
        minScrollSize={40}
      >
        <RootContext.Consumer>
          {
            appContext => (
              appContext.state.story.stories.map((story, index)=>(
                <Story key={`story-${index}`} index={index}
                  story={story}
                />
              ))
            )
          }
        </RootContext.Consumer>
      </ScrollArea>

      <RootContext.Consumer>
        {
          appContext => (
            <div className={ appContext.state.story.isOpen ? "story open" : "story" }
              onClick={appContext.actions.closeStory}
              style={{
                border: "none"
              }}
            >
              <div className="story-container">
                <img src={appContext.state.story.image}  alt="" onClick={appContext.actions.closeStory}/>
              </div>
            </div>
          )
        }
      </RootContext.Consumer>
    </div>
  )
}

export default Story
