import {
  TOGGLE_DRAWER,
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
  SHOW_PROGRESS,
  HIDE_PROGRESS,
  SHOW_TOOLBAR,
  HIDE_TOOLBAR,
  FIREBASE_AVAILABLE
} from 'actions/app';

const INITIAL_STATE = {
  toolbar: true,
  drawerOpen: false,
  snackbar: {
    open: false,
    message: ''
  },
  firebaseAvailable: false
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
    case FIREBASE_AVAILABLE:
      return {
        ...state,
        firebaseAvailable: action.available
      };
    default:
      return state;
  }
};
