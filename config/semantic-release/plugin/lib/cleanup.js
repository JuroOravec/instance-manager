const { push } = require('./git');

module.exports = async function cleanup(pluginConfig, context, meta = {}) {
  const {
    options: { repositoryUrl },
    logger,
  } = context;
  const { dummyBranch, verified } = meta;

  if (!verified) {
    logger.info('Skipping prepare-changelog cleanup.');
    return;
  }

  // Remove the temporary branch
  await push({ delete: dummyBranch, remote: repositoryUrl }, context);
};
