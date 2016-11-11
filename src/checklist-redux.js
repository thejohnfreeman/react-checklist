import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {mutate} from './mutators.js'

var defaultItems = [
  {text: 'a', completed: false},
  {text: 'b', completed: true},
  {text: 'c', completed: false},
]

var TOGGLE_ACTION = 'TOGGLE'

function reducer(state = defaultItems, action) {
  if (action.type === TOGGLE_ACTION) {
    return mutate(
      state, [action.index, 'completed'],
      (completed) => !completed)
  }
  return state
}

var todoListStore = createStore(reducer)

function sendToggle(index) {
  var action = {
    type: TOGGLE_ACTION,
    index: index,
  }
  todoListStore.dispatch(action)
}

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

function TodoList() {
  return (<ul>
    {todoListStore.getState().map((t, i) => <Todo key={i} todo={t} index={i} />)}
    <li key={-1}>{todoListStore.getState().filter(t => !t.completed).length} items left</li>
  </ul>)
}

function render() {
  ReactDOM.render(<TodoList/>, document.getElementById('checklist-redux'))
}
todoListStore.subscribe(render)
render()
