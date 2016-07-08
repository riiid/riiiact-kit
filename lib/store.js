import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';
import {TARGET} from 'config';

const loggerMiddleware = createLogger();

export default (initialState = {}) => {
  const middleware = TARGET === 'development' ?
    applyMiddleware(thunkMiddleware, loggerMiddleware) :
    applyMiddleware(thunkMiddleware);
  return createStore(rootReducer, initialState, middleware);
};

