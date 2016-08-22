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
