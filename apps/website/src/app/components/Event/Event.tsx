import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import './Event.scss'

export class Event extends Component {
  render() {
    return (
      <div className="event">
        <h3>Event Name</h3>
        hello
      </div>
    )
  }
}

export function EventsContainer(props) {
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

export default Event
