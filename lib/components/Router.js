import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import App from 'components/App';
import Menu from 'components/Menu';
import Home from 'components/Home';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/menu" component={Menu}/>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

export default router;
