import React, {Component} from 'react';

export default (node, context, childContextTypes) => {
  /* eslint react/display-name: 0 */
  class Wrapper extends Component {
    getChildContext() {
      return context;
    }

    render() {
      return node;
    }
  }
  Wrapper.childContextTypes = childContextTypes;
  return <Wrapper/>;
};
