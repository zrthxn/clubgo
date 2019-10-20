import React, { Component } from 'react'

import { RootContext } from '../../RootContext'
import { Lightbox } from './Lightbox'

interface ComponentProps {
  onComplete?: Function
}

export class SelectCity extends Component<ComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    openLightbox: false
  }

  componentDidMount() {
    let { city } = this.context.actions.getUserContext()
    if(city===undefined)
      this.setState({
        openLightbox: true
      })
  }
  
  render() {
    return (
      <RootContext.Consumer>
        {
          appContext => (
            <Lightbox open={this.state.openLightbox || appContext.state.openCityLightbox}>
              <article>
                <section>
                  <h2>Select your City</h2>

                  <section>
                    <div style={{
                      display: 'flex',
                      flexFlow: 'row',
                      flexWrap: 'wrap',
                      width: '20em',
                      margin: 'auto'
                    }}>
                      {
                        [
                          "Delhi",
                          "Mumbai",
                          "Gurgaon",
                          "Bangalore"
                        ].map((item, index)=>(
                          <div
                            style={{
                              padding: '3em 0',
                              margin: '1em',
                              width: '8em',
                              border: '1px solid #1c1c1c80',
                              borderRadius: '10px',
                              textAlign: 'center'
                            }}
                            onClick={()=>{
                              this.setState({ openLightbox: false })
                              appContext.actions.toggleCityLightbox()
                              appContext.router('/in/' + item.toLowerCase())
                              window.location.reload()
                              appContext.actions.setUserContext({
                                city: item
                              })
                            }}
                          >
                            <p style={{ margin: '0 auto', cursor: 'pointer' }}
                              onClick={()=>{
                                this.setState({ openLightbox: false })
                                appContext.actions.toggleCityLightbox()
                                appContext.router('/in/' + item.toLowerCase())
                                window.location.reload()
                                appContext.actions.setUserContext({
                                  city: item
                                })
                              }}
                            >
                              { item }
                            </p>
                          </div>
                        ))
                      }
                    </div>
                  </section>
                </section>
              </article>
            </Lightbox>
          )
        }
      </RootContext.Consumer>
    )
  }
}
