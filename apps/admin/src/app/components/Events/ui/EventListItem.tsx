import React, { Component } from 'react'
import { IEventModel } from '@clubgo/database'

import { EventContext } from '../EventContext'

export interface EventListItemProps {
  data: any,//IEventModel,
}
export class EventListItem extends Component<EventListItemProps> {
  state = {
    openModal: false
  }

  render() {
    return (
      <EventContext.Consumer>
        {
          eventContext => (
            <div className="list-item">
              <span>{ this.props.data.eventTitle }</span>
              
              <span>
                <button onClick={() => eventContext.actions.editEvent(this.props.data)}>
                  Edit
                </button>
                
                <button onClick={
                  () => {
                    // open confirmation modal
                    // on yes =>
                    eventContext.actions.deleteEvent(this.props.data._id)
                  }
                }>
                  Delete  
                </button>
              </span>

              {
                this.state.openModal ? (
                  <div></div>
                ) : (
                  <div></div>
                )
              }
            </div>
          )
        }
      </EventContext.Consumer>
    )
  }
}

export default EventListItem
