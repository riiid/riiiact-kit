jest.mock('api');
jest.mock('store');

import {Observable} from 'rxjs';
import createStore from 'store';
import {requestAuth} from 'actions/auth';
import {createEpicMiddleware} from 'redux-observable';
import {auth$$} from 'epics/auth';
import {firebase} from 'api';

describe('epics/auth', () => {
  let store;

  beforeEach(() => {
    store = createStore([
      createEpicMiddleware(auth$$, {dependencies: {firebase}})
    ])
  });

  it('when requestAuth success', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Observable.of({uid: 'UID', isAnonymouse: true});
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should call signInAnonymousely when requestAuth with null user', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Observable.of(null);
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toMatchSnapshot();
    expect(firebase.auth.signInAnonymously).toHaveBeenCalled();
  });

  it('when requestAuth fail', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Observable.throw(new Error('ERROR'));
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toMatchSnapshot();
  });
});
