import {Observable} from 'rxjs/Observable';
import keys from 'lodash/keys';
import {firebase} from 'api';
import {
  REQUEST_MENU, receiveMenuSuccess, receiveMenuFailure
} from 'actions/menu';
import {showProgress, hideProgress} from 'actions/app';

const count = () => {
  const {db} = firebase;
  db.ref('stats').child('totalViews').transaction$(current => {
    if (current === null) {
      return 1;
    }
    return current + 1;
  }).subscribe();
};

export const menuEpic = (action$, store) => {
  const {db} = firebase;
  const {dispatch} = store;
  return action$.ofType(REQUEST_MENU)
    .do(() => dispatch(showProgress()))
    .mergeMap(() => {
      count();
      const tv$ = db.ref('stats').child('totalViews').observe$('value')
        .map(snapshot => snapshot.val());
      const cv$ = db.ref('online-users').observe$('value')
        .map(snapshot => snapshot.val());

      return Observable.combineLatest(tv$, cv$, (tv, cv) => {
        return {
          totalViews: tv,
          currentViews: keys(cv).length
        };
      })
      .do(() => dispatch(hideProgress()))
      .map(receiveMenuSuccess)
      .catch(err => {
        dispatch(hideProgress());
        return Observable.of(receiveMenuFailure(err));
      });
    });
};
