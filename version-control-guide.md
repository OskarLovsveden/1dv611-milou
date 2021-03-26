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
- Go to merge request page of the repo and press "Create merge request"
  - Add info and stuff
- Scroll down and press "Submit merge request"(Make sure that "Delete source branch when merge request is accepted." is checked)
- If everything went ok, press the "Merge" button
- Change to master branch and pull the latest changes
  - git checkout master
  - git pull
- Delete the feature branch
  - git branch -d BRANCH_NAME
- REPEAT
- 8D
- Profit

## Commands

- Show branches
  - git branch
- Create new branch
  - git branch 'branch-name'
- Select branch
  - git checkout BRANCH-NAME
- Delete branch
  - git branch -d BRANCH-NAME
