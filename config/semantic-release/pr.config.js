const defaultConfig = require('./config');

const config = {
  ...defaultConfig,
};

// If we're triggered by PR and merging to allowed branch, we generate and
// commit CHANGELOG.md so it can still be review before the merge.
config.plugins = [
  ...config.plugins,
  // Update and commit updated CHANGELOG.md
  '@semantic-release/changelog',
  ['@semantic-release/git', { assets: ['CHANGELOG.md'] }],
  // Prevent NPM from publishing
  ['@semantic-release/npm', { npmPublish: false }],
];

// If we're triggered by PR and merging to allowed branch, we want to trigger
// semantic-release for any branch.
config.branches = ['**/*'];

module.exports = config;
