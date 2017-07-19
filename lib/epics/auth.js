import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import {
  REQUEST_AUTH, receiveAuthSuccess, receiveAuthFailure
} from 'actions/auth';
import {
  showProgress, hideProgress, showSnackbar, firebaseAvailable
} from 'actions/app';

export const auth$$ = (action$, store, {firebase}) => {
  const {auth, db} = firebase;
  return action$.ofType(REQUEST_AUTH)
    .mergeMap(() => {
      return auth.onAuthStateChanged$()
        .do(user => {
          if (user === null) {
            return auth.signInAnonymously();
          }
          db.ref('online-users').child(user.uid).set(true);
          db.ref('online-users').child(user.uid).onDisconnect().set(null);
        })
        .mergeMap(user => [hideProgress(), receiveAuthSuccess(user)])
        .catch(err => [
          hideProgress(),
          showSnackbar('로그인 중 오류 발생'),
          receiveAuthFailure(err)
        ])
        .startWith(
          showProgress(),
          firebaseAvailable(db !== null && auth !== null)
        );
    });
};
