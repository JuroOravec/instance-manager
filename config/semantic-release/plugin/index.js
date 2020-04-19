const path = require('path');
const releaseNoteGenerator = require('@semantic-release/release-notes-generator');
const changelogPlugin = require('@semantic-release/changelog');
const gitPlugin = require('@semantic-release/git');

const getAnalyzeCommits = require('./steps/analyze-commits');
const getPrepare = require('./steps/prepare');
const getVerify = require('./steps/verify');
const cleanup = require('./lib/cleanup');
const initMeta = require('./lib/meta');
const { currentHead, checkout } = require('./lib/git');

// Data shared between functions with default props
// Preferably replace with such object from semantic-release once/if they
// support it, see:
// https://spectrum.chat/semantic-release/plugins/pass-data-between-plugin-functions-and-plugins~99192f5c-509c-43e0-ba5a-42d5e0381f46
const meta = initMeta();

async function generateNotes(pluginConfig, context) {
  const { cwd, logger } = context;
  const {
    message = 'chore(changelog): update changelog to ${nextRelease.version} ' +
      '[skip ci]\n\n${nextRelease.notes}',
  } = pluginConfig;
  const { verified, changelogFile, dummyBranch, branch, branches } = meta;

  if (!verified) {
    logger.info('Skipping prepare-changelog.');
    return;
  }

  // To avoid errors if this script was started in a different branch, save its
  // name so we can restore it later.
  const initHead = await currentHead(undefined, context);
  await checkout({ to: dummyBranch }, context);

  // If we got here, we're in dry run environment and the conditions are
  // verified. Since any steps including `prepare` and beyond are not run on
  // dry run, we need to:
  // 1) Run `generateNotes` steps to get that data, since they become available
  // only in `prepare` step and later.
  // 2) We need to run `prepare` steps to generate and commit the CHANGELOG.
  context.nextRelease.notes = await releaseNoteGenerator.generateNotes(
    pluginConfig,
    context,
  );
  await changelogPlugin.prepare({ ...pluginConfig, changelogFile }, context);

  await gitPlugin.prepare(
    {
      ...pluginConfig,
      assets: [path.relative(cwd, changelogFile)],
      message,
    },
    // git plugin takes the info on the branch to commit and push to from
    // context, so we must convince it to push to the dummy branch
    { ...context, branch, branches },
  );

  const prepare = getPrepare(meta);
  await prepare(pluginConfig, context);

  await checkout({ to: initHead }, context);
  await cleanup(pluginConfig, context, meta);
}

module.exports = {
  verifyConditions: getVerify(meta),
  analyzeCommits: getAnalyzeCommits(meta),
  generateNotes,
};
