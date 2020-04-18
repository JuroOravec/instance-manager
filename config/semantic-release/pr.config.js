const defaultConfig = require('./config');
const { branches } = require('./merge.config');

const config = {
  ...defaultConfig,
  debug: true,
};

// REALEASE VERSION
// If we're triggered by PR and merging to allowed branch, we generate and
// commit CHANGELOG.md so it can still be review before the merge.
config.plugins = [
  // Update and commit updated CHANGELOG.md
  '@semantic-release/changelog',
  ['@semantic-release/git', { assets: ['CHANGELOG.md'] }],
  // This must run AFTER changelog and git, but before commit-analyzer
  ['./config/semantic-release/plugin/release', { releaseBranches: branches }],
  ...config.plugins,
  // // Prevent NPM from publishing
  // ['@semantic-release/npm', { npmPublish: false }],
];

// DRY RUN VERSION
// If we're triggered by PR and merging to allowed branch, we generate and
// commit CHANGELOG.md so it can still be review before the merge.
config.plugins = [
  // Plugin calls release-notes-generator, changelog and git plugins itself,
  // so we don't have to include them here. But the plugin must be BEFORE
  // the commit-analyzer plugin.
  ['./config/semantic-release/plugin', { releaseBranches: branches }],
  '@semantic-release/commit-analyzer',
];

module.exports = config;
