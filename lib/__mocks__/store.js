import configureStore from 'redux-mock-store';

export default (middlewares = [], state = {}) => {
  return configureStore(middlewares)(state);
};
