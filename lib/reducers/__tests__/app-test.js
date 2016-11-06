import reducer from 'reducers/app';
import {
  toggleDrawer,
  showSnackbar, hideSnackbar,
  showProgress, hideProgress,
  showToolbar, hideToolbar
} from 'actions/app';

describe('reducers/app', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      drawerOpen: false,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: true
    });
  });

  it('should handle toggleDrawer()', () => {
    expect(reducer(undefined, toggleDrawer())).toEqual({
      drawerOpen: true,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: true
    });
  });

  it('should handle showSnackbar()', () => {
    expect(reducer(undefined, showSnackbar('MESSAGE', {prop: 'PROP'}))).toEqual({
      drawerOpen: false,
      snackbar: {
        message: 'MESSAGE',
        prop: 'PROP',
        open: true
      },
      toolbar: true
    });
  });

  it('should handle hideSnakcbar()', () => {
    expect(reducer(undefined, hideSnackbar())).toEqual({
      drawerOpen: false,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: true
    });
  });

  it('should handle showProgress()', () => {
    expect(reducer(undefined, showProgress())).toEqual({
      drawerOpen: false,
      progress: true,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: true
    });
  });

  it('should handle hideProgress()', () => {
    expect(reducer(undefined, hideProgress())).toEqual({
      drawerOpen: false,
      progress: false,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: true
    });
  });

  it('should handle showToolbar()', () => {
    expect(reducer(undefined, showToolbar())).toEqual({
      drawerOpen: false,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: true
    });
  });

  it('should handle hideToolbar()', () => {
    expect(reducer(undefined, hideToolbar())).toEqual({
      drawerOpen: false,
      snackbar: {
        message: '',
        open: false
      },
      toolbar: false
    });
  });
});
