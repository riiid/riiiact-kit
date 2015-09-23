_ = require 'lodash'

{ combineReducers } = require 'redux'
{ REQUEST_POSTS, RECEIVE_POSTS } = require '../actions/index.coffee'

posts = (state = {}, action) ->
  switch action.type
    when REQUEST_POSTS then _.assign {}, state, {}
    when RECEIVE_POSTS then _.assign {}, state, {}
    else state

module.exports = combineReducers
  posts: posts
