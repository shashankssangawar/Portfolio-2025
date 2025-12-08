# How My Hostinger VPS Got Infected with an XMRig npm Attack

## 1. Executive Summary

On December 7–8, our VPS was compromised by a cryptocurrency miner (XMRig) exploiting an exposed Next.js server on port 3000. The attacker ran arbitrary commands under the `www-data` user, dropping binaries in `/tmp` and `/var/tmp`.

The incident was fully contained, all binaries were removed, and firewall rules and temporary directory protections were applied. No customer data was compromised.

---

## 2. System Exposure (Before the Attack)

```
        Internet
           |
           | :80, :443
           v
      -----------------
      |   Apache       |  <-- Reverse Proxy
      -----------------
           |
           | Forward to 3000
           v
      -----------------
      | Next.js (3000) | <-- Publicly accessible (0.0.0.0:3000)
      -----------------
           |
           | SSR / API routes
           v
      [Server-side JS execution]
```

**Problem:** Exposing Next.js directly allowed the attacker to send requests that executed arbitrary server-side JavaScript commands.

---

## 3. Attack Flow

```
[Internet Attacker]
       |
       | Exploit exposed Next.js port
       v
[Next.js SSR/API routes]
       |
       | Execute shell commands as www-data
       v
[Temporary Directories: /tmp, /var/tmp]
       |
       | Drop XMRig binaries and helper scripts
       v
[Malicious Miner Process]
       |
       | High CPU usage, mining Monero
       v
[Server Performance Degradation]
```

**Key Observation:** Miner ran entirely in temporary directories, leaving no persistence in cron, systemd, or init scripts.

---

## 4. Detection & Investigation Steps

1. **Check running processes**:

```bash
ps aux | grep -v grep | grep www-data
ps aux | grep -E "xmrig|dockerd|docker-daemon|udevd"
```

2. **Locate executables**:

```bash
find /tmp /var/tmp /dev/shm /run -type f -executable 2>/dev/null
find /var/www -type f -mtime -3 -printf "%TY-%Tm-%Td %TT %u %p\n"
```

3. **Check cron and systemd for persistence**:

```bash
crontab -u www-data -l
ls -al /etc/cron*
ls -al /etc/systemd/system/
systemctl list-unit-files --type=service | grep -E "udev|docker|daemon|miner|xmrig"
```

**Result:** No persistence found. Attack limited to temporary files.

---

## 5. Malicious Artifacts

| File / Directory                  | Description                      |
| --------------------------------- | -------------------------------- |
| `/tmp/runnv/runnv`                | Main miner binary                |
| `/var/tmp/docker-daemon`          | Miner disguised as Docker daemon |
| `/var/tmp/dockerd`                | Helper script                    |
| `/var/tmp/.X11-unix/xmrig-6.24.0` | Miner executable folder          |

---

## 6. Containment Actions

### 6.1 Kill Malicious Processes

```bash
pkill -f xmrig
pkill -f dockerd
pkill -f docker-daemon
pkill -f udevd  # check carefully
```

### 6.2 Remove Malicious Binaries

```bash
rm -rf /var/tmp/docker-daemon
rm -rf /var/tmp/dockerd
rm -rf /var/tmp/.X11-unix/xmrig-6.24.0
sudo rm -rf /tmp/runnv/
```

### 6.3 Lock Down Temporary Directories

```
Before: /tmp and /var/tmp are executable
After:  /tmp and /var/tmp mounted with noexec
```

```bash
mount -o remount,noexec /tmp
mount -o remount,noexec /var/tmp
mount --bind /tmp /var/tmp
mount -o remount,bind,noexec /var/tmp
mount | grep tmp
```

### Diagram – Temporary Directory Lockdown

```
       Before
   /tmp   ---> executable
   /var/tmp ---> executable

       After
   /tmp   ---> noexec
   /var/tmp ---> noexec
```

---

## 7. Firewall Remediation

```bash
sudo apt install ufw
ufw deny 3000/tcp
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status verbose
```

**Diagram – Network Before and After**

```
Before:
Internet --> Next.js 0.0.0.0:3000 (Exposed)
         --> Apache :80/:443 (Exposed)

After:
Internet --> Apache :80/:443 (Exposed)
Internet -X-> Next.js 127.0.0.1:3000 (Blocked)
```

---

## 8. Secured System Architecture

```
        Internet
           |
           | :80, :443
           v
      -----------------
      |   Apache       |  <-- Reverse Proxy
      -----------------
           |
           | Forward to 127.0.0.1:3000
           v
      -----------------
      | Next.js (3000) |  <-- Localhost only
      -----------------
           |
      [Server-side JS execution] safe from direct internet exposure

PocketBase (8090) ---> bound to 127.0.0.1 (internal only)
```

---

## 9. Lessons Learned

1. Never expose Node.js or Next.js servers directly to the internet.
2. Avoid running `npm install` or `npm run build` on production servers.
3. Temporary directories must be mounted `noexec`.
4. Always monitor open ports.
5. Use firewalls to restrict access to necessary ports only.
6. Web apps must run with restricted privileges behind a reverse proxy.

---

## 10. Preventative Measures

* All services now restricted to localhost except Apache.
* `/tmp` and `/var/tmp` mounted with `noexec`.
* Deploy build artifacts from CI/CD pipelines.
* Firewall rules: only HTTP, HTTPS, and SSH exposed.
* Added routine vulnerability scanning.
* Documentation updated to include port exposure guidelines.

---

## 11. Conclusion

The attack exploited misconfigured port exposure, deploying an XMRig miner under the web user. No persistence mechanisms were found. Malicious binaries were removed, temporary directories were secured, and firewall rules were applied.

System performance has returned to normal, and structural improvements prevent recurrence.
