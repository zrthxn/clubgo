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
          <div className="story">
            <div className="face-container" onClick={()=>appContext.actions.openStory(imageURL)}>
              <img src={faceImageURL}  alt="" onClick={()=>{
                appContext.actions.openStory(imageURL)}
              }/>
            </div>
          </div>
        )
      }
    </Context.Consumer>
  )
}

export function StoryContainer(props) {
  const scrollbarStyles = {
    borderRadius: 5
  }

  return (
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
      {
        props.children
      }
    </ScrollArea>
  )
}

export function StoryDisplay(props) {
  return (
    <Context.Consumer>
      {
        appContext => (
          <div className={
              props.open ? "story open" : "story"
            } 
            onClick={appContext.actions.closeStory}
            style={{
              border: "none"
            }}
          >
            <div className="story-container">
              <img src={props.url}  alt=""
                onClick={appContext.actions.closeStory}
              />
            </div>
            
          </div>
        )
      }
    </Context.Consumer>
  )
}

export default Story
