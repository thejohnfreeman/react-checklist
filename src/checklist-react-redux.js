import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import {mutate} from './mutators.js'

// Actions.

// TODO: Use an object that represents the type of objects for this action?
const TOGGLE_ACTION = {}

// Reducers.

const defaultState = [
  {text: 'a', completed: false},
  {text: 'b', completed: true},
  {text: 'c', completed: false},
]

function reducer(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_ACTION:
      // TODO: Consider immutable.js.
      return mutate(
        state, [action.index, 'completed'],
        (completed) => !completed)
  }
  return state
}

// Action creators.

const toggle = (index) => ({
  type: TOGGLE_ACTION,
  index: index,
})

// Components.

const TodoPresentation = ({text, completed, onCheck}) => (
  <li className="item" style={{backgroundColor: completed ? 'lightgreen' : 'lightcoral'}}>
    <input type="checkbox" checked={completed} onChange={onCheck} />
    {text}
  </li>
)
const mapStateToPropsTodo = (state, props) => (state[props.index])
const mapDispatchToPropsTodo = (dispatch, props) => ({
  onCheck() { dispatch(toggle(props.index)) }
})
const TodoContainer = connect(mapStateToPropsTodo, mapDispatchToPropsTodo)(TodoPresentation)

const TodoListPresentation = ({todos}) => (
  <ul>
    {todos.map((t, i) => <TodoContainer key={i} index={i} />)}
    <li key={-1}>{todos.filter(t => !t.completed).length} items left</li>
  </ul>
)
const mapStateToPropsTodoList = (state) => ({todos: state})
const TodoListContainer = connect(mapStateToPropsTodoList)(TodoListPresentation)

ReactDOM.render(
  <Provider store={createStore(reducer)}><TodoListContainer /></Provider>,
  document.getElementById('checklist-react-redux'))
