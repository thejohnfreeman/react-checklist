import React from 'react'
import ReactDOM from 'react-dom'
import {connect, Provider} from 'react-redux'
import {createStore} from 'redux'
import {mutate} from './mutators.js'

const defaultState = [
  {text: 'a', completed: false},
  {text: 'b', completed: true},
  {text: 'c', completed: false},
]

const TOGGLE_ACTION = 'TOGGLE'

function reducer(state = defaultState, action) {
  if (action.type === TOGGLE_ACTION) {
    return mutate(
      state, [action.index, 'completed'],
      (completed) => !completed)
  }
  return state
}

const store = createStore(reducer)

function toggle(index) {
  return {
    type: TOGGLE_ACTION,
    index: index,
  }
}

const TodoTemplate = ({text, completed, onCheck}) => (
  <li className="item" style={{backgroundColor: completed ? 'lightgreen' : 'lightcoral'}}>
    <input type="checkbox" checked={completed} onChange={onCheck} />
    {text}
  </li>
)

const mapStateToPropsTodo = (state, props) => (state[props.index])
const mapDispatchToPropsTodo = (dispatch, props) => ({
  onCheck: () => dispatch(toggle(props.index))
})
const Todo = connect(mapStateToPropsTodo, mapDispatchToPropsTodo)(TodoTemplate)

const TodoListTemplate = ({todos}) => (
  <ul>
    {todos.map((t, i) => <Todo key={i} index={i} />)}
    <li key={-1}>{todos.filter(t => !t.completed).length} items left</li>
  </ul>
)
const mapStateToPropsTodoList = (state) => ({todos: state})
const TodoList = connect(mapStateToPropsTodoList)(TodoListTemplate)

ReactDOM.render(
  <Provider store={store}><TodoList /></Provider>,
  document.getElementById('checklist-react-redux'))
