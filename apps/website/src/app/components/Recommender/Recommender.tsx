import React, { Component, ReactElement } from 'react'
import ScrollArea from 'react-scrollbar'
import './Recommender.scss'

import { DatabaseService } from '@clubgo/features/api'
import { IEventModel, IVenueModel } from '@clubgo/database'
import Button from '../Button/Button'
import RootContext from '../../RootContextProvider'

interface RecommenderComponentProps {
  render?: ((renderProps?)=>((typeof React.Component) | ReactElement))
  category?: string
  context?: string

  title?: string
  subtitle?: string
  maxItemCount?: number
}

export class Recommender extends Component<RecommenderComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>
  
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
    let context = this.context.actions.getUserContext()
    this.fetchRecommendations(context).then(()=>{
      this.buildRenderQueue()
    })
  }

  fetchRecommendations = async ({ city }) => {
    let { data } = await this.recommendationService.searchBy({
      settings: this.props.context!=="featured" ? undefined : {
        isFeatured: true
      },
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
    
    renderQueue = recommendations.map((item, index)=>{
      return this.props.render(item)
    })
    
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
              <h3 className="center">Loading</h3>
            )
          }
        </ScrollArea>
        
        {/* <Button className="float-right" size="small">More</Button> */}
      </div>
    )
  }
}

export default Recommender
