const {
  currentHead,
  checkout,
  push,
  getLastCommitHash,
  cherryPick,
} = require('../lib/git');

// We need to wait until other plugins do their job in prepare, so we have to
// trigger this at the beginning of publish
async function prepare(pluginConfig, context, meta = {}) {
  const {
    options: { repositoryUrl },
    envCi: { prBranch },
    logger,
  } = context;
  const { verified } = meta;

  if (!verified) {
    logger.info('Skipping CHANGELOG update.');
    return;
  }

  // To avoid errors if this script was started in a different branch, save its
  // name so we can restore it later.
  const initHead = await currentHead(undefined, context);

  // Copy the last commit from the dummy branch to the PR branch. The last commit
  // is expected to be the CHANGELOG.md update.
  const chlogCommit = await getLastCommitHash(undefined, context);

  await checkout({ to: prBranch }, context);
  await cherryPick({ commit: chlogCommit }, context);
  await push({ remote: repositoryUrl, to: prBranch, setUpstream: true });

  // Return to initial commit
  await checkout({ to: initHead }, context);
}

module.exports = function getPrepare(meta = {}) {
  return async function prepareWrapper(pluginConfig, context) {
    return prepare(pluginConfig, context, meta);
  };
};
