thunkMiddleware = require 'redux-thunk'
createLogger    = require 'redux-logger'
rootReducer     = require '../reducers/rootReducer.coffee'

{ createStore, applyMiddleware } = require 'redux'

loggerMiddleware  = createLogger()

createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

module.exports = (initialState) -> createStoreWithMiddleware rootReducer, initialState
