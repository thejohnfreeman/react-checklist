import React from 'react'
import Flux from 'flux'
import EventEmitter from 'events'

var dispatcher = new Flux.Dispatcher()

// The store is global state.
var items = [
  {text: 'a', completed: false},
  {text: 'b', completed: true},
  {text: 'c', completed: false},
]

var todoListStore = Object.assign({}, EventEmitter.prototype, {
  // Stores expose non-mutating getters.
  getItems() {
    return items
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

function sendToggle(todo) {
  var action = {
    type: TOGGLE_ACTION,
    args: [todo],
  }
  dispatcher.dispatch(action)
}

function receieveToggle(todo) {
  todo.completed = !todo.completed
}

function dispatchAction(action) {
  // Throw away the language and do our own method dispatch.
  if (action.type == TOGGLE_ACTION) {
    receieveToggle.apply(todoListStore, action.args)
    // Every recognized action is a change.
    todoListStore.emitChangeEvent()
  }
}

dispatcher.register(dispatchAction)

var Todo = React.createClass({
  onChange() {
    // Changes go straight to the dispatcher. On one hand, we don't need
    // callbacks from our parent, but on the other hand, we cannot create
    // multiple components because they all share the global store.
    sendToggle(this.props.todo)
  },
  render() {
    return (
      <li className="item" style={{backgroundColor: this.props.todo.completed ? 'lightgreen' : 'lightcoral'}}>
        <input type="checkbox" checked={this.props.todo.completed} onChange={this.onChange} />
        {this.props.todo.text}
      </li>
    )
  }
})

var TodoList = React.createClass({
  componentDidMount() {
    todoListStore.addChangeListener(this.forceUpdate.bind(this))
  },
  componentWillUnmount() {
    todoListStore.removeChangeListener(this.forceUpdate.bind(this))
  },
  render() {
    return (<ul>
      {todoListStore.getItems().map((t, k) => <Todo key={k} todo={t} toggle={this.toggle} />)}
      <li key={-1}>{todoListStore.getItems().filter(t => !t.completed).length} items left</li>
      </ul>)
  }
})

module.exports = TodoList
