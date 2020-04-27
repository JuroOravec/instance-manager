import debug from 'debug';
import readPkgUp from 'read-pkg-up';

function getDebugLogger() {
  const { packageJson: { name = '' } = {} } = readPkgUp.sync() || {};
  if (!name) {
    console.warn(
      'Cannot find package name, using console.log instead of debug package',
    );
    return console.log;
  }
  return debug(name);
}

const mainDebug = getDebugLogger();

export default mainDebug;
