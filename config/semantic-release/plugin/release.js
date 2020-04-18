const getAnalyzeCommits = require('./steps/analyze-commits');
const getPrepare = require('./steps/prepare');
const getVerify = require('./steps/verify');
const cleanup = require('./lib/cleanup');
const initMeta = require('./lib/meta');

// Data shared between functions
// Preferably replace with with such object from semantic-release once/if they
// support it, see:
// https://spectrum.chat/semantic-release/plugins/pass-data-between-plugin-functions-and-plugins~99192f5c-509c-43e0-ba5a-42d5e0381f46
const meta = initMeta();

async function prepare(pluginConfig, context) {
  const { logger } = context;
  const { verified } = meta;

  if (!verified) {
    logger.info('Skipping prepare-changelog prepare step.');
    return;
  }
  const prepareFn = getPrepare(meta);
  await prepareFn(pluginConfig, context);

  await cleanup(pluginConfig, context, meta);
}

module.exports = {
  verifyConditions: getVerify(meta),
  analyzeCommits: getAnalyzeCommits(meta),
  prepare,
};
