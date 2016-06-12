require('./index.css')

if (process.env.NODE_ENV === 'development') {
    require('./index.html')
}

require('./checklist-react.js')
require('./checklist-flux.js')
require('./checklist-redux.js')
require('./checklist-react-redux.js')
