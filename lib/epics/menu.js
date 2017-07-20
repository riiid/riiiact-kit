import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import keys from 'lodash/keys';
import {
  REQUEST_MENU, receiveMenuSuccess, receiveMenuFailure
} from 'ducks/menu';
import {showProgress, hideProgress} from 'ducks/app';

const count = db => {
  db.ref('stats').child('totalViews').transaction$(current => {
    if (current === null) {
      return 1;
    }
    return current + 1;
  }).subscribe();
};

export const menu$$ = (action$, store, {firebase}) => {
  const {db} = firebase;
  return action$.ofType(REQUEST_MENU)
    .mergeMap(() => {
      count(db);
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
      .mergeMap(data => [hideProgress(), receiveMenuSuccess(data)])
      .catch(err => [hideProgress(), receiveMenuFailure(err)])
      .startWith(showProgress());
    });
};
