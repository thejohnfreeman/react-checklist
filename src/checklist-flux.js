import React from 'react'
import ReactDOM from 'react-dom'
import Flux from 'flux'
import EventEmitter from 'events'
import {mutate} from './mutators.js'

var dispatcher = new Flux.Dispatcher()

// The store is global state.
var state = {items: [
  {text: 'a', completed: false},
  {text: 'b', completed: true},
  {text: 'c', completed: false},
]}

var todoListStore = Object.assign({}, EventEmitter.prototype, {
  // Stores expose non-mutating getters.
  getItems() {
    return state.items
  },
  // Every store needs boilerplate to notify observers.
  CHANGE_EVENT: 'CHANGE',
  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback)
  },
  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback)
  },
  emitChangeEvent() {
    this.emit(this.CHANGE_EVENT)
  },
})

// The actions define mutations on the store.
var TOGGLE_ACTION = 'TOGGLE'

// Actions break a mutating method into send and receive functions:
// - the send functions sends the method name and arguments to the Flux dispatcher
// - the Flux dispatcher serves as a centralized queue for method calls
// - the Flux dispatcher forwards the action to a user-defined dispatcher
// - the user-defined dispatcher calls the receiving function as intended

function sendToggle(index) {
  var action = {
    type: TOGGLE_ACTION,
    index: index,
  }
  dispatcher.dispatch(action)
}

function receieveToggle(index) {
  state.items = mutate(
      state.items, [index, 'completed'],
      (completed) => !completed)
}

function dispatchAction(action) {
  // Throw away the language and do our own method dispatch.
  if (action.type == TOGGLE_ACTION) {
    receieveToggle(action.index)
    // Every recognized action is a change.
    todoListStore.emitChangeEvent()
  }
}

dispatcher.register(dispatchAction)

function Todo(props) {
  // Changes go straight to the dispatcher. On one hand, we don't need
  // callbacks from our parent, but on the other hand, we cannot create
  // multiple components because they all share the global store.
  let onChange = () => sendToggle(props.index)
  return (
    <li className="item" style={{backgroundColor: props.todo.completed ? 'lightgreen' : 'lightcoral'}}>
      <input type="checkbox" checked={props.todo.completed} onChange={onChange} />
      {props.todo.text}
    </li>
  )
}
Todo.propTypes = {
  todo: React.PropTypes.shape({
    completed: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
  }).isRequired,
  index: React.PropTypes.number.isRequired,
}

class TodoList extends React.Component {
  componentDidMount() {
    todoListStore.addChangeListener(this.forceUpdate.bind(this))
  }

  componentWillUnmount() {
    todoListStore.removeChangeListener(this.forceUpdate.bind(this))
  }

  render() {
    return (
      <ul>
        {todoListStore.getItems().map((t, i) => <Todo key={i} todo={t} index={i} />)}
        <li key={-1}>{todoListStore.getItems().filter(t => !t.completed).length} items left</li>
      </ul>
    )
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('checklist-flux'))
