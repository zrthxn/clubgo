import React from 'react'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'

import './Header.scss'

export default function Header() {
  return (
    <header>
      <section className="container">
        <h1 id="site-title">ClubGo</h1>

        <div style={{ margin: 'auto 0.5em auto auto' }}>
          <Textbox spellCheck={false} placeholder="Search" margins="dense"/>
        </div>
      </section>
    </header>
  )
}
