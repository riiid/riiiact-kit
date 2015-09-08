# riiiact-kit

`riiid` flavored react starter kit. (inspired by [react-starterify](https://github.com/Granze/react-starterify)) It helps you to develop & deploy (to aws s3) `react` powered static page like a :zap:

## What's included?

* `react`
* `react-bootstrap`
* `react-emoji`
* `d3`
* `lodash`
* `superagent`

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

## Deploy

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
