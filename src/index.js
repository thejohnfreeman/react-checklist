require('./index.css')

if (process.env.NODE_ENV === 'development') {
    require('./index-template.html')
}

import React from 'react'
import ReactDOM from 'react-dom'
import Component from './checklist-react.js'

ReactDOM.render(<Component/>,  document.getElementById('content'))

