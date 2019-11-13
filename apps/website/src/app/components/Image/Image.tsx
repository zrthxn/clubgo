import React, { InputHTMLAttributes, Component } from 'react'
import './Image.scss'

interface ImageProps extends InputHTMLAttributes<HTMLImageElement> {
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}

export class Image extends Component<ImageProps> {
  state = {
    loaded: false
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {
          this.state.loaded ? null : <div className="image-placeholder"/>
        }
        
        <img { ...this.props }
          style={
            this.state.loaded ? {
              height: '100%', width: '100%'
            } : {
              height: 0, width: 0
            }
          }
          alt="banner" 
          onLoad={()=>{
            this.setState({ loaded: true })
          }}
        />
      </div>
    )
  }
}
