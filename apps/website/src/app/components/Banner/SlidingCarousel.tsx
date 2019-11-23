import React, { Component } from 'react'
import Banner from './Banner'
import Carousel from './Carousel'

interface CarouselProps {
  items: Array<{
    src: string
    link: string
    text: string
  }>
}

export class SlidingCarousel extends Component<CarouselProps> {
  state = {
    activeIndex: 1,
    translateX: -21,
    renderQueue: []
  }

  componentWillReceiveProps() {
    let { renderQueue } = this.state
    renderQueue = this.props.items
    if(this.props.items.length<3) {
      renderQueue.push({ src: '', link: '', text: '' })
      if(renderQueue.length<3) {
        renderQueue.unshift({ src: '', link: '', text: '' })
      }
    }
    this.setState({ 
      renderQueue 
    })
  }

  componentDidMount() {
    let sliding = setInterval(()=>{
      this.slideForward()
    }, 4000)
    if(this.state.renderQueue.length<=3)
      clearInterval(sliding)
  }

  slideForward() {
    let { activeIndex, translateX } = this.state
    translateX -= 42
    if(activeIndex===this.props.items.length-1) {
      activeIndex = 0
      translateX = 21
    }
    else 
      activeIndex++
    this.setState({
      activeIndex, translateX
    })
  }

  slideBackward() {
    let { activeIndex, translateX } = this.state
    translateX += 42
    if(activeIndex===0) {
      activeIndex = this.props.items.length-1
      translateX = 21 + ( -42 * (this.props.items.length - 1))
    }
    else
      activeIndex--
    this.setState({
      activeIndex, translateX
    })
  }

  render() {
    if(window.screen.width>=600)
      return (
        <div className="sliding-carousel">
          <div className="carousel-forward"></div>
          <div className="carousel-slider" style={{ transform: `translateX(${this.state.translateX}em)` }}>
            {
              this.state.renderQueue.map((item, index)=>(
                <div className={ this.state.activeIndex === index ? "active" : "" }>
                  <a href={item.link}>
                    <Banner image={item.src} link={item.link} />
                  </a>
                </div>
              ))
            }
          </div>
          <div className="carousel-backward"></div>
        </div>
      )
    else
      return <Carousel items={this.props.items}/>
  }
}
