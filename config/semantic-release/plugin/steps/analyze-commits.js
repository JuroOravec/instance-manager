const { currentHead, checkout, push, pull, rebase, branchExists } = require('../lib/git');

async function analyzeCommits(pluginConfig, context, meta = {}) {
  const {
    envCi: { prBranch, branch },
    options: { repositoryUrl },
    logger,
  } = context;
  const { baseBranch = branch, headBranch = prBranch } = pluginConfig;

  if (!meta.verified) {
    logger.info('Skipping CHANGELOG update.');
    return;
  }

  // To avoid errors if this script was started in a different branch, save its
  // name so we can restore it later.
  const initHead = await currentHead(undefined, context);

  // Prepare the branch that has the changes that are to be applied in PR
  await pull({ from: headBranch, to: headBranch }, context);

  // Make a dummy branch from the pr/head branch
  const dummyBranch = (meta.dummyBranch = `temp/semantic-release/${headBranch}`);

  if (await branchExists({ branch: dummyBranch, remote: repositoryUrl })) {
    throw Error(`Branch ${dummyBranch} already exists on remote.`);
  }
  // Apply the changes from head branch (e.g. a PR branch) to the dummy target
  // branch, so we have a branch with all changes on master since the last
  // release + the head branch changes.
  await checkout(
    {
      to: dummyBranch,
      from: headBranch,
    },
    context,
  );
  await rebase({ onto: baseBranch }, context);

  // semantic-release, which we use to get and format the CHANGELOG, verifies if
  // the target branch exists by fetching it from remote, so we need to set the
  // dummy branch on remote.
  await push(
    {
      to: dummyBranch,
      remote: repositoryUrl,
      setUpstream: true,
    },
    context,
  );

  // Return to initial commit
  await checkout({ to: initHead }, context);

  // Make branch object that could be recognized by semantic-release
  const dummyBranchObj = { ...context.branch, name: dummyBranch, main: false };
  meta.branches = meta.branches || context.branches || [];
  meta.branches.push(dummyBranchObj);
  meta.branch = dummyBranchObj;
}

module.exports = function getAnalyzeCommits(meta = {}) {
  return async function analyzeWrapper(pluginConfig, context) {
    return analyzeCommits(pluginConfig, context, meta);
  };
};
