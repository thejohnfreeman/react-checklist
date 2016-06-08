import React from 'react'
import { createStore } from 'redux'

var defaultItems = [
  {text: 'a', completed: false},
  {text: 'b', completed: true},
  {text: 'c', completed: false},
]

var TOGGLE_ACTION = 'TOGGLE'

function reducer(state = defaultItems, action) {
  var newState = [...state]
  if (action.type == TOGGLE_ACTION) {
    var index = action.index
    var todo = state[index]
    newState[index] = Object.assign({}, todo, { completed: !todo.completed })
  }
  return newstate
}

var todoListStore = createStore(reducer)

function sendToggle(index) {
  var action = {
    type: TOGGLE_ACTION,
    index: index,
  }
  todoListStore.dispatch(action)
}

var Todo = React.createClass({
  onChange() {
    // Changes go straight to the dispatcher. On one hand, we don't need
    // callbacks from our parent, but on the other hand, we cannot create
    // multiple components because they all share the global store.
    sendToggle(this.props.index)
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
    todoListStore.subscribe(this.forceUpdate.bind(this))
  },
  componentWillUnmount() {
    todoListStore.unsubscribe(this.forceUpdate.bind(this))
  },
  render() {
    return (<ul>
      {todoListStore.getState().map((t, i) => <Todo key={i} todo={t} index={i} />)}
      <li key={-1}>{todoListStore.getState().filter(t => !t.completed).length} items left</li>
      </ul>)
  }
})

module.exports = TodoList
