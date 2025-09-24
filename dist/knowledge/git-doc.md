opens default editor for git
```
git config --global user.name "xyz"
git config --global user.email "xyz"
git config --global core.editor "mate -w"
git config --global alias.ci commit
git config --global -e
```


creates folder demo, inside it .git created
`git init demo`

if new files are not added then it'll be shown as red
`git status`

git add filename.extention

now after adding that file/ all file name'll be in green, it means it is in staging area
`git status`

add comment
`git commit -m "comment you want to add"`

means initialize current dir as git repo
`git init .`

add all untracked file
`git add .`

opens up git text editor to add comments manually
`git commit`

commit history
`git log`

commit history with details, to exit press Q
`git show`

shows the tracked filed
`git ls-files`

without adding to staging area ,commit directly with message, this command only works with already tracked files, means no new file/folder should be there
`git commit -am "message"`

filename should be the one that we need to be unstagged file changes again appear as RED in STATUS  this command just unstage the changes in file
`git reset HEAD filename`

file content restores back to previously known stage nothing to commit in STATUS
`git checkout -- filename`

can be any word in place of 'log'
`git help log`

consize view of commits
`git log --oneline --graph --decorate --all`

list down all the variables used as global user like username email core editor etc
`git config --global --list`

that command is now changed to xyz
`git config --global alias.xyz "git command without git keyword"`

rename filename , need to commit this renamed file
`git mv filename filename2`

delete file from HDD, need commit afterwards
`git rm filename`

just stage the deletion changes in repo
`git add -u`

track exact changes as renameing/deletion and add to staging area
`git add -A`

add .gitignore file to exclude the files being commited/added

shows the diff bw last change and HEAD pointer
`git diff`

shows the diff bw last change and HEAD in difference tool if set
`git difftool`

diff bw two commits, or can be one commit and HEAD pointer, diff command also works on Branches too
`git diff 23fg5y6 134r6ui8`

*** 3 types of merge > Fast Forward - all updates are on branch nothing on master > Simple - git auto resolves conflict > Conflict - git put you in conflict state (if same line is different on both the branches then it cause conflict while merging)

for that you have to on Parent branch only, otherwise wont work
`git merge branch_name`

opens up the merge tool if set, and leaves behind .orig file (that orig file must be excluded by updating .gitignore file)
`git mergetool`

*** TAGs are useful for noting down major milestone

gives a lightweight tag to the given branch head
`git tag mytag branchname`

gives a lightweight tag to the current pointer
`git tag mytag`

list out all the tags
`git tag --list`

obvious
`git tag -d mytag`

list tag that has v1.5 string init
`git tag -l "v1.5"`

delet tag in online repo
`git push origin --delete tagname`

all information regrading tags
`git show mytag`

update the tag, moving tag to particular commit id0
`git tag -f tagname 3e4r532`

Defines Annotated tag, optionally with given commit id
`git tag -a mytag2 -m "any message that defines your tag" (commit number)`

pushes the specific tags as define in origin
`git push origin tagname`

push all tags to remote
`git push origin --tags`

checkout in detached head mode
`git checkout v2.2`

### What if we want to work on some other thing and Save our current work somewhere

points head to the last commit and current work went to stash{0}
`git stash`

list down all the stash
`git stash list`

deletes the stash entry if not conflicting with last commit and apply past stash changes to staging area
`git stash pop`

### time travel with reset and reflog, rollback to past commit

change the head to ce2c810 with preserving Staging and Current work(red)
`git reset ce2c810 --soft`

default mode of reset, clears the staging area and moves all changes to current work
`git reset 6ad74df --mixed`

most destructing mode, any changes wiped out, staging(green) + current
`git reset d54r654 --hard`

all diff actions taken in project
`git reflog`

### push

checks for the remote connection if any
`git remote -v`

creates remote connection as 'origin'
git remote add origin https://github.com/username/repo.git

option u is for tracking in future, future push doesnt require u option, origin is previously define remote conn, it could be anything you've set
`git push -u origin master --tags`

with : you can delete branch remotely
`git push origin :branch_name`

### fetch/pull is the best practise before pushing anything to remote repo

just fetch the new updates but dont merge it
`git fetch`

Prune option looks for dead branch remotely and delete reference from your local repo
`git fetch -p`

combination of fetch and merge, current branch only
`git pull`

pull all branches to the locally
`hit pull --all`

merge onnline repo to your local repo to the point where they match and after that it applies your latest changes to locally, after this command you are ahead of online repo
`git pull --rebase`

removes from HDD and also git tracking
`git rm readme.md`

removes from git tracking only not from HDD
`git rm --cached readme.md`

rename and add to stage readme.md as readme
`git mv readme.md readme`

edits the previous commit and add new/modified files with new message, as if previous commit never happened
`git commit --amend`

suppose you staged two files, and wanted to unstage one of the file, Unstaging a Staged File
```
git reset HEAD CONTRIBUTING.md /
git restore --staged CONTRIBUTING.md
```

undone the last changes made, reset it to last commited stage, file change happens locally BEWARE
```
git checkout -- CONTRIBUTING.md /
git restore CONTRIBUTING.md
```

shows you the URLs that Git has stored for the shortname to be used when reading and writing to that remote (origin — that is the default name Git gives to the server you cloned from)
`git remote -v`

adds the pb remote, see below output
```
git remote add pb https://github.com/paulboone/ticgit
$ git remote -v
origin https://github.com/schacon/ticgit (fetch)
origin https://github.com/schacon/ticgit (push)
pb https://github.com/paulboone/ticgit (fetch)
pb https://github.com/paulboone/ticgit (push)
```
Now you can use the string pb on the command line in lieu of the whole URL. For example, if you want to fetch all the information that Paul has but that you don't yet have in your repository, you can run git fetch pb


### When creating new branch, all the changes that are on parent(master) branch are carry forwarded to the new branch.

creates new branch and also points to it
`git checkout -b branch_name`

shows all branches and which one are you currently on
`git branch`

delete branch, for that you have to on diff branch than that you're deleting
`git branch -d branch_name`

create new testing branch from current checkedout branch
`git branch testing`

shows head and all other pointer to commit number
`git log --oneline --decorate --graph --all`
f30ab (HEAD -> master, testing) Add feature #32 - ability to add new formats to the central interface

Create a new branch and switch to it
`git switch -c newBranch`

Switch to an existing branch
`git switch newBranch`

Return to your previously checked out branch
`git switch -`

merge hotFix branch into current checked out branch - when you try to merge one commit with a commit that can be reached by following the first commit's history, Git simplifies things by moving the pointer forward because there is no divergent work to merge together — this is called a “fast- forward (changes are only onne commit ahead then it's called fast-forward)
`git merge hotFix`

To see the last commit on each branch
`git branch -v`

To see which branches are already merged into the branch you're on
`git branch --merged`

To see all the branches that contain work you haven't yet merged in
`git branch --no-merged (branchName)`

locally change the branch name
`git branch --move bad-branch-name corrected-branch-name`

push changed branch name to remote server
`git push --set-upstream origin corrected-branch-name`

delete old branch name from remote server
`git push origin --delete bad-branch-name`

fetchs the data from remote and apply it to local and set current remote/master pointer to latest position same as master at remote's.
`git fetch (remote)`

push local serverfix branch to remote serverfix branch
`git push origin serverfix:serverfix`

push local serverfix branch to remote awesomebranch branch
the branch it tracks is called an “upstream branch”
`git push origin serverfix:awesomebranch`

If the branch name you're trying to checkout (a) doesn't exist and (b) exactly matches a name on only one remote, Git will create a tracking branch for you
create serverfix branch on local from remote/serverfix you just pulled from server
`git checkout serverfix (executing this after latest pull operation)`

To set up a local branch with a different name than the remote branch, you can easily use the first version with a different local branch name
`git checkout -b sf origin/serverfix`

If you already have a local branch and want to set it to a remote branch you just pulled down, or want to change the upstream branch you're tracking, -u means upstream
`git branch -u origin/serverfix`

If you want to see what tracking branches you have set up, you can use the -vv option to git branch. This will list out your local branches with more information including what each branch is tracking and if your local branch is ahead, behind or both, but this maybe not up to date, to see up to date details run  git fetch --all  first then  git branch -vv
`git branch -vv`

git pull = git fetch + git merge

deletes serverfix branch from remote
`git push origin --delete serverfix`

git checkout experiment
git rebase master
add all the commits on top of the master's latest commit, after than you have to merge it
git checkout master
git merge experiement

if you're on different branch then git rebase (basebranch) (topicbranch), it takes all the changes from the server and apply it to master, then you have to merge in master later
`git rebase master server`

never rebase anything that you've pushed somewhere ever

### IF YOU RESET YOUR PWD THEN

```
git config --global credential.helper osxkeychain
git config --global credential.helper wincred
```
