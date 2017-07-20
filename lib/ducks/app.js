export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const SHOW_PROGRESS = 'SHOW_PROGRESS';
export const HIDE_PROGRESS = 'HIDE_PROGRESS';

export const SHOW_TOOLBAR = 'SHOW_TOOLBAR';
export const HIDE_TOOLBAR = 'HIDE_TOOLBAR';

export const FIREBASE_AVAILABLE = 'FIREBASE_AVAILAVLE';

export const toggleDrawer = () => {
  return {
    type: TOGGLE_DRAWER
  };
};

export const showSnackbar = (message, props = {}) => {
  return {
    type: SHOW_SNACKBAR,
    message,
    props
  };
};

export const hideSnackbar = () => {
  return {
    type: HIDE_SNACKBAR
  };
};

export const showProgress = () => {
  return {
    type: SHOW_PROGRESS
  };
};

export const hideProgress = () => {
  return {
    type: HIDE_PROGRESS
  };
};

export const showToolbar = () => {
  return {
    type: SHOW_TOOLBAR
  };
};

export const hideToolbar = () => {
  return {
    type: HIDE_TOOLBAR
  };
};

export const firebaseAvailable = available => {
  return {
    type: FIREBASE_AVAILABLE,
    available
  };
};

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
