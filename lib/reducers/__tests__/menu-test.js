import reducer from 'reducers/menu';
import {
  requestMenu, receiveMenuSuccess, receiveMenuFailure
} from 'actions/menu';

describe('actions/menu', () => {

  it('should handle requestMenu()', () => {
    expect(reducer(undefined, requestMenu())).toEqual({
      count: {
        currentViews: 0,
        totalViews: 0
      }
    });
  });

  it('should receiveMenuSuccess', () => {
    expect(reducer(undefined, receiveMenuSuccess({
      currentViews: 0,
      totalViews: 0
    }))).toEqual({
      count: {
        currentViews: 0,
        totalViews: 0
      },
      error: null
    });
  });

  it('should receiveMenuFailure', () => {
    expect(reducer(undefined, receiveMenuFailure({}))).toEqual({
      count: {
        currentViews: 'N/A',
        totalViews: 'N/A'
      },
      error: {}
    });
  });

});
