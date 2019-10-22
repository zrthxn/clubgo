import React, { Component, ReactElement } from 'react'
import ScrollArea from 'react-scrollbar'
import './Recommender.scss'

import { DatabaseService } from '@clubgo/api'
import { IEventModel, IVenueModel } from '@clubgo/database'
import Button from '../Button/Button'
import RootContext from '../../RootContext'

interface RecommenderComponentProps {
  render: ((renderProps?)=>((typeof React.Component) | ReactElement))
  path: string
  query: object

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

  recommendationService = new DatabaseService(this.props.path)

  componentDidMount() {
    let context = this.context.actions.getUserContext()
    this.fetchRecommendations(context).then(()=>{
      this.buildRenderQueue()
    })
  }

  fetchRecommendations = async ({ city }) => {
    let { data } = await this.recommendationService.searchBy({ 
      ...this.props.query
      // venue: {
      //   city
      // }
    })
    if(this.props.maxItemCount)
      data.results = data.results.splice(0, this.props.maxItemCount)
    this.setState({ recommendations: data.results })
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
          horizontal
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
      </div>
    )
  }
}

export default Recommender
