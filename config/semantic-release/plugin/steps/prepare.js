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
    envCi: { prBranch },
    options: { repositoryUrl },
    logger,
  } = context;
  const { changelogFile, dummyBranch, verified } = meta;

  if (!verified) {
    logger.info('Skipping CHANGELOG update.');
    return;
  }

  // To avoid errors if this script was started in a different branch, save its
  // name so we can restore it later.
  const initHead = await currentHead(undefined, context);

  const execa = require('execa');
  async function status(options = {}, execaOptions) {
    const shell = await execa('git', ['status'], execaOptions);
    return shell;
  }
  console.log(2);
  console.log(await status(undefined, { ...context, stdout: undefined }));
  console.log(
    await execa('git', ['log', '--oneline', '-n', '10'], {
      ...context,
      stdout: undefined,
    }),
  );

  //   async function add(files, execaOptions) {
  //     const shell = await execa(
  //       'git',
  //       ['add', '--force', '--ignore-errors', ...files],
  //       { ...execaOptions, reject: false },
  //     );
  //   }
  //   await add([changelogFile], context);

  //   async function commit(message, execaOptions) {
  //     await execa('git', ['commit', '-m', message], execaOptions);
  //   }
  //   await commit('"chore(semantic-release): add CHANGELOG.md"', context);

  // # Copy the last commit from the dummy branch to the PR branch. The last commit
  // # is expected to be the CHANGELOG.md update.
  const chlogCommit = await getLastCommitHash(undefined, context);

  await checkout({ to: prBranch }, context);
  await cherryPick({ commit: chlogCommit }, context);
  //   await push(undefined, context);

  // Return to initial commit
  await checkout({ to: initHead }, context);

  throw Error('finish');
}

module.exports = function getPrepare(meta = {}) {
  return async function prepareWrapper(pluginConfig, context) {
    return prepare(pluginConfig, context, meta);
  };
};
