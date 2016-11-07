const fs = require('fs');
const target = process.env.CIRCLE_ARTIFACTS || 'artifacts';

// move coverage files
fs.renameSync('coverage', target);
