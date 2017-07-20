import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import app from 'ducks/app';
import auth from 'ducks/auth';
import menu from 'ducks/menu';

const rootReducer = combineReducers({
  app,
  auth,
  menu,
  routing: routerReducer
});

export default (state, action) => {
  const _state = action.type === 'RECEIVE_SIGNOUT' ? undefined : state;
  return rootReducer(_state, action);
};
