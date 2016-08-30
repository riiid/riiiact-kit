import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import AppShell from 'components/AppShell';
import App from 'components/App';
import Menu from 'components/Menu';
import Home from 'components/Home';

const router = store => {
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Router history={history}>
      <Route component={AppShell}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/menu" component={Menu}/>
        </Route>
      </Route>
    </Router>
  );
};

export default router;
