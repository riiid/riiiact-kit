import configureStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const INITIAL_STATE = {
};

const MIDDLEWARES = [thunkMiddleware];

export default (middlewares = MIDDLEWARES, state = INITIAL_STATE) => {
  return configureStore(middlewares)(state);
};
