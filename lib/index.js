import 'style/index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import injectTabEventPlugin from 'react-tap-event-plugin';
import router from 'components/Router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import configureStore from 'store';
import {AppContainer} from 'react-hot-loader';

injectTabEventPlugin();

const store = configureStore();

const render = root => {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          {root(store)}
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(router);

if (module.hot) {
  module.hot.accept('./components/Router', () => {
    const nextRouter = require('./components/Router').default;
    render(nextRouter);
  });
}
