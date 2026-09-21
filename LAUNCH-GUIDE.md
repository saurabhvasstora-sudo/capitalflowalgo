# Capital Flow Algo — Launch & Editing Guide

## Part A — Put the site live on capitalflowalgo.com (one time)

### 1. GitHub account (3 min)
- Go to https://github.com → **Sign up** (free) → verify email. Or log in if you have one.

### 2. Repository + hosting
Either ask Claude ("create the GitHub repo and turn on Pages") or do it yourself:
1. GitHub → **New repository** → name `capitalflowalgo` → Public → Create.
2. Push the site (Claude does this with `git push`), or upload the folder contents via *Add file → Upload files*.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch `main` / `/ (root)` → Save.
4. Same page → **Custom domain**: `capitalflowalgo.com` → Save. (The repo already contains a `CNAME` file with this.)

### 3. Point the domain at it (GoDaddy)
GoDaddy → My Products → capitalflowalgo.com → **DNS**. Edit/add these (do NOT touch MX or TXT records — those are email):

| Type  | Name | Value                           | TTL |
|-------|------|---------------------------------|-----|
| A     | @    | 185.199.108.153                 | 600 |
| A     | @    | 185.199.109.153                 | 600 |
| A     | @    | 185.199.110.153                 | 600 |
| A     | @    | 185.199.111.153                 | 600 |
| CNAME | www  | `YOUR-GITHUB-USERNAME.github.io`| 600 |

Delete any other A/CNAME for `@` or `www` that points to GoDaddy's website builder ("Parked", `*.godaddysites.com`).

### 4. HTTPS
GitHub → Settings → Pages → once the DNS check is green (10–60 min, up to 24 h) → tick **Enforce HTTPS**.
Test: open https://capitalflowalgo.com on your phone.

## Part B — Get it on Google

### 5. Google Search Console
- https://search.google.com/search-console → **Add property → Domain** → `capitalflowalgo.com`.
- Google shows a TXT record → add it in GoDaddy DNS (step 3 screen) → **Verify**.

### 6. Sitemap + indexing
- Search Console → **Sitemaps** → enter `sitemap.xml` → Submit.
- **URL inspection** → `https://capitalflowalgo.com` → **Request indexing**.
- Expect to appear for "capital flow algo" within ~1–2 weeks.

### 7. Google Business Profile (recommended)
- https://business.google.com → add *Capital Flow Algo*, Dubai Silicon Oasis address, hours, website, WhatsApp.
- Gives you the map card + reviews next to your website in Google results.

## Part C — Editing the site through Claude

1. Claude desktop app → **Code** tab → open folder **`C:\CapitalFlowAlgo`**.
2. Describe the change in plain English, for example:
   - "Change the minimum investment to $2,000"
   - "Add August 2026 returns: gold arbitrage 6.4%, forex 17.2%"
   - "Add our Instagram @capitalflowalgo and WhatsApp +971…"
   - "Add a new strategy page for the silver arbitrage algo"
   - "Make the hero headline shorter"
3. Claude edits the files and previews at http://127.0.0.1:8765. Check it.
4. Say **"publish"** → Claude commits and runs `git push` → GitHub Pages rebuilds the live site in ~1 minute.

### Files you'll change most
- `assets/js/config.js` — contact details, minimums, MT5 investor logins, socials, Web3Forms key.
- `assets/js/performance-data.js` — monthly returns per strategy; set `illustrative: false` once real figures are in.

### Monthly routine
Send Claude the month's returns (or the MT5 *Account History* export) → Claude updates `performance-data.js` → "publish".

### Notes
- The `claude.ai/artifact/…` link is a private preview, not the live site.
- Contact form: get a free key at https://web3forms.com and paste it into `web3formsKey` in `config.js` so enquiries email you. Until then the form opens WhatsApp.
- Activate `ajjayy@capitalflowalgo.com` in GoDaddy (Email → Activate) or change `email` in `config.js`.
