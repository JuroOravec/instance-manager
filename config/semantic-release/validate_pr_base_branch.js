const envCi = require('env-ci');
const minimatch = require('minimatch');

const mergeConfig = require('./merge.config');

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

function validatePrBaseBranch(branch) {
  const { isPr } = envCi();
  if (!isPr) {
    throw Error('validate_pr_base_branch ran in non-pull-request environment');
  }
  const branches = mergeConfig.branches || defaultBranches;
  const branchIsValid = branches.some(({ name }) => minimatch(branch, name));
  if (!branchIsValid) {
    throw Error(
      `Base branch "${branch}" is not among the branches allowed by semantic-release. Skipping the update of CHANGELOG.md.`,
    );
  }
}

if (require.main === module) {
  validatePrBaseBranch(process.argv[2]);
}

module.exports = validatePrBaseBranch;
