import React, { InputHTMLAttributes, Component } from 'react'

interface ImageProps extends InputHTMLAttributes<HTMLImageElement> {
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}

export class Image extends Component<ImageProps> {
  state = {
    loaded: true
  }

  image = React.createRef<HTMLImageElement>()
  componentDidMount() {
    const img = this.image.current
    if(img && img.complete) {
      this.setState({ 
        loaded: true
      })
    }
  }

  handleImageLoaded() {
    this.setState({ 
      loaded: true
    })
  }

  isImageLoaded() {
    return this.state.loaded
  }

  render() {
    return (
      <div>
        <img { ...this.props } ref={this.image} hidden={this.isImageLoaded()}
          onLoad={()=>{
            this.setState({ 
              loaded: true
            })
          }}
        />

        {
          this.state.loaded ? (
            null
          ) : (
            <div style={{ 
              textAlign: 'center', width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column'
            }}>
              <p style={{ margin: 'auto', color: '#000' }}>
                Loading
              </p>
            </div>
          )
        }
      </div>
    )
  }
}
