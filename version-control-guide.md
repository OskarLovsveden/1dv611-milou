# Version Control Guide

## Work Flow

### Working On New Feature

- Make sure that you are in the master branch
  - git branch
- Pull the latest changes
  - git pull
- Create a new branch
  - git branch 'branch-name'
- Change branch to the new branch
  - git checkout BRANCH_NAME
- Implement feature.
  - git add .
  - git commit -m 'my cool message'
- Change back to master and pull latest changes
  - git checkout master
  - git pull
- Change back to your branch
  - git checkout BRANCH_NAME
- Merge with master
  - git merge master

## Commands

- Show branches
  - git branch
- Create new branch
  - git branch 'branch-name'
- Select branch
  - git checkout BRANCH-NAME
- Delete branch
  - git branch -d BRANCH-NAME
