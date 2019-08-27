import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import './Story.scss'
import Context from '../../ContextProvider';

export interface IStoryProps {

}
export class Story extends Component<IStoryProps> {
  state = {
    storyState: "story"
  }

  render() {
    let url = "https://st2.depositphotos.com/5868334/11799/v/950/depositphotos_117993120-stock-illustration-letter-se-sc-logo-concrpt.jpg"

    return (
      <Context.Consumer>
        {
          appContext => (
            <div className="story">
              <div className="face-container" onClick={()=>appContext.actions.openStory(url)}>
                <img src={url}  alt="" onClick={()=>{
                  appContext.actions.openStory(url)}
                }/>
              </div>
            </div>
          )
        }
      </Context.Consumer>
      
    )
  }
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
      className="stories-view-area"
      contentClassName="stories-container"
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
