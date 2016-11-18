import 'style/index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import injectTabEventPlugin from 'react-tap-event-plugin';
import Root from 'components/Root';
import {AppContainer} from 'react-hot-loader';

injectTabEventPlugin();

ReactDom.render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const Next = require('./components/Root').default;
    ReactDom.render(
      <AppContainer>
        <Next/>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
