import {
  TOGGLE_DRAWER,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_PROGRESS,
  HIDE_PROGRESS,
  SHOW_TOOLBAR,
  HIDE_TOOLBAR
} from 'actions/app';

const INITIAL_STATE = {
  toolbar: true,
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
    case SHOW_TOOLBAR:
      return {
        ...state,
        toolbar: true
      };
    case HIDE_TOOLBAR:
      return {
        ...state,
        toolbar: false
      };
    default:
      return state;
  }
};
