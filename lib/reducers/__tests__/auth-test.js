import reducer from 'reducers/auth';
import {
  requestAuth, receiveAuthSuccess, receiveAuthFailure
} from 'actions/auth';

describe('reducers/auth', () => {

  it('should handle requestAuth()', () => {
    expect(reducer(undefined, requestAuth())).toMatchSnapshot();
  });

  it('should receiveAuthSuccess()', () => {
    expect(reducer(undefined, receiveAuthSuccess({}))).toMatchSnapshot();
  });

  it('should receiveAuthFailure()', () => {
    expect(reducer(undefined, receiveAuthFailure({}))).toMatchSnapshot();
  });

});
