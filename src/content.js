import $ from 'jquery'
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
        return {value: ''}
    },
    render() {
        return (
            <div>
              <div className="ui fluid search selection dropdown"
              ref={(elt) => $(elt).dropdown({
                onChange: (value) => this.setState({value: value})
              })}>
                <input type="hidden" name="country"/>
                <i className="dropdown icon"></i>
                <div className="default text">Select Country</div>
                <div className="menu">
                  <div className="item" data-value="fi"><i className="fi flag"></i>Finland</div>
                  <div className="item" data-value="de"><i className="de flag"></i>Germany</div>
                  <div className="item" data-value="mx"><i className="mx flag"></i>Mexico</div>
                  <div className="item" data-value="us"><i className="us flag"></i>United States</div>
                  <div className="item" data-value="vn"><i className="vn flag"></i>Vietnam</div>
                </div>
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
