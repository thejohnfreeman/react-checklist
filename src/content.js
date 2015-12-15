import React from 'react'
import LinkedStateMixin from 'react-addons-linked-state-mixin'

var ButtonForm = React.createClass({
    render() {
        return (
            <div>
                <input type="submit" onClick={this.props.onUserClick} />
                <h3>You have pressed the button {this.props.counter} times!</h3>
            </div>
        )
    }
})

var DictionarySelector = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState() {
        return  {value: ''}
    },
    render() {
        return (
            <div className="ui form" style={{marginTop:'55px'}}>
                <div className="field">
                    <select className="ui dropdown" valueLink={this.linkState('value')}>
                        <option value="">Select Dictionary</option>
                        <option value="1">Dictionary 1</option>
                        <option value="2">Dictionary 2</option>
                    </select>
                </div>
                <p>You selected: {this.state.value}</p>
            </div>
        )
    }
})

var App = React.createClass({
    getInitialState() {
        return {
            counter: 0
        }
    },
    onUserClick() {
        this.setState({
            counter: this.state.counter + 1
        })
    },
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <ButtonForm counter={this.state.counter} onUserClick={this.onUserClick} />
                <DictionarySelector />
            </div>
        )
    }
})

module.exports = App
