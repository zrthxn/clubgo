import React, { Component, ReactElement } from 'react'
import ScrollArea from 'react-scrollbar'
import './Recommender.scss'

import { DatabaseService } from '@clubgo/features/api'
import { IEventModel, IVenueModel } from '@clubgo/database'

interface RecommenderComponentProps {
  render?: ((renderProps?)=>((typeof React.Component) | ReactElement))
  category?: string
  context?: string

  title?: string
  subtitle?: string
  maxItemCount?: number
}

export class Recommender extends Component<RecommenderComponentProps> {
  state = {
    loading: true,
    context: {
      
    },
    renderQueue: [],
    recommendations: [
      
    ]
  }

  recommendationService = new DatabaseService('/event')

  componentDidMount() {
    this.readContext().then((context)=>{
      this.fetchRecommendations(context).then(()=>{
        this.buildRenderQueue()
      })
    })
  }
  
  readContext = async () => {
    let city = localStorage.getItem('clubgo:city')
    return { city }
  }

  fetchRecommendations = async ({ city }) => {
    let { data } = await this.recommendationService.searchBy({
      venue: {
        city
      }
    })
    this.setState({
      recommendations: data.results
    })
    return
  }
  
  buildRenderQueue = async () => {
    let { recommendations, renderQueue } = this.state
    for (const item of recommendations) {
      renderQueue.push( this.props.render(item) )
    }
    // Consider switching to map for better performance
    
    this.setState({
      loading: false,
      renderQueue
    })
    return
  }

  render() {
    return (
      <div className="recommender">
        <ScrollArea
          speed={1}
          horizontal={true}
          vertical={false}
          className="scroll-view-area"
          contentClassName="scroll-container-row"
          horizontalScrollbarStyle={{ borderRadius: 5 }}
          horizontalContainerStyle={{ borderRadius: 5 }}
          smoothScrolling= {true}
          minScrollSize={40}
        >
          {
            !this.state.loading ? (
              this.state.renderQueue
            ) : (
              <div>
                <h2>Loading</h2>
              </div>
            )
          }
        </ScrollArea>
      </div>
    )
  }
}

export default Recommender
