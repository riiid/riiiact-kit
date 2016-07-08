import {
  TOGGLE_DRAWER,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_PROGRESS,
  HIDE_PROGRESS
} from 'actions/app';

const INITIAL_STATE = {
  drawerOpen: false,
  snackbar: {
    open: false,
    message: ''
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen,
        snackbar: {
          open: false,
          message: ''
        }
      };
    case SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
          ...action.props
        }
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: false,
          message: ''
        }
      };
    case SHOW_PROGRESS:
      return {
        ...state,
        progress: true
      };
    case HIDE_PROGRESS:
      return {
        ...state,
        progress: false
      };
    default:
      return state;
  }
};
