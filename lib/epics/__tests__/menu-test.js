jest.mock('api');
jest.mock('store');

import Rx from 'rxjs';
import createStore from 'store';
import {
  requestMenu, REQUEST_MENU, RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE
} from 'actions/menu';
import {SHOW_PROGRESS, HIDE_PROGRESS, SHOW_SNACKBAR} from 'actions/app';
import {createEpicMiddleware} from 'redux-observable';
import {menuEpic} from 'epics/menu';
import {firebase} from 'api';

describe('epics/menu', () => {
  let store;

  beforeEach(() => store = createStore([createEpicMiddleware(menuEpic)]));

  it('when requestMenu success', () => {
    firebase.db.observe$.mockImplementationOnce(() => {
      return Rx.Observable.of({
        val() {
          return 100;
        }
      });
    });

    firebase.db.observe$.mockImplementationOnce(() => {
      return Rx.Observable.of({
        val() {
          return {key1: 'val1', key2: 'val2'};
        }
      });
    });

    firebase.db.transaction$.mockImplementationOnce(updateFn => {
      return Rx.Observable.of(updateFn(null));
    });

    store.dispatch(requestMenu());
    expect(store.getActions()).toEqual([
      {type: REQUEST_MENU},
      {type: SHOW_PROGRESS},
      {type: HIDE_PROGRESS},
      {
        type: RECEIVE_MENU_SUCCESS,
        data: {
          totalViews: 100,
          currentViews: 2
        }
      }
    ]);
  });

  it('when requestMenu fail', () => {
    firebase.db.transaction$.mockImplementationOnce(updateFn => {
      return Rx.Observable.of(updateFn({}));
    });

    firebase.db.observe$.mockImplementationOnce(() => {
      return Rx.Observable.throw(new Error('ERROR'));
    });

    firebase.db.observe$.mockImplementationOnce(() => {
      return Rx.Observable.throw(new Error('ERROR'));
    });

    store.dispatch(requestMenu());
    expect(store.getActions()).toEqual([
      {type: REQUEST_MENU},
      {type: SHOW_PROGRESS},
      {type: HIDE_PROGRESS},
      {
        type: RECEIVE_MENU_FAILURE,
        error: new Error('ERROR')
      }
    ]);
  });

});
