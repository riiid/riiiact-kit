import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
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
    applyMiddleware(thunkMiddleware, logger, epic, router) :
    applyMiddleware(thunkMiddleware, epic, router);
  return createStore(rootReducer, initialState, middleware);
};

