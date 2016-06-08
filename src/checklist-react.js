import React from 'react'

var Todo = React.createClass({
  render() {
    return (
      <li className="item" style={{backgroundColor: this.props.todo.completed ? 'lightgreen' : 'lightcoral'}}>
        <input type="checkbox" checked={this.props.todo.completed} onChange={this.props.onChange} />
        {this.props.todo.text}
      </li>
    )
  }
})

var TodoList = React.createClass({
  getInitialState() {
    return {items: [
      {text: 'a', completed: false},
      {text: 'b', completed: true},
      {text: 'c', completed: false},
    ]}
  },
  toggle(index) {
    var todo = this.state.items[index]
    todo.completed = !todo.completed
    this.forceUpdate()
  },
  render() {
    return (
      <ul>
        {this.state.items.map((t, i) => <Todo key={i} todo={t} onChange={() => this.toggle(i)} />)}
        <li key={-1}>{this.state.items.filter(t => !t.completed).length} items left</li>
      </ul>
    )
  }
})

module.exports = TodoList
