React = require 'react'
E     = require 'react-emoji'

el    = document.querySelector '#app'

React.render <h1>Howdy {E.emojify(':monkey_face:')}</h1>, el
