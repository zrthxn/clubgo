import React, { Component } from 'react'
import './Banner.scss'

export interface BannerProps {
  id?: string,
  imageURL: string,
  onClick?: Function
}
export class Banner extends Component<BannerProps> {
  bannerAction = () => {
    if(this.props.onClick!==undefined)
      this.props.onClick()
  }

  render() {
    return (
      <div className="banner">
        <img src={this.props.imageURL} alt="banner"
          onClick={this.bannerAction}
        />
      </div>
    )
  }
}

export default Banner