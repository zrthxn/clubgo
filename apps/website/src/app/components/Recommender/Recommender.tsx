import React, { Component, ReactElement } from 'react'
import ScrollArea from 'react-scrollbar'
import './Recommender.scss'

import { DatabaseService } from '@clubgo/api'
import { IEventModel, IVenueModel } from '@clubgo/database'
import Button from '../Button/Button'
import RootContext from '../../RootContext'
import { FlexScroll } from '../Flexbox/Flexbox'

interface RecommenderComponentProps {
  render: ((renderProps?)=>((typeof React.Component) | ReactElement))
  placeholder?: ((renderProps?)=>((typeof React.Component) | ReactElement))
  path: string
  query: object

  shuffle?: boolean
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
    let { data } = await this.recommendationService.recommend(this.props.query)
    
    if(this.props.maxItemCount)
      data.results = data.results.splice(0, this.props.maxItemCount)
    
      this.setState({ recommendations: data.results })
    return
  }
  
  buildRenderQueue = async () => {
    let { recommendations, renderQueue } = this.state
    
    if(this.props.shuffle)
      recommendations.sort(() => Math.random() - 0.5)

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
        {
          !this.state.loading && this.state.renderQueue.length===0 ? (
            <div></div>
          ) : (
            <h2 className="scroll-title">{ this.props.title }</h2>
          )
        }
        <FlexScroll>
          {
            !this.state.loading ? (
              this.state.renderQueue
            ) : (
              this.props.placeholder ? (
                [1, 2, 3, 5].map((item, index)=>{
                  return this.props.placeholder(item)
                })
              ) : (
                <h3 className="center">Loading</h3>
              )
            )
          }
        </FlexScroll>
      </div>
    )
  }
}

export default Recommender
