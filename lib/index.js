import 'style/index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import router from 'components/Router';
import injectTabEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import configureStore from 'store';

injectTabEventPlugin();

const store = configureStore();
const Root = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        {router(store)}
      </MuiThemeProvider>
    </Provider>
  );
};

Root.displayName = 'Root';

ReactDom.render(<Root/>, document.getElementById('app'));
