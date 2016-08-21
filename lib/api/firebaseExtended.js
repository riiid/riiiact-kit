import Firebase from 'firebase';
import Rx from 'rxjs/Rx';

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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
  return Rx.Observable.create(observer => {
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
