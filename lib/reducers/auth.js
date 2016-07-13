import {RECEIVE_AUTH_SUCCESS, RECEIVE_AUTH_FAILURE} from 'actions/auth';

const INITIAL_STATE = {
  authenticated: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_AUTH_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: action.user,
        error: null
      };
    case RECEIVE_AUTH_FAILURE:
      return {
        ...state,
        authenticated: false,
        user: null,
        error: action.error
      };
    default:
      return state;
  }
};
