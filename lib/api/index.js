import firebase from 'api/firebaseExtended';
import {FIREBASE_URL, FIREBASE_AUTH, FIREBASE_APIKEY} from 'config';

const initFirebase = () => {
  if (FIREBASE_URL && FIREBASE_AUTH && FIREBASE_APIKEY) {
    firebase.initializeApp({
      apiKey: FIREBASE_APIKEY,
      authDomain: FIREBASE_AUTH,
      databaseURL: FIREBASE_URL,
      storageBucket: ''
    });
    return firebase;
  }
  return null;
};

export const create = () => {
  return {
    firebase: initFirebase()
  };
};
