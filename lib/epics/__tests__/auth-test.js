jest.mock('api');
jest.mock('store');

import Rx from 'rxjs';
import createStore from 'store';
import {
  REQUEST_AUTH, RECEIVE_AUTH_SUCCESS, RECEIVE_AUTH_FAILURE, requestAuth
} from 'actions/auth';
import {SHOW_PROGRESS, HIDE_PROGRESS, SHOW_SNACKBAR} from 'actions/app';
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
    expect(store.getActions()).toEqual([
      {type: REQUEST_AUTH},
      {type: SHOW_PROGRESS},
      {type: HIDE_PROGRESS},
      {
        type: RECEIVE_AUTH_SUCCESS,
        user: {uid: 'UID', isAnonymouse: true}
      }
    ]);
  });

  it('should call signInAnonymousely when requestAuth with null user', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Rx.Observable.of(null);
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toEqual([
      {type: REQUEST_AUTH},
      {type: SHOW_PROGRESS},
      {
        type: RECEIVE_AUTH_SUCCESS,
        user: null
      }
    ]);
    expect(firebase.auth.signInAnonymously).toHaveBeenCalled();
  });

  it('when requestAuth fail', () => {
    firebase.auth.onAuthStateChanged$
    .mockImplementationOnce(() => {
      return Rx.Observable.throw(new Error('ERROR'));
    });

    store.dispatch(requestAuth());
    expect(store.getActions()).toEqual([
      {type: REQUEST_AUTH},
      {type: SHOW_PROGRESS},
      {type: HIDE_PROGRESS},
      {
        type: SHOW_SNACKBAR,
        message: '로그인 중 오류 발생',
        props: {}
      },
      {
        type: RECEIVE_AUTH_FAILURE,
        error: new Error('ERROR')
      }
    ]);
  });
});
