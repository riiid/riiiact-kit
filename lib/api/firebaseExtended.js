import Firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/publish';

const makeCallback = (eventType, observer) => {
  if (eventType === 'value') {
    return snap => observer.next(snap);
  }

  return (snap, prevName) => {
    observer.next({snapshot: snap, prevName: prevName});
  };
};

const Ref = Firebase.database.Reference;
const Auth = Firebase.auth.Auth;

Ref.prototype.observe$ = function(eventType) {
  return Observable.create(observer => {
    const cb = makeCallback(eventType, observer);
    const listener = this.on(eventType, cb, error => {
      observer.error(error);
    });
    return () => {
      this.off(eventType, listener);
    };
  }).publish().refCount();
};

/* eslint no-proto:0 */
Ref.prototype.__proto__.observe$ = function(eventType) {
  return Observable.create(observer => {
    const cb = makeCallback(eventType, observer);
    const listener = this.on(eventType, cb, error => {
      observer.error(error);
    });
    return () => {
      this.off(eventType, listener);
    };
  }).publish().refCount();
};

Ref.prototype.set$ = function(data) {
  return Observable.create(observer => {
    this.set(data, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};

Ref.prototype.push$ = function(data) {
  return Observable.create(observer => {
    this.push(data, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};

Ref.prototype.setPriority$ = function(priority) {
  return Observable.create(observer => {
    this.setPriority(priority, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};

Ref.prototype.setWithPriority$ = function(data, priority) {
  return Observable.create(observer => {
    this.setWithPriority(data, priority, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};

Ref.prototype.remove$ = function() {
  return Observable.create(observer => {
    this.remove(err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};

Ref.prototype.update$ = function(data) {
  return Observable.create(observer => {
    this.update(data, err => {
      if (err) {
        observer.error(err);
      } else {
        observer.next();
        observer.complete();
      }
    });
  });
};

Ref.prototype.transaction$ = function(updateFn) {
  return Observable.create(observer => {
    this.transaction(updateFn, (err, committed, snapshot) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next({committed, snapshot});
        observer.complete();
      }
    });
  });
};

Auth.prototype.onAuthStateChanged$ = function() {
  return Observable.create(observer => {
    this.onAuthStateChanged(user => {
      observer.next(user);
    }, err => {
      observer.error(err);
    }, () => {
      observer.complete();
    });
  });
};

Auth.prototype.signInAnonymously$ = function() {
  return Observable.create(observer => {
    this.signInAnonymously()
      .then(user => {
        observer.next(user);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
};

Auth.prototype.signInWithCustomToken$ = function(
    token, remember = 'default'
  ) {
  return Observable.create(observer => {
    this.signInWithCustomToken(token, {remember})
      .then(user => {
        observer.next(user);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
};

export default Firebase;
