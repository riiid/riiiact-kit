const prompt = require('./prompt');
const Init = require('./init');

prompt.run((err, result) => {
  if (err) {
    console.error('cancled');
  } else {
    Init.create(result)
      .run()
      .result();
  }
});
