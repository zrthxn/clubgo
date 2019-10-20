import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Venue.scss'

import RootContext from '../../RootContext'
import { IVenueModel } from '@clubgo/database'

interface VenueComponentProps {
  data: IVenueModel
  size?: 'small' | 'large'
  color?: 'dark' | 'white'
  image?: string
}

export class Venue extends Component<VenueComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {

  }

  detailsPageURL = `/venue/${this.props.data._id}`

  openVenueDetails = () => {
    window.scrollTo(0, 0)
    this.context.router(this.detailsPageURL)
  }

  render() {
    var venueCardStyle = 'venue'

    if(this.props.size!==undefined)
      venueCardStyle += ' ' + this.props.size
      
    if(this.props.color!==undefined)
      venueCardStyle += ' ' + this.props.color

    return (
      <div className={venueCardStyle} onClick={this.openVenueDetails}>
        <div className="image-container">
          {
            this.props.data.media.images.length!==0 ? (
              <img alt="Image" src={ this.props.data.media.images[0].url }/>
            ) : (
              <img alt="Image" src="/assets/clubgo.png"/>
            )
          }
        </div>
        
        <Link to={this.detailsPageURL}>
          <h3 className="venue-title">{ this.props.data.venueTitle }</h3>
        </Link>

        <h4 className="venue-city">{ this.props.data.locality }, { this.props.data.city }</h4>
      </div>
    )
  }
}

export default Venue
