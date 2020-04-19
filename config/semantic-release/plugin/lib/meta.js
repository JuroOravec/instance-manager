// Object with default data that should be shared between plugin functions
module.exports = function initMeta(options = {}) {
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

  const meta = {
    defaultBranches,
    ...options,
  };

  return meta;
};
