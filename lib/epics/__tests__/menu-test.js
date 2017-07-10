jest.mock('api');
jest.mock('store');

import {Observable} from 'rxjs';
import createStore from 'store';
import {requestMenu} from 'actions/menu';
import {createEpicMiddleware} from 'redux-observable';
import {menu$$} from 'epics/menu';
import {firebase} from 'api';

describe('epics/menu', () => {
  let store;

  beforeEach(() => store = createStore([createEpicMiddleware(menu$$)]));

  it('when requestMenu success', () => {
    firebase.db.observe$.mockImplementationOnce(() => {
      return Observable.of({
        val() {
          return 100;
        }
      });
    });

    firebase.db.observe$.mockImplementationOnce(() => {
      return Observable.of({
        val() {
          return {key1: 'val1', key2: 'val2'};
        }
      });
    });

    firebase.db.transaction$.mockImplementationOnce(updateFn => {
      return Observable.of(updateFn(null));
    });

    store.dispatch(requestMenu());
    expect(store.getActions()).toMatchSnapshot();
  });

  it('when requestMenu fail', () => {
    firebase.db.transaction$.mockImplementationOnce(updateFn => {
      return Observable.of(updateFn({}));
    });

    firebase.db.observe$.mockImplementationOnce(() => {
      return Observable.throw(new Error('ERROR'));
    });

    firebase.db.observe$.mockImplementationOnce(() => {
      return Observable.throw(new Error('ERROR'));
    });

    store.dispatch(requestMenu());
    expect(store.getActions()).toMatchSnapshot();
  });
});
