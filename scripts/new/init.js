require('colors');

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const rimraf = require('rimraf');
const pkg = require('../../package');

function Result(prefix) {
  this.prefix = prefix;
  this.result = {};
}

Result.prototype.add = function(result) {
  _.assign(this.result, result);
};

Result.prototype.print = function() {
  _.chain(this.result)
  .values()
  .forEach(t => {
    console.log(`${this.prefix} ${t}`);
  })
  .value();
};

function Init(prompt) {
  this.prompt = prompt || {};
  this.created = new Result('  [+] created'.green);
  this.deleted = new Result('  [-] deleted'.red);
  this.updated = new Result('  [*] updated'.yellow);
}

Init.prototype.git = function() {
  try {
    rimraf.sync(path.join(utils.root, '.git'));
    this.deleted.add({git: './git'});
  } catch (err) {
  }
};

Init.prototype.pkg = function() {
  try {
    const _opt = this.prompt;
    const _pkg = Object.assign(pkg, {
      name: _opt.name,
      version: '0.0.1',
      description: _opt.description,
      homepage: '',
      author: ''
    });
    const filepath = path.join(utils.root, 'package.json');
    fs.writeFileSync(filepath, JSON.stringify(_pkg, null, 2));
    this.updated.add({pkg: 'package.json'});
  } catch (err) {
  }
};

Init.prototype.config = function() {
  try {
    const _opt = this.prompt;
    const _path = path.join(utils.root, 'build', 'config.json');
    fs.writeFileSync(_path, JSON.stringify({
      production: {
        firebase_auth: '',
        firebase_url: '',
        firebase_apikey: ''
      },
      development: {
        server: {
          port: _opt.port
        },
        firebase_auth: '',
        firebase_url: '',
        firebase_apikey: ''
      }
    }, null, 2));
    this.created.add({config: 'build/config.json'});
  } catch (err) {
  }
};

Init.prototype.firebaserc = function() {
  try {
    fs.writeFileSync(path.join(utils.root, '.firebaserc'), JSON.stringify({
      projects: {
        default: this.prompt.name
      }
    }, null, 2));
    this.updated.add({firebaserc: '.firebaserc'});
  } catch (err) {
  }
};

Init.prototype.readme = function() {
  try {
    fs.writeFileSync(path.join(utils.root, 'README.md'), `# ${this.prompt.name}

${this.prompt.description}

## development

\`\`\`
$ npm start
\`\`\`

## test

\`\`\`
$ npm test
$ npm run test:e2e
\`\`\`

## build

\`\`\`
$ npm run build
$ npm run build:prod
\`\`\``);
    this.updated.add({readme: 'README.md'});
  } catch (err) {
  }
};

Init.prototype.run = function() {
  this.pkg();
  this.git();
  this.config();
  this.firebaserc();
  this.readme();
  return this;
};

Init.prototype.result = function() {
  this.created.print();
  this.deleted.print();
  this.updated.print();
  return this;
};

Init.create = prompt => new Init(prompt);

module.exports = Init;
