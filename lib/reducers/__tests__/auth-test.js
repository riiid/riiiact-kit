import reducer from 'reducers/auth';
import {
  requestAuth, receiveAuthSuccess, receiveAuthFailure
} from 'actions/auth';

describe('reducers/auth', () => {

  it('should handle requestAuth()', () => {
    expect(reducer(undefined, requestAuth())).toEqual({
      authenticated: false,
      user: null
    });
  });

  it('should receiveAuthSuccess()', () => {
    expect(reducer(undefined, receiveAuthSuccess({}))).toEqual({
      authenticated: true,
      user: {},
      error: null
    });
  });

  it('should receiveAuthFailure()', () => {
    expect(reducer(undefined, receiveAuthFailure({}))).toEqual({
      authenticated: false,
      user: null,
      error: {}
    });
  });

});
