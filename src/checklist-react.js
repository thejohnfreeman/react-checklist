import React from 'react'
import ReactDOM from 'react-dom'
import {mutate} from './mutators.js'

function Todo(props) {
  // Changes go straight to the dispatcher. On one hand, we don't need
  // callbacks from our parent, but on the other hand, we cannot create
  // multiple components because they all share the global store.
  return (
    <li className="item" style={{backgroundColor: props.todo.completed ? 'lightgreen' : 'lightcoral'}}>
      <input type="checkbox" checked={props.todo.completed} onChange={props.onChange} />
      {props.todo.text}
    </li>
  )
}
Todo.propTypes = {
  todo: React.PropTypes.shape({
    completed: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
}

class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {items: [
      {text: 'a', completed: false},
      {text: 'b', completed: true},
      {text: 'c', completed: false},
    ]}
  }

  toggle = (index) => {
    this.setState((state) => mutate(state,
      ['items', index, 'completed'],
      (completed) => !completed))
  }

  render() {
    return (
      <ul>
        {this.state.items.map((t, i) => <Todo key={i} todo={t} onChange={() => this.toggle(i)} />)}
        <li key={-1}>{this.state.items.filter(t => !t.completed).length} items left</li>
      </ul>
    )
  }
}

ReactDOM.render(<TodoList/>, document.getElementById('checklist-react'))
