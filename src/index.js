require('./index.css')

if (process.env.NODE_ENV === 'development') {
    require('./index.html')
}

import React from 'react'
import ReactDOM from 'react-dom'
import CheckListReact from './checklist-react.js'
import CheckListFlux from './checklist-flux.js'

ReactDOM.render(<CheckListReact/>,  document.getElementById('checklist-react'))
ReactDOM.render(<CheckListFlux/>,  document.getElementById('checklist-flux'))

