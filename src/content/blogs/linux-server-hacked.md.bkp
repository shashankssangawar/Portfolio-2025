# How My Hostinger VPS Got Infected with XMRig npm Attack: A Battle I'm Still Fighting

## Introduction

I never thought a simple `npm install` would turn into a multi-day nightmare that I still haven't fully resolved. I'd been developing with Node.js for years, deployed dozens of projects, and considered myself reasonably security-conscious. Then one evening, while pushing an update to my Next.js application, everything went sideways.

This is the ongoing story of how my Hostinger VPS got compromised through the npm supply chain attack, how the malware deployed XMRig cryptominer with sophisticated persistence mechanisms **that I still can't fully eradicate**, and the frustrating journey of fighting an infection that keeps coming back. I'm sharing this as it unfolds because maybe someone reading this knows what I'm missing—or can learn from my ongoing struggle.

**Update as of December 8, 2025: The miner is STILL coming back after every reboot, and I don't know where it's hiding.**

## The Day Everything Went Wrong

### The First Warning Signs

It started on past week Friday evening. I was pushing code for a client project— a Next.js SAAS app with an Express.js backend. Nothing unusual, just routine deployment:

```bash
$ npm install
npm WARN deprecated package@1.0.0: This package is deprecated
added 247 packages, and audited 1342 packages in 38s
```

The installation completed without errors. I pushed the build and new changes to production, restarted my services with `systemctl`, and went to bed thinking everything was fine.

The next morning, I woke up to angry messages from my client. The site was down. I logged into my Hostinger VPS control panel and saw my CPU usage pinned at 100% for the past six hours. My heart sank.

```bash
$ ssh admin@my-vps.hostinger.com
$ htop
```

What I saw made my stomach drop:

```
  PID      USER   PRI  NI   VIRT   RES   SHR S   CPU%   MEM%   TIME+       Command
456510    root    20   0   42348  5888  5632 S   97.0    0.0    0:00.19   /root/website/build-new/xmrig --url 178.218.144.107:3333 --user b018e764-316
```

Processes I didn't recognize, consuming every CPU cycle. That's when I knew—I'd been compromised.

### The Initial Discovery

I immediately checked what these processes were actually doing:

```bash
$ ps aux 
root      462038  0.1  0.0  42348  5888 ?        Ssl  08:27   0:00 /root/website/build-new/xmrig --url 178.218.144.107:3333 --user b018e764-316

$ ls -la /tmp/.npm-cache/daemon
-rwxr-xr-x 1 root root 4823040 Nov 24 03:22 /tmp/.npm-cache/daemon

$ file /tmp/.npm-cache/daemon
/tmp/.npm-cache/daemon: ELF 64-bit LSB executable, x86-64
```

A 4.8MB binary masquerading as a Node.js process. I checked its contents:

```bash
$ strings /tmp/.npm-cache/daemon | grep -i xmr
xmrig
donate.v2.xmrig.com
pool.supportxmr.com
RandomX
monero
```

XMRig. Cryptominer. My server was mining Monero for someone else, and I had no idea how long it had been running.

## How They Got In: The Attack Vector

### The npm Supply Chain Compromise

After hours of investigation, I pieced together what happened. During that routine `npm install` the previous evening, I had unknowingly installed a compromised package that was part of the attack campaign.
I checked my `package-lock.json` against published lists of compromised packages:

```bash
$ cat package-lock.json
    "node_modules/compromised-package": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/package/core/-/core-1.1.7.tgz",
```

Version 1.1.7. That was one of the compromised versions. My Next.js build tool had been weaponized.

### The Infection Chain

Looking through my logs, I reconstructed the attack chain:

1. **Installation**: When I ran `npm install`, the malicious package executed its post-install script
2. **Credential Theft**: The malware used TruffleHog to scan my filesystem for credentials
3. **Deployment**: It downloaded and deployed the XMRig binary to multiple locations
4. **Persistence**: It created systemd services, cron jobs, and modified startup scripts
5. **Propagation**: It attempted to compromise my npm packages and GitHub repositories

I found evidence of all this in my system logs:

```bash
$ grep "npm" /var/log/syslog | grep "Nov 24"
Nov 24 21:47:33 vps systemd[1]: Started npm post-install.
Nov 24 21:47:35 vps npm[3421]: Scanning for credentials...
Nov 24 21:47:38 vps npm[3421]: Found 17 potential secrets
```

### Why My Setup Was Vulnerable

My stack made me a perfect target:

- **Next.js application**: Hundreds of npm dependencies, any of which could be compromised
- **Express.js API**: Running as `root` with write access to the application directory
- **Manual Apache setup**: No docker containerization or isolation
- **Systemd services**: Running my apps with broad permissions
- **Carelessness**: Limited monitoring on Hostinger VPS

The malware exploited every weakness.

## The Anatomy of My Infection: What I Found (So Far)

### The Persistence Mechanisms I've Discovered

As I dug deeper using command-line tools, I discovered the attackers had installed multiple layers of persistence. What terrifies me is that **even after removing everything I found, the miner keeps coming back**.

#### The Fake Systemd Services (REMOVED)

First, I listed all active services:

```bash
$ systemctl list-units --type=service --state=running
UNIT                           LOAD   ACTIVE SUB     DESCRIPTION
npm-update.service            loaded active running NPM Update Service
node-agent.service            loaded active running Node Agent Service
c3pool.service                loaded active running Crypto Mining Service
```

Those weren't my services. I examined them:

```bash
$ systemctl cat npm-update.service
# /etc/systemd/system/npm-update.service
[Unit]
Description=NPM Update Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/tmp/.npm-cache/daemon --config=/var/www/.config/sys.json
Restart=always
RestartSec=10
StandardOutput=null
StandardError=null

[Install]
WantedBy=multi-user.target
```

I found the malicious services total. **I removed all of them:**

```bash
$ sudo systemctl stop npm-update.service node-agent.service npm-service.service c3pool.service
$ sudo systemctl disable npm-update.service node-agent.service npm-service.service c3pool.service
$ sudo rm /etc/systemd/system/npm-*.service
$ sudo rm /etc/systemd/system/node-*.service
$ sudo rm /etc/systemd/system/c3pool.service
$ sudo systemctl daemon-reload
```

**But the miner still comes back after reboot.**

#### The Malicious Binaries (REMOVED)

I searched for all the rogue files:

```bash
$ find / -name "*daemon*" -o -name "*agent*" 2>/dev/null | grep -v "/proc"
/tmp/.npm-cache/daemon
/usr/local/bin/npm-agent
/var/www/.npm/node-daemon
/home/admin/.local/bin/update-agent
/opt/.systemd/npm-service
```

**I deleted every single one:**

```bash
$ sudo rm -f /tmp/.npm-cache/daemon
$ sudo rm -f /usr/local/bin/npm-agent
$ sudo rm -f /var/www/.npm/node-daemon
$ sudo rm -f /home/admin/.local/bin/update-agent
$ sudo rm -f /opt/.systemd/npm-service
$ sudo rm -rf /tmp/.npm-cache
$ sudo rm -rf /opt/.systemd
```

**But after reboot, new binaries appear in different locations.**

#### The Cron Jobs (REMOVED)

I checked and cleaned all crontabs:

```bash
$ crontab -l -u root
*/15 * * * * /tmp/.npm-cache/daemon > /dev/null 2>&1
@reboot /usr/local/bin/npm-agent --config /var/www/.config/sys.json

$ sudo crontab -r -u root
$ sudo crontab -r -u admin
$ sudo rm -f /etc/cron.d/npm-*
$ sudo rm -f /var/spool/cron/crontabs/root
$ sudo rm -f /var/spool/cron/crontabs/admin
```

**All cron jobs removed. But the miner still starts on reboot.**

#### The Apache Configuration Backdoor (REMOVED)

I found and removed a PHP backdoor:

```bash
$ grep -r "auto_prepend_file" /etc/apache2/
/etc/apache2/conf-enabled/php.conf:php_value auto_prepend_file "/var/www/.npm/payload.php"

$ sudo rm /var/www/.npm/payload.php
$ sudo rm /etc/apache2/conf-enabled/php.conf
$ sudo systemctl restart apache2
```

**Backdoor removed. Yet the miner persists.**

### What Happens After Every Reboot (THE MYSTERY)

Here's what drives me insane. After cleaning everything and rebooting:

```bash
$ sudo reboot
```

Within 5 minutes of the system coming back up:

```bash
$ htop
  PID USER      PR  NI    VIRT    RES  %CPU %MEM     TIME+ COMMAND
 1847 root  20   0  892144 756032  98.9 18.7    12:15 /var/tmp/.system/kworker
```

**A NEW process with a DIFFERENT name in a DIFFERENT location is running.**

```bash
$ ls -la /var/tmp/.system/kworker
-rwxr-xr-x 1 root root 4823040 Dec 08 09:23 /var/tmp/.system/kworker

$ md5sum /var/tmp/.system/kworker
7f8c3d4e9a2b1f6c8d3e5a7b9c1d2f4e  /var/tmp/.system/kworker
```

**Same hash as the original XMRig binary. It's being redeployed somehow.**

### The Performance Impact (ONGOING)

Every reboot, the cycle repeats:

```bash
$ uptime
 09:15:32 up 5 min,  1 user,  load average: 3.87, 2.92, 1.49
```

Within 5 minutes, load average climbs back to maximum.

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          7.8Gi       7.0Gi       256Mi        89Mi       612Mi       524Mi
```

Memory consumption immediately spikes.

### The Network Activity (STILL ACTIVE)

The miner reconnects to pools every time:

```bash
$ netstat -tulpn | grep root
tcp        0      0 10.0.1.15:44523        92.XXX.XXX.XXX:3333    ESTABLISHED 1847/kworker
```

Different process name, same mining pool connection.

## What I've Tried (And What HASN'T Worked)

### Attempt 1: Clean All Obvious Persistence Mechanisms

**What I did:**
```bash
# Removed all systemd services
$ sudo systemctl disable npm-*.service node-*.service
$ sudo rm /etc/systemd/system/*npm*.service
$ sudo rm /etc/systemd/system/*node*.service
$ sudo systemctl daemon-reload

# Removed all cron jobs
$ sudo crontab -e


# Cleaned all profile files
$ sudo nano /etc/profile
$ sudo nano /etc/bash.bashrc
$ sudo nano ~/.bashrc
$ sudo nano /var/www/.profile

# Deleted all malicious binaries
$ sudo find / -name "*daemon*" -delete 2>/dev/null
$ sudo find / -name "*agent*" -delete 2>/dev/null
```

**Result:** After reboot, miner came back with a new name in `/var/tmp/.system/kworker`

### Attempt 2: Remove node_modules and Reinstall Clean

**What I did:**
```bash
$ cd /var/www/nextjs-app
$ rm -rf node_modules package-lock.json
$ npm cache clean --force
$ npm install
```

**Result:** Miner still came back.

### Attempt 3: Check Init Systems and Boot Scripts

**What I checked:**
```bash
# systemd
$ systemctl list-unit-files | grep enabled
# Nothing suspicious found

# init.d
$ ls -la /etc/init.d/
# All scripts look legitimate

# rc.local
$ cat /etc/rc.local
# File doesn't exist

# systemd generators
$ ls -la /etc/systemd/system-generators/
$ ls -la /usr/lib/systemd/system-generators/
# No suspicious generators
```

**Result:** Nothing found. Still doesn't explain how the miner starts.

### Attempt 4: Search for Hidden Files and Directories

**What I searched:**
```bash
# All hidden files
$ find / -name ".*" -type f 2>/dev/null | grep -v proc

# Files modified in last 7 days
$ find / -type f -mtime -7 2>/dev/null | grep -v proc

# Files owned by root
$ find / -user root -type f 2>/dev/null | grep -v "/var/www"

# Executable files in suspicious locations
$ find /tmp /var/tmp /dev/shm -type f -executable 2>/dev/null
```

**Result:** Found some suspicious files, deleted them, but miner still returns.
## What I Think Is Happening (My Theory)

Based on everything I've found and tried, here's what I believe is happening:

### Theory 1: Hidden npm Package with Post-Install Hook

The malware might still be lurking in one of my `node_modules` directories, with a post-install script that runs on every `npm install` or system startup.

**Evidence:**
- Even after removing binaries, new ones appear
- They always run as `root` (the user that runs npm)
- The infection survived removal of node_modules in ONE project, but I have multiple projects

**What I haven't tried:**
```bash
# Check all package.json files for post-install scripts
$ find /var/www -name "package.json" -exec grep -l "postinstall\|preinstall" {} \;

# This could reveal hidden scripts in nested dependencies
```

### Theory 2: Systemd User Services (Not System Services)

I removed system-wide systemd services, but **I never checked user-level services**.

**Evidence:**
- Services can run without appearing in `systemctl list-units`
- root user might have its own user services


### Theory 3: Systemd Timers Instead of Cron Jobs

Modern malware might use systemd timers instead of cron jobs.

**Evidence:**
- I removed all cron jobs but timing-based execution still happens
- Systemd timers are harder to find

### Theory 4: Modified Node.js or npm Binary

The malware might have trojaned the Node.js or npm binary itself.

**Evidence:**
- Every time npm runs, the miner comes back
- The infection is tied to my Node.js projects

### Theory 5: The Infection Is in My Application Code

The malware might have modified my Next.js or Express.js application code to spawn the miner.

**Evidence:**
- The miner runs as root
- It always starts when my applications start

### Theory 7: The Malware Reinstalls Itself from a Remote Source

The server might be pushing the malware back to my server.

**Evidence:**
- New binaries appear in different locations

## Questions I'm Still Trying to Answer

I'm documenting these questions because maybe someone reading this has encountered the same thing:

1. **Where is the reinfection coming from?** What is spawning the new miner process after every reboot?

2. **Why do the binaries keep changing locations?** `/tmp/.npm-cache/daemon` → `/usr/local/bin/npm-agent` → `/var/tmp/.system/kworker`

3. **Is there a kernel-level threat I'm missing?** Could the malware have infected the kernel itself?

4. **Did I miss a systemd user service?** Are there services running under root's user context?

5. **Is my Node.js installation itself compromised?** Should I completely purge and reinstall Node.js?

6. **Could there be multiple infection vectors?** Maybe the npm package was just the initial entry, and something else is maintaining persistence?

7. **Is the infection in my git repository?** Could malicious code have been committed to my projects?

## What You Should Do (If You're Infected)

If you're reading this because you're in the same situation, here's what I recommend:

### Immediate Actions

1. **Kill the miner processes:**
```bash
$ ps aux | grep root | grep -E "daemon|agent|kworker"
$ sudo pkill -9 -f "daemon|agent|kworker"
```

2. **Rotate ALL credentials immediately:**
- GitHub tokens: https://github.com/settings/tokens
- npm tokens: `npm token revoke`
- Database passwords
- SSH keys
- API keys in .env files

### Investigation Steps

3. **Check for compromised npm packages:**
```bash
$ cat package-lock.json
```

5. **Search for all systemd services (including user services):**
```bash
$ systemctl list-unit-files
$ sudo -u root systemctl --user list-unit-files
$ find /etc/systemd -type f
$ find ~/.config/systemd -type f
```

4. **Search all node_modules for post-install scripts:**
```bash
$ find /var/www -name "package.json" -exec grep -H "postinstall\|preinstall" {} \;
```

### Consider Nuclear Option

If you can't find the source after 2-3 days of investigation:

**Back up your data and rebuild the server from scratch.**

I know it's drastic, but it might be the only way to be certain. I'm considering this myself.

## Conclusion: An Ongoing Battle

I'm writing this blog post while still fighting the infection. I don't have all the answers. I don't have a clean solution. What I have is a persistent cryptominer that I can't fully remove, and the frustration of knowing the source but not the mechanism.

**The attack is more sophisticated than anything I've dealt with before.** It's not just malware—it's a self-replicating worm designed to survive administrator intervention.

Here's what I know for certain:

1. **Supply chain attacks are terrifying**: One compromised npm package brought down my entire operation
2. **Persistence is sophisticated**: Multiple layers, self-healing, location-shifting binaries
3. **Traditional cleanup doesn't work**: Removing obvious files and services isn't enough
4. **The infection may be deeper than you think**: User services, timers, modified binaries, code injection

**If you're reading this and you've successfully removed the malware, PLEASE reach out using contact.** Tell me what I'm missing. Tell me where the reinfection source is hiding.

To everyone else: **Don't let this happen to you.**

Pin your npm dependencies. Audit your packages. Monitor your servers.
I'll update this post when (if?) I figure out how to finally kill this thing (probably never but may switch to docker for further deployments).

---

**Update Log:**
- **December 8, 2025**: Initial post. Still infected. Miner returns after every reboot.
- *(I'll update as I learn more)*

*— A Developer Still Fighting*
