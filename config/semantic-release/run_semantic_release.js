const sr = require('semantic-release');

// Trigger semantic-release but with custom branch as the target branch
function runSemanticRelease(branch) {
  const env = {
    ...process.env,
    TRAVIS_BRANCH: branch,
  };

  sr(undefined, { env });
}

if (require.main === module) {
  runSemanticRelease(process.argv[2]);
}

module.exports = runSemanticRelease;
