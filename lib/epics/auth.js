import {Observable} from 'rxjs/Observable';
import {firebase} from 'api';
import {
  REQUEST_AUTH, receiveAuthSuccess, receiveAuthFailure
} from 'actions/auth';
import {showProgress, hideProgress, showSnackbar} from 'actions/app';

export const authEpic = (action$, store) => {
  const {auth, db} = firebase;
  const {dispatch} = store;
  return action$.ofType(REQUEST_AUTH)
    .do(() => dispatch(showProgress()))
    .mergeMap(() => {
      return auth.onAuthStateChanged$()
        .do(user => {
          if (user === null) {
            return auth.signInAnonymously();
          }
          dispatch(hideProgress());
          db.ref('online-users').child(user.uid).set(true);
          db.ref('online-users').child(user.uid).onDisconnect().set(null);
        })
        .map(receiveAuthSuccess)
        .catch(err => {
          console.log(err);
          dispatch(hideProgress());
          dispatch(showSnackbar('로그인 중 오류 발생'));
          return Observable.of(receiveAuthFailure(err));
        });
    });
};
