const fs = require('fs');

const fsp = fs.promises;

module.exports = async function safeReadFile(path) {
  return fs.existsSync(path) ? await fsp.readFile(path, 'utf8') : null;
};
