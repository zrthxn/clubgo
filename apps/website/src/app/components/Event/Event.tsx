import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Event.scss'

import RootContext from '../../RootContextProvider'
import { Image } from '@clubgo/website/components'
import { IEventModel } from '@clubgo/database'

interface EventComponentProps {
  data: IEventModel
  size?: 'small' | 'large'
  color?: 'default' | 'white'
  image?: string
}

export class Event extends Component<EventComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  detailsPageURL = `/events/detail/${this.props.data._id}`

  openEventDetails = () => {
    window.scrollTo(0, 0)
    this.context.router(this.detailsPageURL)
  }

  render() {
    var eventCardStyle = 'event'

    if(this.props.size!==undefined)
      eventCardStyle += ' ' + this.props.size
      
    if(this.props.color!==undefined)
      eventCardStyle += ' ' + this.props.color

    return (
      <div className={eventCardStyle} onClick={this.openEventDetails}>
        {/* <Image alt="Image" src={ this.props.data.media.images[0].url }/> */}
        <img alt="Image" src={ this.props.data.media.images[0].url }/>
        
        <Link to={this.detailsPageURL}>
          <h3 className="event-title">{ this.props.data.eventTitle }</h3>
        </Link>

        <h4 className="event-venue">{ this.props.data.venue.title }</h4>

        <p style={{ margin: '0.5em 0', fontSize: '0.85em' }}>Friday, 20 October | 1:00 AM</p>

        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85em' }}>
          Starting from { '\u20B9 ' + '3,000' }
        </p>
      </div>
    )
  }
}

export default Event
