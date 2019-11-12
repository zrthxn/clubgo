import React, { Component, useState } from 'react'
import {
  Carousel as BootstrapCarousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption
} from 'reactstrap'
import Banner from './Banner'

interface CarouselProps {
  items: Array<{
    src: string
    link: string
    text: string
  }>
}

export class Carousel extends Component<CarouselProps> {
  state = {
    activeIndex: 0,
    animating: false,
  }

  items = [
    {
      src: 'random',
      link: '',
      text: 'Loading'
    }
  ]

  componentDidMount() {
    this.items = this.props.items
  }
  
  setActiveIndex = (activeIndex) => {
    this.setState({
      activeIndex
    })
  }

  setAnimating = (animating) => {
    this.setState({
      animating
    })
  }

  next = () => {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1
    this.setActiveIndex(nextIndex)
  }

  previous = () => {
    if (this.state.animating) return
    const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1
    this.setActiveIndex(nextIndex)
  }

  goToIndex = (newIndex) => {
    if (this.state.animating) return
    this.setActiveIndex(newIndex)
  }

  render() {
    return (
      <div className="carousel-container">
        {
          this.props.items.length===0 ? (
            <div style={{ 
              backgroundColor: '#1c1c1c',
              color: '#fff', textAlign: 'center',
              padding: '4em'
            }}>
              <h3>Loading</h3>
            </div>
          ) : (
            <BootstrapCarousel
              activeIndex={this.state.activeIndex}
              next={this.next}
              previous={this.previous}
            >
              {
                this.props.items.map((item, index) => {
                  return (
                    <CarouselItem
                      onExiting={() => this.setAnimating(true)}
                      onExited={() => this.setAnimating(false)}
                    >
                      <a href={item.link}>
                        <Banner image={item.src} caption={''}/>
                        <CarouselCaption captionHeader={item.text}/>
                      </a>
                    </CarouselItem>
                  )
                })
              }
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </BootstrapCarousel>
          )
        }
      </div>
    )
  }
}

export default Carousel