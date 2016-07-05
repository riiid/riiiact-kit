import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import AppShell from 'components/AppShell';
import App from 'components/App';
import Menu from 'components/Menu';
import Home from 'components/Home';

const router = (
  <Router history={browserHistory}>
    <Route component={AppShell}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/menu" component={Menu}/>
      </Route>
    </Route>
  </Router>
);

export default router;
