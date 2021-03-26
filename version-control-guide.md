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
- IF conflict | TODO add what todo if conflict
- ELSE
  - git push origin BRANCH_NAME
- Go to repo on gitlab and press
- If everything is OK? Delete branch locally
  - git branch -d BRANCH_NAME

## Commands

- Show branches
  - git branch
- Create new branch
  - git branch 'branch-name'
- Select branch
  - git checkout BRANCH-NAME
- Delete branch
  - git branch -d BRANCH-NAME
