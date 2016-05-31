import $ from 'jquery'
import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

function pluralize(n, noun) {
  return noun + ((n == 1) ? '' : 's')
}

var ENTER_KEY = 13
var ESCAPE_KEY = 27

// http://stackoverflow.com/a/512542/618906
function setCaretPosition(elt, pos) {
  if (elt.createTextRange) {
    var range = elt.createTextRange();
    range.move('character', pos);
    range.select();
  }
  else if ('selectionStart' in elt) {
    elt.focus();
    elt.setSelectionRange(pos, pos);
  } else {
    elt.focus();
  }
}

var EditableText = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onChange: React.PropTypes.func,
  },
  getInitialState() {
    return {editing: false}
  },
  handleDoubleClick() {
    this.setState({editing: true, draft: this.props.value})
  },
  handleKeyDown(evt) {
    if (evt.keyCode != ENTER_KEY && evt.keyCode != ESCAPE_KEY) return
    evt.preventDefault()
    var onChange = this.props.onChange
    if (onChange && evt.keyCode == ENTER_KEY) {
      onChange(this.state.draft)
    }
    this.setState({editing: false})
  },
  handleNewDraft(evt) {
    this.setState({draft: evt.target.value})
  },
  handleBlur(evt) {
    var onChange = this.props.onChange
    if (onChange) {
      onChange(this.state.draft)
    }
    this.setState({editing: false})
  },
  componentDidUpdate() {
    var input = this.refs.input
    if (input) setCaretPosition(input, this.state.draft.length)
  },
  render() {
    if (this.state.editing) {
      return (<input type="text" ref="input"
        value={this.state.draft} className={this.props.className}
        onBlur={this.handleBlur}
        onChange={this.handleNewDraft} onKeyDown={this.handleKeyDown} />)
    } else {
      return (<label className={this.props.className}
        onDoubleClick={this.handleDoubleClick}>{this.props.value}</label>)
    }
  }
})

var SHOW_ALL = 0
var SHOW_INCOMPLETE = 1
var SHOW_COMPLETED = 2

var TodoList = React.createClass({
  getInitialState() {
    return {todos: [], nextTodo: '', show: SHOW_ALL}
  },
  setShow(show) {
    this.setState({show: show})
  },
  numTodos() {
    return this.state.todos.length
  },
  incompleteTodos() {
    return this.state.todos.filter(t => !t.completed)
  },
  shownTodos() {
    if (this.state.show == SHOW_INCOMPLETE)
      return this.incompleteTodos()
    if (this.state.show == SHOW_COMPLETED)
      return this.state.todos.filter(t => t.completed)
    return this.state.todos
  },
  anyTodos() {
    return this.numTodos() > 0
  },
  textRemainingTodos() {
    var n = this.incompleteTodos().length
    return n + ' ' + pluralize(n, 'item') + ' left'
  },
  anyCompleted() {
    return this.state.todos.some(t => t.completed)
  },
  allCompleted() {
    return this.state.todos.every(t => t.completed)
  },
  handleChange(evt) {
    this.setState({nextTodo: evt.target.value})
  },
  handleKeyDown(evt) {
    if (evt.keyCode != ENTER_KEY) return
    evt.preventDefault()
    var nextTodo = this.state.nextTodo.trim()
    if (!nextTodo) return
    this.state.todos.push({text: nextTodo, completed: false})
    this.setState({nextTodo: ''})
  },
  handleToggleAll(evt) {
    this.state.todos.forEach(t => t.completed = evt.target.checked)
    this.forceUpdate()
  },
  handleToggleItem(todo, evt) {
    todo.completed = evt.target.checked
    this.forceUpdate()
  },
  handleRemoveItem(todo) {
    this.setState({todos: this.state.todos.filter(t => t != todo)})
  },
  handleClearCompleted() {
    this.setState({todos: this.incompleteTodos()})
  },
  handleTodoEdit(todo, text) {
    todo.text = text
    this.forceUpdate()
  },

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autofocus
            value={this.state.nextTodo}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </header>
        <section className="main" style={this.anyTodos() ? {} : {display: 'none'}}>
          <input id="toggle-all" className="toggle-all" type="checkbox"
            checked={this.anyTodos() && this.allCompleted()}
            onClick={this.handleToggleAll} />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {this.shownTodos().map((todo, i) => { return (
              <li key={i} className={todo.completed ? ['completed'] : []}>
                <div className="view">
                  <input className="toggle" type="checkbox"
                    checked={todo.completed}
                    onChange={this.handleToggleItem.bind(this, todo)} />
                  <EditableText value={todo.text} className="editable-text"
                    onChange={this.handleTodoEdit.bind(this, todo)} />
                  <button className="destroy"
                    onClick={this.handleRemoveItem.bind(this, todo)}></button>
                </div>
              </li>
            )})}
          </ul>
        </section>
        <footer className="footer" style={this.anyTodos() ? {} : {display: 'none'}}>
          <span className="todo-count">{this.textRemainingTodos()} </span>
          <ul className="filters">
            <li>
              <a href="#/"
                onClick={this.setShow.bind(this, SHOW_ALL)}
                className={(this.state.show == SHOW_ALL) ? ['selected'] : []}>
                All
              </a>
            </li>
            <li>
              <a href="#/active"
                onClick={this.setShow.bind(this, SHOW_INCOMPLETE)}
                className={(this.state.show == SHOW_INCOMPLETE) ? ['selected'] : []}>
                Active
              </a>
            </li>
            <li>
              <a href="#/completed"
                onClick={this.setShow.bind(this, SHOW_COMPLETED)}
                className={(this.state.show == SHOW_COMPLETED) ? ['selected'] : []}>
                Completed
              </a>
            </li>
          </ul>
          <button className="clear-completed"
            style={this.anyCompleted() ? {} : {display: 'none'}}
            onClick={this.handleClearCompleted} >
            Clear completed
          </button>
        </footer>
      </section>
    )
  }
})

module.exports = TodoList
