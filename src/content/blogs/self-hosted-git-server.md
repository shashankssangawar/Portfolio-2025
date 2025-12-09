# Self-Hosted Git Server Using Plain SSH

Most developers assume that Git hosting requires a full platform like GitHub or GitLab. But Git itself is surprisingly self-sufficient. If you already have an SSH-capable Linux machine on your network, then you already have everything needed to host remote repositories.

In this guide, we turn your laptop / machine into a fully functional Git server. We follow a structure similar to GitHub’s internal architecture: a bare repository acting as the actual remote, and a separate working directory used for verification, automated tasks, or internal inspection.

The goal is not simply to host code, but to understand how Git truly works underneath the large hosting providers we are familiar with.

---

**Video Reference**:

[![YouTube Video](https://img.youtube.com/vi/iuIdBfjL62s/0.jpg)](https://www.youtube.com/watch?v=iuIdBfjL62s)


---

# Why SSH Makes Git Hosting So Simple

SSH already provides everything Git needs:

* Secure communication
* Authentication via keys or passwords
* Access control through standard Linux permissions
* Built-in support inside Git itself

If you can log into your machine like this:

```bash
ssh shashank@192.168.0.102
```

then Git can use that same connection for cloning, pushing, and pulling.
There is no need for a web interface, no need to install any Git server software, and no need for additional services.

This simplicity is exactly why GitHub also uses SSH as one of its primary protocols.

---

# The GitHub-Style Repository Layout

Rather than pushing directly into a bare repo on the server, we will create two repositories:

1. **A bare repository**
   This is the true remote that clients push into.
   GitHub stores all user repositories in this format.

2. **A working directory on the server**
   This is optional but useful.
   It allows you to inspect files, run automated tests, or deploy code without interfering with the bare repository.

Our layout will look like this:

```
/home/shashank/git-repos/
      ├── project.git        (bare repo, the actual remote)
      └── project-working/   (a local working copy on the server)
```

This is a sample recreation of how platforms like GitHub or GitLab handle repositories internally.

---

# Step 1: Create the Bare Repository on the Server

SSH into your laptop:

```bash
ssh shashank@192.168.0.102
```

Create a place to store repositories:

```bash
mkdir -p ~/git-repos
cd ~/git-repos
```

Now create the bare repository:

```bash
git init --bare project.git
```

A bare repo contains only Git metadata and no working tree. It is designed specifically for remote access and multi-user collaboration.

---

# Step 2: Create a Working Directory on the Server

To make the server feel more like GitHub, we also keep a working directory:

```bash
cd ~/git-repos
mkdir project-working
cd project-working
git init
git remote add origin ~/git-repos/project.git
```

This directory behaves like any normal Git checkout. You can make changes here, test server hooks, or run deployment scripts later.

---

# Step 3: Add the Initial Commit

Inside `project-working`:

```bash
echo "Initial server file" > README.md
git add README.md
git commit -m "Initial commit"
git push -u origin master
```

This populates the bare repository with its first commit.
At this stage, the bare repo is ready for usage.

---

# Step 4: Clone the Repository from Another Machine

On your local workstation:

```bash
git clone shashank@192.168.0.102:git-repos/project.git
cd project
```

You now have a working copy of the repository hosted on your laptop server.

---

# Working with the Repository (A Practical Walkthrough)

Below are the commands and concepts used most often when working with Git. These examples help reinforce how nothing changes when using SSH instead of platforms like GitHub.

---

# Adding Files and Pushing Changes

Let’s create a simple source file:

```bash
echo '#include <stdio.h>' > hello.c
echo 'int main(){ printf("Hello\n"); return 0; }' >> hello.c
```

Add and commit the file:

```bash
git add hello.c
git commit -m "Add hello world program"
```

Push it to your SSH server:

```bash
git push
```

Git knows where to push because the first push established `origin/master` as the upstream.

---

# Understanding `git push`

`git push` sends your local commits to the remote repository.
The bare repository acts as the authoritative source of truth.
Every clone pulls updates from it, and every developer pushes their changes into it.

In other words:

```
Local clone → SSH → Bare repo on server
```

---

# Understanding Branches with `git branch`

Branches in Git are nothing more than pointers to commits. They allow you to work on features independently without disturbing the main code.

List existing branches:

```bash
git branch
```

Create a new branch:

```bash
git branch feature-x
```

Switch to the branch:

```bash
git checkout feature-x
```

Or do both at once:

```bash
git checkout -b feature-x
```

Push the branch to the server:

```bash
git push -u origin feature-x
```

Your remote repository now stores this branch exactly like GitHub would.

---

# Using `git stash` When Switching Tasks

When you are in the middle of a change and need to switch branches, Git may refuse because your working tree is not clean.
This is where `git stash` becomes useful.

Save your uncommitted changes:

```bash
git stash
```

Switch branches:

```bash
git checkout master
```

Later, restore the stashed work:

```bash
git stash pop
```

This is especially helpful during merge conflicts or when juggling multiple tasks.

---

# A Typical Workflow on Your Self-Hosted Git Server

Below is what daily development might look like:

1. Update your branch:

   ```bash
   git pull
   ```

2. Start a new feature:

   ```bash
   git checkout -b feature-login
   ```

3. Make changes, commit them:

   ```bash
   git add .
   git commit -m "Implement login logic"
   ```

4. Push the feature branch:

   ```bash
   git push -u origin feature-login
   ```

5. Return to the main branch:

   ```bash
   git checkout master
   ```

6. If you forgot to commit before switching:

   ```bash
   git stash
   git checkout master
   ```

This is exactly the same workflow developers use on GitHub, only hosted entirely on your own machine.

---

# Conclusion

You now have a fully functional Git server powered solely by SSH.
No additional software, no third-party platform, no accounts. Just the tools already built into Git and Linux.

Your setup includes:

* A GitHub-style bare repository
* A working copy on the server for optional inspection
* A client workflow identical to pushing to GitHub
* Support for all common Git commands: `push`, `branch`, `stash`, and more

This architecture is simple, reliable, and transparent, and it demonstrates how Git was designed to operate long before centralized platforms became popular.
