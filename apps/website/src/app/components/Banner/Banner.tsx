import React, { ReactElement, Component } from 'react'
import './Banner.scss'

import { Image } from '../Image/Image'

interface BannerProps {
  image: string
  caption?: string | ReactElement<HTMLElement> | ReactElement<HTMLElement>[]
  id?: string
  link?: string
  onClick?: Function
  onImageLoaded?: Function
}

export class Banner extends Component<BannerProps> {
  state = {
    loaded: false
  }

  render() {
    return (
      <div id={this.props.id} className="banner">
        <Image src={this.props.image}/>
      </div>
    )
  }
}

export default Banner