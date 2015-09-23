# riiiact-kit

`riiid` flavored react starter kit. (inspired by [react-starterify](https://github.com/Granze/react-starterify)) It helps you to develop & deploy (to aws s3) `react` powered static page like a :zap:

## What's included and why?

* `react`
* `react-emoji` : :trollface:
* `redux` : handle application-wide state management
* `d3` : visualize :bar_chart:
* `lodash` : :wrench:
* `superagent` : create rest api
* `q`, `rxjs` : compose async task & rest api

## Getting started

```
$ git clone riiid/riiiact-kit <YOUR_DIR>
$ cd <YOUR_DIR>
$ rm -rf .git
$ npm start
```

## Build

```
$ gulp build
```

## Deploy (to s3)

Create `aws.json` with following props.

```
{
  "key": "<YOUR_KEY>",
  "secret": "<YOUR_SECRET>",
  "bucket": "<YOUR_BUCKET>",
  "region": "<REGION>"
}
```

```
$ gulp release
```
