import React from 'react'
import ReactDOM from 'react-dom'

import './styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import WebsiteController from './app/Website'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<WebsiteController />, document.getElementById('root'))
// serviceWorker.register()