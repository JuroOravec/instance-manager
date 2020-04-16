# Exit on error (https://unix.stackexchange.com/a/254675/377562)
set -e

# We want to run this script only in CI when triggered by a pull request to one
# of the release branches (release branches defined in semantic-release's
# config).
# Since by definition the branch that is making a PR to a release branch is NOT
# the release branch, we had to loosen rules in semantic-release config on
# which branches are allowed for when triggered by pull request. So we need to
# verify here instead that the target branch is one of release branches.
node ./config/semantic-release/validate_pr_base_branch.js $TRAVIS_BRANCH

# To avoid errors if this script was started in a different branch, save its
# name so we can restore it later.
init_branch=$(git branch | sed -n 's/^\* //p')

# Make a dummy branch from the target branch
dummy_target_branch="temp/$TRAVIS_PULL_REQUEST_BRANCH"
git checkout $TRAVIS_BRANCH
git checkout -b $dummy_target_branch

# Apply our changes to the target dummy change
git merge $TRAVIS_PULL_REQUEST_BRANCH

# semantic-release, which we use to get and format the CHANGELOG, verifies if
# the target branch exists by fetching it from remote, so we need to set the
# dummy branch on remote.
git push -u origin $dummy_target_branch

# Return to initial branch
git checkout $init_branch

# Run semantic-release but with our dummy branch as target branch, so the
# commit with updated CHANGELOG.md is pushed there.
node ./config/semantic-release/run_semantic_release.js $dummy_target_branch

# Copy the last commit from the dummy branch to the PR branch. The last commit
# is expected to be the CHANGELOG.md update.
changelog_commit=$(git rev-parse --short $dummy_target_branch)
git checkout $TRAVIS_PULL_REQUEST_BRANCH
git cherry-pick $changelog_commit
git push
git checkout $init_branch

# Remove the temporary branch
git push origin --delete $dummy_target_branch