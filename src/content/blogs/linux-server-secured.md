# How My Hostinger VPS Got Infected with an XMRig npm Attack

## 1. Executive Summary

On December 7–8, our Hostinger VPS was compromised by a cryptocurrency miner (XMRig) through exploitation of a **critical vulnerability in React Server Components and Next.js Server Actions** tracked as **CVE-2025-55182** (and associated downstream Next.js advisory CVE-2025-66478). This flaw enabled **unauthenticated remote code execution** when processing specially crafted requests, bypassing expected authorization safeguards and allowing command execution under the `www-data` user. ([Next.js][1])

The attacker deployed mining binaries into temporary directories such as `/tmp` and `/var/tmp` and executed them without establishing persistence. The incident was fully contained, all malicious artifacts were removed, and system-level hardening was applied. No customer or application data was compromised.

---

## 2. System Architecture and Exposure

```
        Internet
           |
           | :80, :443
           v
      -----------------
      |   Apache       |  <-- Reverse Proxy
      -----------------
           |
           | Forward to Next.js
           v
      -----------------
      | Next.js (3000) |
      -----------------
           |
           | React Server Actions
           v
      [Server-side JavaScript execution]
```

The production stack consisted of an Apache reverse proxy forwarding HTTP/S to a Next.js application on port 3000. The application utilized **React Server Components and Server Actions** for server-side logic.

A vulnerability in how the framework processed certain server-side requests allowed attackers to trigger **remote code execution (RCE)** without authentication, despite the reverse proxy. ([Next.js][1])

---

## 3. Attack Flow

```
[Internet Attacker]
       |
       | Exploit CVE-2025-55182 (RCE in React/Next.js Server Actions)
       v
[Next.js Server Actions Runtime]
       |
       | Arbitrary command execution as www-data
       v
[Temporary Directories: /tmp, /var/tmp]
       |
       | Drop XMRig binaries and helper scripts
       v
[Malicious Miner Process]
       |
       | High CPU usage and resource exhaustion
       v
[Server Performance Degradation]
```

The exploit did not require valid credentials, exposing a direct execution pathway via server actions. Minimal reconnaissance or privilege escalation was needed beyond sending the crafted HTTP payload.

---

## 4. Detection and Investigation

### 4.1 Process Inspection

Suspicious processes were located by filtering running processes owned by the web service user.

```bash
ps aux | grep -v grep | grep www-data
ps aux | grep -E "xmrig|dockerd|docker-daemon|udevd"
```

### 4.2 File System Analysis

Temporary directories and recently modified files were scanned.

```bash
find /tmp /var/tmp /dev/shm /run -type f -executable 2>/dev/null
find /var/www -type f -mtime -3 -printf "%TY-%Tm-%Td %TT %u %p\n"
```

### 4.3 Persistence Mechanisms Check

Standard persistence avenues were searched for malicious entries.

```bash
crontab -u www-data -l
ls -al /etc/cron*
ls -al /etc/systemd/system/
systemctl list-unit-files --type=service | grep -E "udev|docker|daemon|miner|xmrig"
```

No persistence mechanisms such as cron jobs or systemd services were found.

---

## 5. Malicious Artifacts Identified

| Path                              | Description                       |
| --------------------------------- | --------------------------------- |
| `/tmp/runnv/runnv`                | Primary XMRig miner binary        |
| `/var/tmp/docker-daemon`          | Miner binary disguised as service |
| `/var/tmp/dockerd`                | Helper script                     |
| `/var/tmp/.X11-unix/xmrig-6.24.0` | Miner execution directory         |

All malicious files resided in writable, unrestricted temporary locations.

---

## 6. Containment and Eradication

### 6.1 Terminating Malicious Processes

```bash
pkill -f xmrig
pkill -f dockerd
pkill -f docker-daemon
pkill -f udevd
```

### 6.2 Removing Malicious Files

```bash
rm -rf /var/tmp/docker-daemon
rm -rf /var/tmp/dockerd
rm -rf /var/tmp/.X11-unix/xmrig-6.24.0
rm -rf /tmp/runnv/
```

### 6.3 Securing Temporary Directories

Execution capabilities for temporary folders were disabled to mitigate future attacks.

```bash
mount -o remount,noexec /tmp
mount -o remount,noexec /var/tmp
mount --bind /tmp /var/tmp
mount -o remount,bind,noexec /var/tmp
mount | grep tmp
```

```
Before:
  /tmp      executable
  /var/tmp  executable

After:
  /tmp      noexec
  /var/tmp  noexec
```

---

## 7. Firewall Hardening

Firewall policy was adjusted to restrict access:

```bash
apt install ufw
ufw deny 3000/tcp
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status verbose
```

```
Before:
Internet --> Apache :80/:443
Internet --> Next.js :3000

After:
Internet --> Apache :80/:443
Internet -X-> Next.js :3000
```

---

## 8. Secured Architecture

```
        Internet
           |
           | :80, :443
           v
      -----------------
      |   Apache       |
      -----------------
           |
           | Forward to 127.0.0.1:3000
           v
      -----------------
      | Next.js        |
      | (localhost)    |
      -----------------

Auxiliary services bound to 127.0.0.1
```

All services are now limited to localhost where possible and accessed only through an authenticated reverse proxy.

---

## 9. Lessons Learned

1. Framework vulnerabilities such as CVE-2025-55182 can bypass traditional perimeter protections.
2. New or experimental server-side features require vigorous security review.
3. Restrict execution rights for temporary directories with `noexec`.
4. Never bind application nodes directly to public interfaces.
5. Do not build or install dependencies directly on production hosts.
6. Continuous process monitoring and port scanning should be a baseline practice.

---

## 10. Preventative Measures Implemented

* All services restricted to localhost except for necessary public endpoints.
* `/tmp` and `/var/tmp` mounted with `noexec`.
* Deployment flows revised to use CI/CD with prebuilt artifacts.
* Firewall rules limited to essential services only.
* Routine vulnerability scanning added to development pipelines.
* Updated internal deployment guidelines and operational runbooks.

---

## 11. Conclusion

The compromise stemmed from exploitation of **CVE-2025-55182**, a critical server-side vulnerability in React Server Components and Server Actions which allowed unauthenticated remote code execution. The attacker leveraged this flaw to deploy a miner under the web service account solely through temporary file execution.

After containment and remediation, application performance returned to normal. Structural improvements and hardening practices have been applied to reduce risk of recurrence.

---

### Reference Details

* ![**CVE-2025-66478**](https://nextjs.org/blog/CVE-2025-66478): Next.js security advisory tracking downstream impact of the React vulnerability. Fixed in specific Next.js releases.
