const prompt = require('./prompt');
const initGit = require('./initGit');
const initPkg = require('./initPkg');
const initConfig = require('./initConfig');

prompt.run((err, result) => {
  if (err) {
    console.error('cancled');
  } else {
    initGit();
    initPkg(result);
    initConfig();
  }
});
