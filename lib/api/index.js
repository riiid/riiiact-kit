import Firebase from 'api/firebaseExtended';
import {FIREBASE_URL, FIREBASE_AUTH, FIREBASE_APIKEY} from 'config';

const initFirebase = () => {
  if (FIREBASE_URL && FIREBASE_AUTH && FIREBASE_APIKEY) {
    Firebase.initializeApp({
      apiKey: FIREBASE_APIKEY,
      authDomain: FIREBASE_AUTH,
      databaseURL: FIREBASE_URL,
      storageBucket: ''
    });
    return {
      db: Firebase.database(),
      auth: Firebase.auth()
    };
  }
  return {
    db: null,
    auth: null
  };
};

export const firebase = initFirebase();
