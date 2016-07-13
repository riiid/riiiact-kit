import {firebase} from 'api';
import {showProgress, hideProgress, showSnackbar} from 'actions/app';

export const RECEIVE_AUTH_SUCCESS = 'RECIEVE_AUTH_SUCCESS';
export const RECEIVE_AUTH_FAILURE = 'RECIEVE_AUTH_FAILURE';

export const receiveAuthSuccess = user => {
  return {
    type: RECEIVE_AUTH_SUCCESS,
    user
  };
};

export const receiveAuthFailure = error => {
  return {
    type: RECEIVE_AUTH_FAILURE,
    error
  };
};

export const subscribeAuth = () => {
  return dispatch => {
    const {auth, db} = firebase;
    dispatch(showProgress());
    auth.onAuthStateChanged$()
    .subscribe(user => {
      if (user === null) {
        return auth.signInAnonymously();
      }
      dispatch(receiveAuthSuccess(user));
      dispatch(hideProgress());

      db.ref('online-users').child(user.uid).set(true);
      db.ref('online-users').child(user.uid).onDisconnect().set(null);
    }, err => {
      console.error(err);
      dispatch(hideProgress());
      dispatch(showSnackbar('로그인 중 오류 발생'));
      dispatch(receiveAuthFailure(err));
    });
  };
};
