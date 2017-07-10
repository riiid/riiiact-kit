import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from 'reducers';
import rootEpic from 'epics';
import {TARGET} from 'config';

const logger = createLogger();
const epic = createEpicMiddleware(rootEpic);
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
  }

  return store;
};

