export const REQUEST_MENU = 'REQUEST_MENU';
export const RECEIVE_MENU_SUCCESS = 'RECIEVE_MENU_SUCCESS';
export const RECEIVE_MENU_FAILURE = 'RECIEVE_MENU_FAILURE';

export const requestMenu = () => ({type: REQUEST_MENU});

export const receiveMenuSuccess = data => {
  return {
    type: RECEIVE_MENU_SUCCESS,
    data
  };
};

export const receiveMenuFailure = error => {
  return {
    type: RECEIVE_MENU_FAILURE,
    error
  };
};
