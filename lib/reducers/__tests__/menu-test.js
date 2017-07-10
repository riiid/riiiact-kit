import reducer from 'reducers/menu';
import {
  requestMenu, receiveMenuSuccess, receiveMenuFailure
} from 'actions/menu';

describe('actions/menu', () => {
  it('should handle requestMenu()', () => {
    expect(reducer(undefined, requestMenu())).toMatchSnapshot();
  });

  it('should receiveMenuSuccess', () => {
    expect(reducer(undefined, receiveMenuSuccess({
      currentViews: 0,
      totalViews: 0
    }))).toMatchSnapshot();
  });

  it('should receiveMenuFailure', () => {
    expect(reducer(undefined, receiveMenuFailure({}))).toMatchSnapshot();
  });
});
