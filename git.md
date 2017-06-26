---------------------------------------

  ### Find out what's changed
  ```
  $ git status
  ```



  ### Get a file back
  Checkout the file from an older commit or branch.

  ```
  $ git checkout master ui/src/whatever/file.jsx
  ```



  ### Commit you changes
  First, check what branch you're on:
  ```
  $ git branch
  $ git lola
  ```

  Next, add anything staged (in green) to a new commit.
  ```
  $ git add foo.txt
  $ git add bar.jpg
  $ git add -A ###adds everything recursively in the current folder
  ```

  Then, commit:
  ```
  $ git commit -m "Adds new scenario and updates the reflection questions."
  ```


  ### Push it up to GitHub
  ```
  $ git push origin feature/whatever-branch-you-want
  ```

  Then go to GitHub and make a pull request!


  ### Fetch the latest changes from GitHub
  ```
  $ git fetch
  ```

  Then you can check what changed.

  ```
  $ git lola
  ```
