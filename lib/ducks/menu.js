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

const INITIAL_STATE = {
  count: {
    totalViews: 0,
    currentViews: 0
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECEIVE_MENU_SUCCESS:
      return {
        ...state,
        count: action.data,
        error: null
      };
    case RECEIVE_MENU_FAILURE:
      return {
        ...state,
        count: {
          totalViews: 'N/A',
          currentViews: 'N/A'
        },
        error: action.error
      };
    default:
      return state;
  }
};
