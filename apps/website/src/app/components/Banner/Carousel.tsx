import React, { Component, useState } from 'react'
import {
  Carousel as BootstrapCarousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap'

interface CarouselProps {
  items: Array<{
    src: string
    link: string
  }>
}

export class Carousel extends Component<CarouselProps> {
  state = {
    activeIndex: 0,
    animating: false
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
        <BootstrapCarousel
          activeIndex={this.state.activeIndex}
          next={this.next}
          previous={this.previous}
        >
          {/* <CarouselIndicators items={this.props.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} /> */}
          {
            this.props.items.map((item) => {
              return (
                <CarouselItem
                  onExiting={() => this.setAnimating(true)}
                  onExited={() => this.setAnimating(false)}
                >
                  <a href={item.link}>
                    <img src={item.src} />
                  </a>
                </CarouselItem>
              )
            })
          }
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </BootstrapCarousel>
      </div>
    )
  }
}

export default Carousel