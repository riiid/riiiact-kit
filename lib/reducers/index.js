import {combineReducers} from 'redux';
import app from 'reducers/app';
import auth from 'reducers/auth';
import menu from 'reducers/menu';

const rootReducer = combineReducers({
  app,
  auth,
  menu
});

export default (state, action) => {
  const _state = action.type === 'RECEIVE_SIGNOUT' ? undefined : state;
  return rootReducer(_state, action);
};
