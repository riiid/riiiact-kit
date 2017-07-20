import reducer, {
  requestAuth, receiveAuthSuccess, receiveAuthFailure
} from 'ducks/auth';

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
