import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from 'reducers';
import rootEpic from 'epics';
import {TARGET} from 'config';
import {firebase} from 'api';

const epic = createEpicMiddleware(rootEpic, {
  dependencies: {
    firebase
  }
});
const router = routerMiddleware(browserHistory);

export default (initialState = {}) => {
  const middleware = TARGET === 'development' ?
    applyMiddleware(logger, epic, router) :
    applyMiddleware(epic, router);
  const store = createStore(rootReducer, initialState, middleware);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const next = require('./reducers').default;
      store.replaceReducer(next);
    });

    module.hot.accept('./epics', () => {
      const next = require('./epics').default;
      store.replaceEpic(next);
    });
  }

  return store;
};

