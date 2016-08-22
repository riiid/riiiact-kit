import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import rootReducer from 'reducers';
import rootEpic from 'epics';
import {TARGET} from 'config';

const loggerMiddleware = createLogger();
const epicMiddleware = createEpicMiddleware(rootEpic);

export default (initialState = {}) => {
  const middleware = TARGET === 'development' ?
    applyMiddleware(thunkMiddleware, loggerMiddleware, epicMiddleware) :
    applyMiddleware(thunkMiddleware, epicMiddleware);
  return createStore(rootReducer, initialState, middleware);
};

