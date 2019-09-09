import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import './Events.scss'

import { Story, StoriesContainer, FlexContainer, Flexbox, Event } from '@clubgo/website/components'
import Context from '../../ContextProvider'

import { Advert } from '@clubgo/website/components'
import { Lightbox, Button } from '@clubgo/website/components'
// import { Button } from '@material-ui/core'

type URLParams = { 
  city: 'Delhi' | 'Mumbai' | 'Gurgaon' | 'Bangalore'
}

export default class Events extends Component<RouteComponentProps<URLParams>> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  state = {
    city: null,
    openLightbox: true
  }

  componentDidMount() {  
    if(this.props.match.params.city!==undefined) {
      let { city } = this.props.match.params
      city = city.substr(0, 1).toUpperCase() + city.substr(1)
      this.setState({
        city
      })
    }
  }

  render() {
    return (
      <article>
        <section className="container"> 
          <StoriesContainer/>
        </section>

        <section className="container">
          {
            this.state.city!==null ? (
              <h1>Events in { this.state.city }</h1>
            ) : (
              <h1>Events Nearby</h1>
            )
          }

          <FlexContainer>
            <Flexbox flow="row">
              {
                [1,2,3,4,5,6,7,8,9,0,1].map((event, index)=>{
                  return (
                    <Event key={`event_${index}`}/>
                  )
                })
              }
            </Flexbox>
          </FlexContainer>
        </section>

        <Lightbox open={this.state.openLightbox}>
          <div>
            <h1>This is a Modal</h1>

            <p>
              Now here we are asking the user to user 
              Now here we are asking the user to user 
              Now here we are asking the user to user 
              Now here we are asking the user to user 
            </p>
          </div>

          <Button color="secondary" onClick={()=>{
            this.setState({
              openLightbox: false
            })
          }}>
            Okay Dude
          </Button>
        </Lightbox>

      </article>
    )
  }
}
