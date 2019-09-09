import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import './Story.scss'
import Context from '../../ContextProvider';

export interface StoryProps {
  story: {
    imageURL: string,
    faceImageURL?:  string
  }
}
export function Story(props:StoryProps) {
  let { imageURL, faceImageURL } = props.story
  
  if(faceImageURL===undefined)
    faceImageURL = imageURL

  return (
    <Context.Consumer>
      {
        appContext => (
          <div className="story" onClick={()=>{
            appContext.actions.openStory(imageURL)
          }}>
            <div className="face-container" onClick={()=>{
              appContext.actions.openStory(imageURL)
            }}>
              <img src={faceImageURL} alt="" onClick={()=>{
                appContext.actions.openStory(imageURL)
              }}/>
            </div>
          </div>
        )
      }
    </Context.Consumer>
  )
}

export function StoriesContainer(props) {
  const scrollbarStyles = {
    borderRadius: 5
  }

  return (
    <div>
      <h3>Highlights</h3>
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
        <Context.Consumer>
          {
            appContext => (
              appContext.state.story.stories.map((story, index)=>(
                <Story key={`story_${index}`}
                  story={story}
                />
              ))
            )
          }
        </Context.Consumer>
      </ScrollArea>

      <Context.Consumer>
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
    </Context.Consumer>
    </div>
  )
}

export default Story
