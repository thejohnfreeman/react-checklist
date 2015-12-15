import React from 'react'

var ButtonForm = React.createClass({
    render: function(){
        return (
            <div>
                <input type="submit" onClick={this.props.onUserClick} />
                <h3>You have pressed the button {this.props.counter} times!</h3>
            </div>
        )
    }
})
var App = React.createClass({
    getInitialState: function(){
        return {
            counter: 0
        }
    },
    onUserClick: function(){
        var newCount = this.state.counter += 1
        this.setState({
            counter: newCount
        })
    },
    render: function(){
        return (
            <div>
                <h1>Hello, world!</h1>
                <ButtonForm counter={this.state.counter} onUserClick={this.onUserClick} />
            </div>
        )
    }
})

module.exports = App
