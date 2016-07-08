export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const HIDE_SNACKBAR = 'HIDE_SNACKBAR';

export const SHOW_PROGRESS = 'SHOW_PROGRESS';
export const HIDE_PROGRESS = 'HIDE_PROGRESS';

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

