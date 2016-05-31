require('todomvc-common/base.css')
require('todomvc-app-css/index.css')
require('./editable-text.css')

if (process.env.NODE_ENV === 'development') {
    require('./template.html')
}

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'content.js'

ReactDOM.render(<App/>,  document.getElementById('content'))

