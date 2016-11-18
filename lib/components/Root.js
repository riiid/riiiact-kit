import React from 'react';
import router from 'components/Router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';
import configureStore from 'store';

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

export default Root;
