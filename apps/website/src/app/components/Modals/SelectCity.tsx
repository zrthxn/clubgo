import React, { Component, useContext } from 'react'
import { observer } from 'mobx-react'
import { DatabaseService } from '@clubgo/api'

import ContextStore from '../../ContextStore'
import { RootContext } from '../../RootContext'

import { Lightbox, FullscreenModal } from './Lightbox'

interface ComponentProps {
  onComplete?: Function
}

@observer
export class SelectCity extends Component<ComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    openLightbox: false,
    cities: []
  }

  locationService = new DatabaseService('/location')

  componentDidMount() {
    let { city } = this.context.actions.getUserContext()
    if(city===undefined)
      this.context.actions.toggleCityLightbox()

    this.locationService.list().then(({ data })=>{
      let { cities } = this.state
      cities = data.results
      this.setState({
        cities
      })
    })
  }
  
  render() {
    return (
      <RootContext.Consumer>
        {
          appContext => (
            <FullscreenModal open={appContext.state.openCityLightbox} 
              onClose={appContext.actions.toggleCityLightbox}
            >
              <article id="--modal-select-city">
                <section className="modal-content-city">
                  <h2 className="modal-title">Select your City</h2>
                  {
                    this.state.cities.map((item, index)=>(
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
                          // appContext.router('/in/' + item.city.toLowerCase())
                          window.location.reload()
                          appContext.actions.setUserContext({
                            city: item.city
                          })
                        }}
                      >
                        <p style={{ margin: '0 auto', cursor: 'pointer', fontWeight: 600 }}
                          onClick={()=>{
                            this.setState({ openLightbox: false })
                            appContext.actions.toggleCityLightbox()
                            // appContext.router('/in/' + item.city.toLowerCase())
                            window.location.reload()
                            appContext.actions.setUserContext({
                              city: item.city
                            })
                          }}
                        >
                          { item.city }
                        </p>
                      </div>
                    ))
                  }
                </section>
              </article>
            </FullscreenModal>
          )
        }
      </RootContext.Consumer>
    )
  }
}
