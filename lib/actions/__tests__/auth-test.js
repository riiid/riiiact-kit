import {
  REQUEST_AUTH,
  RECEIVE_AUTH_SUCCESS,
  RECEIVE_AUTH_FAILURE,
  requestAuth, receiveAuthSuccess, receiveAuthFailure
} from 'actions/auth';

describe('actions/auth', () => {

  it('should create an action to request auth', () => {
    expect(requestAuth()).toEqual({
      type: REQUEST_AUTH
    });
  });

  it('should create an action to receive auth success', () => {
    expect(receiveAuthSuccess({})).toEqual({
      type: RECEIVE_AUTH_SUCCESS,
      user: {}
    });
  });

  it('should create an action to receive auth failure', () => {
    expect(receiveAuthFailure({})).toEqual({
      type: RECEIVE_AUTH_FAILURE,
      error: {}
    });
  });
});
