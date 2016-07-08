import {combineReducers} from 'redux';
import app from 'reducers/app';

const rootReducer = combineReducers({
  app
});

export default (state, action) => {
  const _state = action.type === 'RECEIVE_SIGNOUT' ? undefined : state;
  return rootReducer(_state, action);
};
