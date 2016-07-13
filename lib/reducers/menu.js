import {RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE} from 'actions/menu';

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
