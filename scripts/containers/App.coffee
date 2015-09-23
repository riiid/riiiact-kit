React = require 'react'
E     = require 'react-emoji'

{ connect } = require 'react-redux'
{ fetchPosts } = require '../actions/index.coffee'

App = React.createClass

  render: ->
    <div>
      <h1>Howdy {E.emojify(':monkey_face:')}</h1>
    </div>

mapStateToProps = (state) -> {}

module.exports = connect(mapStateToProps)(App)
