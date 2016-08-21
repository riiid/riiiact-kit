import {firebase} from 'api';
import {showProgress, hideProgress} from 'actions/app';
import {keys} from 'lodash';
import {Observable} from 'rxjs/Observable';

export const RECEIVE_MENU_SUCCESS = 'RECIEVE_MENU_SUCCESS';
export const RECEIVE_MENU_FAILURE = 'RECIEVE_MENU_FAILURE';

export const receiveMenuSuccess = data => {
  return {
    type: RECEIVE_MENU_SUCCESS,
    data
  };
};

export const receiveMenuFailure = error => {
  return {
    type: RECEIVE_MENU_FAILURE,
    error
  };
};

const count = () => {
  const {db} = firebase;
  db.ref('stats').child('totalViews').transaction$(current => {
    if (current === null) {
      return 1;
    }
    return current + 1;
  }).subscribe();
};

export const subscribeMenu = () => {
  return dispatch => {
    const {db} = firebase;
    dispatch(showProgress());
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
    .subscribe(result => {
      dispatch(receiveMenuSuccess(result));
      dispatch(hideProgress());
    }, err => {
      dispatch(receiveMenuFailure(err));
      dispatch(hideProgress());
    });
  };
};
