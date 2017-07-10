import reducer from 'reducers/app';
import {
  toggleDrawer,
  showSnackbar, hideSnackbar,
  showProgress, hideProgress,
  showToolbar, hideToolbar
} from 'actions/app';

describe('reducers/app', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle toggleDrawer()', () => {
    expect(reducer(undefined, toggleDrawer())).toMatchSnapshot();
  });

  it('should handle showSnackbar()', () => {
    expect(
      reducer(undefined, showSnackbar('MESSAGE', {prop: 'PROP'}))
    ).toMatchSnapshot();
  });

  it('should handle hideSnakcbar()', () => {
    expect(reducer(undefined, hideSnackbar())).toMatchSnapshot();
  });

  it('should handle showProgress()', () => {
    expect(reducer(undefined, showProgress())).toMatchSnapshot();
  });

  it('should handle hideProgress()', () => {
    expect(reducer(undefined, hideProgress())).toMatchSnapshot();
  });

  it('should handle showToolbar()', () => {
    expect(reducer(undefined, showToolbar())).toMatchSnapshot();
  });

  it('should handle hideToolbar()', () => {
    expect(reducer(undefined, hideToolbar())).toMatchSnapshot();
  });
});
