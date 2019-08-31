import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import './Recommender.scss'

export interface RecommenderProps {
  direction: 'horizontal' | 'vertical'
}
export class Recommender extends Component<RecommenderProps> {
  direction = null

  constructor(props) {
    super(props)
    if(this.props.direction==='horizontal')
      this.direction = "scroll-container-row"
  }

  render() {
    return (
      <div className="recommender">
        <ScrollArea
          speed={1}
          horizontal={true}
          vertical={false}
          className="scroll-view-area"
          contentClassName={this.direction}
          horizontalScrollbarStyle={{ borderRadius: 5 }}
          horizontalContainerStyle={{ borderRadius: 5 }}
          smoothScrolling= {true}
          minScrollSize={40}
        >  
          {
            this.props.children
          }
        </ScrollArea>
      </div>
    )
  }
}

export default Recommender