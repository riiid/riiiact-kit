import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/share';
import {
  REQUEST_AUTH, receiveAuthSuccess, receiveAuthFailure
} from 'ducks/auth';
import {
  showProgress, hideProgress, showSnackbar, firebaseAvailable
} from 'ducks/app';

export const auth$$ = (action$, store, {firebase}) => {
  const {auth, db} = firebase;
  return action$.ofType(REQUEST_AUTH)
    .mergeMap(() => {
      const auth$ = auth.onAuthStateChanged$().share();
      const signIn$ = auth$
        .filter(user => user === null)
        .mergeMap(() => auth.signInAnonymously$());
      const login$ = auth$
        .filter(user => user !== null)
        .do(user => {
          db.ref('online-users').child(user.uid).set(true);
          db.ref('online-users').child(user.uid).onDisconnect().set(null);
        });
      return Observable.merge(signIn$, login$)
        .mergeMap(({uid, email, displayName, isAnonymouse}) => {
          return [
            hideProgress(),
            receiveAuthSuccess({uid, email, displayName, isAnonymouse})
          ];
        })
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
