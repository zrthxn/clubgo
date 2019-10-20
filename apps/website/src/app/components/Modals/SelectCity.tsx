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
                  <div style={{
                    display: 'flex', flexFlow: 'row', flexWrap: 'wrap',
                    width: '16em', margin: 'auto',
                  }}>
                    <h2 style={{ margin: '1em auto' }}>Select your City</h2>
                    {
                      [
                        "Delhi",
                        "Mumbai",
                        "Gurgaon",
                        "Bangalore"
                      ].map((item, index)=>(
                        <div
                          style={{
                            padding: '1.5em 0', margin: '0.5em', width: '100%',
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
                          <p style={{ margin: '0 auto', cursor: 'pointer', fontWeight: 600 }}
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

                <p style={{ 
                  margin: '0 auto', padding: '0.5em 1.25em', width: 'fit-content', textAlign: 'center',
                  border: '1px solid #dd000080', color: '#dd0000', borderRadius: '10px',
                  backgroundColor: '#dd000008', cursor: 'pointer'
                }} onClick={appContext.actions.toggleCityLightbox}>
                  Close
                </p>
              </article>
            </Lightbox>
          )
        }
      </RootContext.Consumer>
    )
  }
}
