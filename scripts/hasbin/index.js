const fs = require('fs');
const path = require('path');
const DELI = path.delimiter;

function getPaths(bin) {
  const envPath = process.env.PATH || '';
  const envExt = process.env.PATHEXT || '';
  return envPath
    .replace(/["]+/g, '')
    .split(DELI)
    .map(chunk => {
      return envExt.split(DELI).map(ext => path.join(chunk, bin + ext));
    })
    .reduce((a, b) => a.concat(b));
}

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (error) {
    return false;
  }
}

const argv = process.argv.slice(0);
const binname = argv[argv.length - 1];

if (binname === __dirname) {
  console.error('  Error: invalid argument');
  return process.exit(1);
}
if (getPaths(binname).some(fileExists)) {
  process.exit(0);
} else {
  console.error(`  Error: cannot find '${binname}': no such file or directory`);
  process.exit(1);
}
