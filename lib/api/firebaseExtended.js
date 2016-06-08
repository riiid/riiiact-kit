import Firebase from 'firebase';
import Rx from 'rx';

const makeCallback = (eventType, observer) => {
  if (eventType === 'value') {
    return snap => observer.onNext(snap);
  }

  return (snap, prevName) => {
    observer.onNext({snapshot: snap, prevName: prevName});
  };
};

const Ref = Firebase.database.Reference;
const Auth = Firebase.auth.Auth;

Ref.prototype.observe$ = function(eventType) {
  return Rx.Observable.create(observer => {
    const cb = makeCallback(eventType, observer);
    const listener = this.on(eventType, cb, error => {
      observer.onError(error);
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
      observer.onError(error);
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
        observer.onError(err);
      } else {
        observer.onNext();
        observer.onCompleted();
      }
    });
  });
};

Ref.prototype.push$ = function(data) {
  return Rx.Observable.create(observer => {
    this.push(data, err => {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext();
        observer.onCompleted();
      }
    });
  });
};

Ref.prototype.setPriority$ = function(priority) {
  return Rx.Observable.create(observer => {
    this.setPriority(priority, err => {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext();
        observer.onCompleted();
      }
    });
  });
};

Ref.prototype.setWithPriority$ = function(data, priority) {
  return Rx.Observable.create(observer => {
    this.setWithPriority(data, priority, err => {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext();
        observer.onCompleted();
      }
    });
  });
};

Ref.prototype.remove$ = function() {
  return Rx.Observable.create(observer => {
    this.remove(err => {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext();
        observer.onCompleted();
      }
    });
  });
};

Ref.prototype.update$ = function(data) {
  return Rx.Observable.create(observer => {
    this.update(data, err => {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext();
        observer.onCompleted();
      }
    });
  });
};

Ref.prototype.transaction$ = function(updateFn) {
  return Rx.Observable.create(observer => {
    this.transaction(updateFn, (err, committed, snapshot) => {
      if (err) {
        observer.onError(err);
      } else {
        observer.onNext({committed, snapshot});
        observer.onCompleted();
      }
    });
  });
};

Auth.prototype.onAuthStateChanged$ = function() {
  return Rx.Observable.create(observer => {
    this.onAuthStateChanged(user => {
      observer.onNext(user);
    }, err => {
      observer.onError(err);
    }, () => {
      observer.onCompleted();
    });
  });
};

Auth.prototype.signInAnonymously$ = function() {
  return Rx.Observable.create(observer => {
    this.signInAnonymously()
      .then(user => {
        observer.onNext(user);
        observer.onCompleted();
      })
      .catch(err => {
        observer.onError(err);
      });
  });
};

Auth.prototype.signInWithCustomToken$ = function(
    token, remember = 'default'
  ) {
  return Rx.Observable.create(observer => {
    this.signInWithCustomToken(token, {remember})
      .then(user => {
        observer.onNext(user);
        observer.onCompleted();
      })
      .catch(err => {
        observer.onError(err);
      });
  });
};

export default Firebase;
