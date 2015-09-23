React = require 'react'
App   = require './containers/App.coffee'

{ Provider } = require 'react-redux'

configureStore = require './store/configureStore.coffee'

store = configureStore()

React.render(
  <Provider store={store}>
    {() -> <App />}
  </Provider>
  , document.querySelector '#app')
