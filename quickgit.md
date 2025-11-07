### One Time Setup Only 

#### 1. Clone the repo locally 
```bash
git clone https://github.com/PPKPIsIrying112/Campus_Lost_And_Found.git
```

#### 2. Go into directory 
```bash
cd Campus_Lost_and_Found 
# Come back to this directory everytime you want to work on this repo
```

### Usual Stuff 

##### Get Latest Changes from Main branch
```bash
git checkout main             # Switch to main first
git pull origin main          # Get everyone's latest updates
```


#### Create New Branch 
```bash
git checkout -b feature/your-feature-name
# Examples: feature/login, fix/navbar, update/readme

```

#### See what's changed
```bash
git status 
```


#### Stage changes
```bash
git add .    # Or specific files

```

#### Commit changes (saved locally only)
```bash
git commit -m "Descriptive message"  
# Can commit multiple times before pushing
```


#### Push ur branch to GitHub (upload commits)
```bash
git push origin feature/your-feature-name  
```

#### Create a Pull request before merging to main 
- Go to GitHub repository
- Click "Pull requests" → "New pull request"
- Select your branch to merge into main
- Add description of what you did
- Tag teammates for review (@username)

#### After PR approved & merged
```bash
git checkout main             # Switch back to main
git pull origin main          # Get the merged changes  
git branch -d old-branch-name # Delete ur old local branch (optional)
```


#### List all branches / Check which branch u're at 
```bash
git branch                    # * shows current branch
```

#### Get updates from main into your current branch (if needed)
```bash
git merge main                # Brings main's changes into your branch
```


#### IMPORTANT RULES
- NEVER push directly to main
- ALWAYS pull before starting new work  
- Create NEW branch for each feature
- Get at least 1 approval before merging PR
- Write CLEAR commit messages

#### If you see CONFLICT when pulling
- Open the conflicted files
- Look for <<<<<<< and >>>>>>> markers  
- Keep the code you want, delete the markers
- Then: git add . → git commit -m "Resolve conflict" → git push