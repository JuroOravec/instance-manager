const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const readPkgUp = require('read-pkg-up');
const semver = require('semver');

const safeReadFile = require('../lib/safe-read-file');
const changelogVersion = require('../lib/changelog-version');

const fsp = fs.promises;

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
async function verifyConditions(pluginConfig, context, meta = {}) {
  const {
    options: { dryRun },
    envCi: { isPr, branch },
    logger,
  } = context;
  const {
    changelogFile = './CHANGELOG.md',
    pattern,
    baseBranch = branch,
    headBranch,
    releaseBranches = meta.defaultBranches,
    prepareChangelog,
    requireDryRun = true,
  } = pluginConfig;

  if (requireDryRun && !dryRun) {
    logger.info(
      'prepare-changelog is not intended to make changes in release ' +
        'environment. CHANGELOG will not be updated with new commits. Did ' +
        'you pass the dry run flag to semantic-release? If ' +
        'you need to run this plugin in release environment, set plugin ' +
        'option `requireDryRun` to `false`. To update CHANGELOG at release, ' +
        'use @semantic-release/changelog',
    );
    meta.verified = false;
    return;
  }

  const {
    packageJson: { version: pkgVersion },
  } = await readPkgUp();

  const chlogPath = (meta.changelogFile = path.resolve(
    process.cwd(),
    changelogFile,
  ));
  const chlogVersion = await changelogVersion(chlogPath, pattern);

  if (!prepareChangelog && semver.gt(chlogVersion, pkgVersion)) {
    logger.info(
      `CHANGELOG version ${chlogVersion} is ahead of package.json version ` +
        `${pkgVersion}. prepare-changelog will not update CHANGELOG with ` +
        'new commits. To override this message, set plugin option ' +
        '`prepareChangelog`.',
    );
    meta.verified = false;
    return;
  }

  if (prepareChangelog) {
    const chlogContent = prepareChangelog(safeReadFile(chlogPath) || '');
    await fsp.writeFile(chlogPath, chlogContent, 'utf8');
  }

  if (!headBranch && !isPr) {
    throw Error(
      'Unable to find branch with new commits. prepare-changelog either ' +
        ' needs to run in PR environment or plugin option `headBranch` must ' +
        ' be given.',
    );
  }

  // Check if the branch we want to use as a base is a release branch in
  // release environment.
  const releaseBranchNames = releaseBranches.map(({ name }) => name);
  const branchIsValid = releaseBranchNames.some((name) =>
    minimatch(baseBranch, name),
  );

  if (!branchIsValid) {
    logger.info(
      `Base branch "${baseBranch}" is not among the release branches ` +
        `${releaseBranchNames.join(', ')}. Skipping CHANGELOG update.`,
    );
    meta.verified = false;
    return;
  }

  meta.verified = true;
}

module.exports = function getVerifyConditions(meta = {}) {
  return async function verifyWrapper(pluginConfig, context) {
    return verifyConditions(pluginConfig, context, meta);
  };
};
