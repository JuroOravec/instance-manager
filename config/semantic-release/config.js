// Main config object, define common paramters here.
// For config options, see:
// https://semantic-release.gitbook.io/semantic-release/usage/configuration
const config = {
  /**
   * Other plugins available at https://semantic-release.gitbook.io/semantic-release/extending/plugins-list
   * Order is important, see:
   * - https://github.com/semantic-release/changelog/tree/bede4d04b0a9ec13a5661bf0424465176486f3fd#examples
   * - https://github.com/semantic-release/npm/tree/1d1bc40fb8a47f3e40cb8c0268b8ca17b2ace95a#examples
   */
  plugins: [
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
  ],
};

module.exports = config;
