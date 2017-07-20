export const REQUEST_AUTH = 'REQUEST_AUTH';
export const RECEIVE_AUTH_SUCCESS = 'RECIEVE_AUTH_SUCCESS';
export const RECEIVE_AUTH_FAILURE = 'RECIEVE_AUTH_FAILURE';

export const requestAuth = () => ({type: REQUEST_AUTH});

export const receiveAuthSuccess = user => {
  return {
    type: RECEIVE_AUTH_SUCCESS,
    user
  };
};

export const receiveAuthFailure = error => {
  return {
    type: RECEIVE_AUTH_FAILURE,
    error
  };
};

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
