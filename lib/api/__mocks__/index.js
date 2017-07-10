class Db {

  constructor() {
    this.observe$ = jest.fn();
    this.transaction$ = jest.fn();
  }

  ref() {
    return this;
  }

  child() {
    return this;
  }

  set() {
    return this;
  }

  onDisconnect() {
    return this;
  }

  on() {
    return this;
  }

  then() {
    return this;
  }
}

export const firebase = {
  db: new Db(),
  auth: {
    onAuthStateChanged$: jest.fn(),
    signInAnonymously: jest.fn()
  }
};
