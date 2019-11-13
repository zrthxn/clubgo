import React, { Component } from 'react'
import { IEventModel } from '@clubgo/database'

/**
 * @description
 * To the future developer(s) on this project
 * This is a very 
 */

interface WebsiteSSRProps {
  featured: IEventModel[]
}

export default class Website extends Component<WebsiteSSRProps> {
  render() {
    return (
      <article>
        <section>
          {
            this.props.featured.map((item:IEventModel)=>(
              <div>
                <img src={item.media.images[0].url} alt=""/>
              </div>
            ))
          }
        </section>
      </article>
    )
  }
}
