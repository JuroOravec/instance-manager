const execa = require('execa');

async function checkout({ create = false, to, from } = {}, execaOptions) {
  const cmdArgs = ['checkout'];
  if (create || from) {
    cmdArgs.push('-b');
  }
  cmdArgs.push(to);
  if (from) {
    cmdArgs.push(from);
  }
  return execa('git', cmdArgs, execaOptions);
}

async function push(
  { remote = 'origin', from, to, delete: deleteCmd, setUpstream = false } = {},
  execaOptions,
) {
  const mappedBranch = from ? `${from}:${to}` : to;
  const cmdArgs = ['push'];
  if (setUpstream) {
    cmdArgs.push('-u');
  }
  if (remote) {
    cmdArgs.push(remote);
    if (mappedBranch) {
      cmdArgs.push(mappedBranch);
    }
  }
  if (deleteCmd) {
    cmdArgs.push('--delete', deleteCmd);
  }
  return execa('git', cmdArgs, execaOptions);
}

async function pull({ remote = 'origin', to, from } = {}, execaOptions) {
  const mappedBranch = from ? `${from}:${to}` : to;
  return execa('git', ['pull', remote, mappedBranch], execaOptions);
}

async function rebase({ onto } = {}, execaOptions) {
  return execa('git', ['rebase', onto], execaOptions);
}

async function cherryPick({ commit, allowEmpty = false } = {}, execaOptions) {
  const cmdArgs = ['cherry-pick'];
  if (allowEmpty) {
    cmdArgs.push('--allow-empty');
  }
  cmdArgs.push(commit);
  return execa('git', cmdArgs, execaOptions);
}

async function branchExists({ branch, remote }, execaOptions) {
  try {
    await execa(
      'git',
      ['ls-remote', '--heads', '--exit-code', remote, branch],
      execaOptions,
    );
    return true;
  } catch (err) {
    return false;
  }
}

async function currentHead(options = {}, execaOptions) {
  return isDetachedMode(options, execaOptions)
    ? getLastCommitHash(options, execaOptions)
    : getBranchName(options, execaOptions);
}

async function getBranchName(options = {}, execaOptions) {
  const { stdout } = await execa('git', ['branch'], execaOptions);
  return stdout.match(/^\* (.*)\n/u)[1];
}

async function getLastCommitHash({ branch = 'HEAD' } = {}, execaOptions) {
  const { stdout } = await execa('git', ['rev-parse', '--short', branch], {
    ...execaOptions,
    stdout: undefined, // we want to extract stdout, so don't redirect it
  });
  return stdout;
}

async function isDetachedMode(options = {}, execaOptions) {
  try {
    await execa('git', ['symbolic-ref', '--short', '-q', 'HEAD'], execaOptions);
    return false;
  } catch (err) {
    return true;
  }
}

module.exports = {
  checkout,
  push,
  pull,
  rebase,
  cherryPick,
  branchExists,
  currentHead,
  getBranchName,
  getLastCommitHash,
  isDetachedMode,
};
