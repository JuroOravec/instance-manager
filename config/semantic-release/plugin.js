const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const readPkgUp = require('read-pkg-up');
const semver = require('semver');

const fsp = fs.promises;

const {
  currentHead,
  checkout,
  push,
  pull,
  merge,
  getLastCommitHash,
  cherryPick,
  branchExists,
} = require('./git');

// Defaults from:
// https://github.com/semantic-release/semantic-release/blob/caa3526caa686c18eb935dace80a275017746215/docs/usage/configuration.md#branches
const defaultBranches = [
  { name: '+([0-9])?(.{+([0-9]),x}).x' },
  { name: 'master' },
  { name: 'next' },
  { name: 'next-major' },
  { name: 'beta', prerelease: true },
  { name: 'alpha', prerelease: true },
];

// Data shared between functions
// Preferably replace with with such object from semantic-release once/if they
// support it, see:
// https://spectrum.chat/semantic-release/plugins/pass-data-between-plugin-functions-and-plugins~99192f5c-509c-43e0-ba5a-42d5e0381f46
const meta = {};

/**
 * We want to run this script only in CI when triggered by a pull request to one
 * of the release branches (release branches defined in a semantic-release
 * config that's used on releases).
 *
 * Since any branch could be making a PR to a release branch, the branches
 * option for PR semantic-release config permits all branches.
 *
 * But we don't want to trigger the CHANGELOG update when we are making a PR
 * to another non-release branch. So we need to verify here instead that the
 * target branch is one of release branches.
 */
async function verifyConditions(pluginConfig, context) {
  const {
    cwd,
    changelogPath = './CHANGELOG.md',
    pattern,
    releaseBranches = defaultBranches,
  } = pluginConfig;
  const {
    branch: { name: branchName },
    envCi: { isPr },
    logger,
  } = context;

  const {
    packageJson: { version: pkgVersion },
  } = await readPkgUp({ cwd });

  const chlogPath = (meta.changelogPath = path.resolve(
    cwd || process.cwd(),
    changelogPath,
  ));
  const chlogVersion = await getChangelogVersion(chlogPath, pattern);

  if (semver.gt(chlogVersion, pkgVersion)) {
    logger.info(
      `CHANGELOG version ${chlogVersion} is ahead of package.json version ` +
        `${pkgVersion}. CHANGELOG will not be updated with new commits.`,
    );
    meta.verified = false;
    return;
  }
  logger.debug(
    `CHANGELOG version ${chlogVersion} is at or below package version ` +
      `${pkgVersion}. CHANGELOG will be updated with new commits.`,
  );

  if (!isPr) {
    throw Error('changelog-pr ran in non-pull-request environment');
  }

  const releaseBranchNames = releaseBranches.map(({ name }) => name);
  const branchIsValid = releaseBranchNames.some((name) =>
    minimatch(branchName, name),
  );

  if (!branchIsValid) {
    logger.info(
      `Base branch "${branchName}" is not among the release branches ` +
        `${releaseBranchNames.join(', ')}. Skipping CHANGELOG update.`,
    );
    meta.verified = false;
    return;
  }

  meta.verified = true;
}

async function getChangelogVersion(
  changelogPath,
  pattern = /#+\s+\[(?<version>.*?)\]/u,
) {
  const changelog = fs.existsSync(changelogPath)
    ? await fsp.readFile(changelogPath, 'utf8')
    : '';
  const match = changelog.match(pattern);
  const version = match
    ? match.groups
      ? match.groups.version
      : match[1]
    : null;
  return version;
}

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
async function analyzeCommits(pluginConfig, context) {
  const {
    envCi: { prBranch, branch },
    options: { repositoryUrl },
    logger,
  } = context;

  if (!meta.verified) {
    logger.info('Skipping CHANGELOG update.');
    return;
  }

  // To avoid errors if this script was started in a different branch, save its
  // name so we can restore it later.
  const init_head = await currentHead(undefined, context);

  // Prepare the branch that has the changes that are to be applied in PR
  await pull({ from: prBranch, to: prBranch }, context);

  // Make a dummy branch from the target branch
  const dummyBranch = (meta.dummyBranch = `temp/semantic-release/${prBranch}`);

  if (await branchExists({ branch: dummyBranch, remote: repositoryUrl })) {
    throw Error(`Branch ${dummyBranch} already exists on remote.`);
  }
  await checkout({ to: dummyBranch, from: branch }, context);

  // Apply the PR changes to the dummy target branch, so we have a branch with
  // all changes since the last release + PR
  await merge({ from: prBranch }, context);
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
  await checkout({ to: init_head }, context);

  // Make semantic-release recognize our dummy branch, and set it as the target branch
  const dummyBranchObj = { ...context.branch, name: dummyBranch, main: false };
  context.branches.push(dummyBranchObj);
  context.branch = dummyBranchObj;

  const execa = require('execa');
  console.log('git name', await execa('git', ['config', 'user.name']));
  console.log('git email', await execa('git', ['config', 'user.email']));
}

// We need to wait until other plugins do their job in prepare, so we have to
// trigger this at the beginning of publish
async function publish(pluginConfig, context) {
  const {
    envCi: { prBranch },
    options: { repositoryUrl },
    logger,
  } = context;
  const { changelogPath, dummyBranch, verified } = meta;

  if (!verified) {
    logger.info('Skipping CHANGELOG update.');
    return;
  }

  console.log('HELLO FROM PUBLISH');

  // To avoid errors if this script was started in a different branch, save its
  // name so we can restore it later.
  const init_head = await currentHead(undefined, context);

  // const execa = require('execa');
  // async function add(files, execaOptions) {
  //   const shell = await execa(
  //     'git',
  //     ['add', '--force', '--ignore-errors', ...files],
  //     { ...execaOptions, reject: false },
  //   );
  // }
  // await add([changelogPath], context);

  // async function commit(message, execaOptions) {
  //   await execa('git', ['commit', '-m', message], execaOptions);
  // }
  // await commit('"chore(semantic-release): add CHANGELOG.md"', context);

  // // # Copy the last commit from the dummy branch to the PR branch. The last commit
  // // # is expected to be the CHANGELOG.md update.
  // const chlogCommit = await getLastCommitHash(undefined, context);

  // await checkout({ to: prBranch }, context);
  // await cherryPick({ commit: chlogCommit }, context);
  // await push(undefined, context);

  // // Return to initial commit
  // await checkout({ to: init_head }, context);

  // Remove the temporary branch
  await push({ delete: dummyBranch, remote: repositoryUrl }, context);

  throw Error('finish');
}

module.exports = {
  verifyConditions,
  analyzeCommits,
  publish,
};

// verifyConditions
// analyzeCommits
// verifyRelease
// generateNotes
// prepare
// publish
// success
// fail
