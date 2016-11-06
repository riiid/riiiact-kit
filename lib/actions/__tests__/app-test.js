import {
  TOGGLE_DRAWER,
  SHOW_SNACKBAR, HIDE_SNACKBAR,
  SHOW_PROGRESS, HIDE_PROGRESS,
  SHOW_TOOLBAR, HIDE_TOOLBAR,
  toggleDrawer,
  showSnackbar, hideSnackbar,
  showProgress, hideProgress,
  showToolbar, hideToolbar
} from 'actions/app';

describe('actions/app', () => {

  it('should create an action to toggle drawer', () => {
    expect(toggleDrawer()).toEqual({
      type: TOGGLE_DRAWER
    });
  });

  it('should create an action to show snackbar', () => {
    expect(showSnackbar('MESSAGE', {})).toEqual({
      type: SHOW_SNACKBAR,
      message: 'MESSAGE',
      props: {}
    });
  });

  it('should create an action to hide snackbar', () => {
    expect(hideSnackbar()).toEqual({
      type: HIDE_SNACKBAR
    });
  });

  it('should create an action to show toolbar', () => {
    expect(showToolbar()).toEqual({
      type: SHOW_TOOLBAR
    });
  });

  it('should create an action to hide toolbar', () => {
    expect(hideToolbar()).toEqual({
      type: HIDE_TOOLBAR
    });
  });

});
