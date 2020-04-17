const defaultConfig = require('./config');
const { branches } = require('./merge.config');

const config = {
  ...defaultConfig,
  debug: true,
};

// If we're triggered by PR and merging to allowed branch, we generate and
// commit CHANGELOG.md so it can still be review before the merge.
config.plugins = [
  ['./config/semantic-release/plugin', { releaseBranches: branches }],
  ...config.plugins,
  // Update and commit updated CHANGELOG.md
  '@semantic-release/changelog',
  ['@semantic-release/git', { assets: ['CHANGELOG.md'] }],
  // Prevent NPM from publishing
  ['@semantic-release/npm', { npmPublish: false }],
];

module.exports = config;
