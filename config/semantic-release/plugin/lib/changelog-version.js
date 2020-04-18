const safeReadFile = require('./safe-read-file');

module.exports = async function changelogVersion(
  path,
  pattern = /#+\s+\[(?<version>.*?)\]/u,
) {
  const changelog = (await safeReadFile(path)) || '';
  const match = changelog.match(pattern);
  const version = match
    ? match.groups
      ? match.groups.version
      : match[1]
    : null;
  return version;
};
