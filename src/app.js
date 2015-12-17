require('semantic-ui-css/semantic.css')
require('./style.css')

// Have to include jQuery for Semantic
window.jQuery = require('jquery')
require('semantic-ui-css/semantic.js')

import React from 'react'
import ReactDOM from 'react-dom'
import App from 'content.js'

ReactDOM.render(<App />,  document.getElementById('content'))

