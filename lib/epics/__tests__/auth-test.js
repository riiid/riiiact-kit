jest.mock('api');
jest.mock('store');

import Rx from 'rxjs';
import createStore from 'store';
import {requestAuth } from 'actions/auth';
import {createEpicMiddleware} from 'redux-observable';
import {authEpic} from 'epics/auth';
import {firebase} from 'api';

describe('epics/auth', () => {
  let store;

  beforeEach(() => store = createStore([createEpicMiddleware(authEpic)]));

  it('when requestAuth success', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Rx.Observable.of({uid: 'UID', isAnonymouse: true});
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should call signInAnonymousely when requestAuth with null user', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Rx.Observable.of(null);
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toMatchSnapshot();
    expect(firebase.auth.signInAnonymously).toHaveBeenCalled();
  });

  it('when requestAuth fail', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Rx.Observable.throw(new Error('ERROR'));
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toMatchSnapshot();
  });
});
