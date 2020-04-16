const envCi = require('env-ci');
const minimatch = require('minimatch');

const { branch, isPr } = envCi();

/**
 * The setup here works with 2 conditions:
 * - on PR if merging to accepted branches, in which case we generate
 *   CHANGELOG.md
 * - on merge of the accepted branch, in which case we publish the package
 */

/**
 * PLUGINS
 */

/**
 * Plugin sequence common in both merge and PR scenarios
 *
 * Other plugins available at https://semantic-release.gitbook.io/semantic-release/extending/plugins-list
 * Order is important, see:
 * - https://github.com/semantic-release/changelog/tree/bede4d04b0a9ec13a5661bf0424465176486f3fd#examples
 * - https://github.com/semantic-release/npm/tree/1d1bc40fb8a47f3e40cb8c0268b8ca17b2ace95a#examples
 */
const commonPlugins = [
  // Verify package.json contains only stable / mature dependencies
  [
    'semantic-release-verify-deps',
    {
      dependencies: true,
      regExps: [
        // Error on pre-release deps (e.g. beta, alpha, etc)
        // Matches ending without a digit
        '\\d$',
        // Error on relative deps (e.g. ./ or ../)
        // Matches start with a dot
        '^\\.',
        // Error on GitHub deps
        // Matches deps including 'github'
        '.*github.*',
      ],
    },
  ],
  // Parse commit messages
  [
    '@semantic-release/commit-analyzer',
    // https://github.com/semantic-release/commit-analyzer/tree/2b9c73e1b4d63221980da18fd3d1f2817aaee1b8#rules-definition
    {
      releaseRules: [
        // Treat refactor as patch
        { type: 'refactor', release: 'patch' },
        // Treat style as patch
        { type: 'style', release: 'patch' },
        // README change.
        // Scope contains variation of README, also incl. dashed variations
        // (e.g. read-me)
        {
          type: 'docs',
          scope: '*{README,{R,r}ead{-,}{M,m}e}*',
          release: 'patch',
        },
        // API docs change.
        // Scope contains variation of API
        {
          type: 'docs',
          scope: '*{A,a}{P,p}{I,i}*',
          release: 'patch',
        },
        // TypeDoc docs change
        // Scope contains variation of TypeDoc, also incl. dashed variations
        // (e.g. type-doc)
        {
          type: 'docs',
          scope: '*{T,t}ype{-,}{D,d}oc*',
          release: 'patch',
        },
        // Dependency changed (NOT devDep).
        // Scope matches one of following (including lowercase variations):
        // - Dep
        // - Deps
        // - Dependency
        // - Dependencies
        { scope: '{D,d}ep{endenc{y,ies},s,}', release: 'patch' },
        // Ignore no-release scope
        { scope: 'no-release', release: false },
      ],
    },
  ],
  // Construct release notes based on parsed commits
  '@semantic-release/release-notes-generator',
];

// If we're triggered by PR and merging to allowed branch, we generate and
// commit CHANGELOG.md so it can still be review before the merge.
const pluginsIfPr = [
  ...commonPlugins,
  // Update and commit updated CHANGELOG.md
  '@semantic-release/changelog',
  ['@semantic-release/git', { assets: ['CHANGELOG.md'] }],
  // Prevent NPM from publishing
  ['@semantic-release/npm', { npmPublish: false }],
];

// Otherwise we release the package to desired channels.
const pluginsIfMerge = [
  ...commonPlugins,
  // Publish to NPM, commit updated package.json, and publish GitHub release
  // https://github.com/semantic-release/semantic-release/issues/672
  ['@semantic-release/npm', { tarballDir: 'temp' }],
  ['@semantic-release/git', { assets: ['package.json'] }],
  ['@semantic-release/github', { assets: ['temp/*.tgz'] }],
];

/**
 * BRANCHES
 */

// If we're triggered by PR and merging to allowed branch, we want to trigger
// semantic-release for any branch
const branchesIfPr = ['**/*'];

// Otherwise semantic-release should run only if the triggering branch is one
// of the allowed.
// Defaults from:
// https://github.com/semantic-release/semantic-release/blob/caa3526caa686c18eb935dace80a275017746215/docs/usage/configuration.md#branches
const branchesIfMerge = [
  { name: '+([0-9])?(.{+([0-9]),x}).x' },
  { name: 'master' },
  { name: 'next' },
  { name: 'next-major' },
  { name: 'beta', prerelease: true },
  { name: 'alpha', prerelease: true },
];

/**
 * CONFIG
 */

// To enable PR config, we need:
const shouldUsePrConfig =
  // - to be triggered by PR
  isPr &&
  // - the branch the PR is merging to must be one of the branches allowed in
  //   semantic-release
  branchesIfMerge.some(({ name }) => minimatch(branch, name));

// Main config object, define other paramters here.
// For config options, see:
// https://semantic-release.gitbook.io/semantic-release/usage/configuration
const config = {
  plugins: shouldUsePrConfig ? pluginsIfPr : pluginsIfMerge,
  branches: shouldUsePrConfig ? branchesIfPr : branchesIfMerge,
};

module.exports = config;
