# riiiact-kit

`riiid` flavored react starter kit. It helps you to develop & deploy `react` powered app like a :zap:

## What's included and why?

* `react`
* `react-bootstrap` : :dress::lipstick:
* `firebase` : persist data & host app
* `d3` : visualize :bar_chart:
* `lodash` : :wrench:
* `axios` : create rest api
* `rxjs` : compose async

## Prerequisites

* `firebase` account.
* [firebase-tools](https://github.com/firebase/firebase-tools)

## Getting started

```
$ git clone riiid/riiiact-kit <YOUR_DIR>
$ cd <YOUR_DIR>
$ rm -rf .git
```

create `config.json` under `build/` with

```
{
  "production": {
    "firebase_auth": "<FIREBASE_AUTH_DOMAIN>",
    "firebase_url": "<FIREBASE_URL>",
    "firebase_apikey": "<API_KEY>"
  },
  "development": {
    "firebase_auth": "<FIREBASE_AUTH_DOMAIN>",
    "firebase_url": "<FIREBASE_URL>",
    "firebase_apikey": "<API_KEY>"
  }
}
```

start development with

```
$ npm start
```

## Build

https://firebase.google.com/docs/hosting/deploying

```
$ npm run build && firebase deploy
```

## Deploy

## Further works

 - [ ] use `Redux` for application wide action & state.
 - [ ] `d3` + `firebase` demo.
