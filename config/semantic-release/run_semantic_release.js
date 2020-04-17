const sr = require('semantic-release');

// Trigger semantic-release but with overrides
function runSemanticRelease() {
  const env = {
    ...process.env,
    TRAVIS_PULL_REQUEST: false,
    IGNORE_PR_CHECK: true,
  };

  sr(undefined, { env });
}

if (require.main === module) {
  runSemanticRelease(...process.argv.slice(2));
}

module.exports = runSemanticRelease;
