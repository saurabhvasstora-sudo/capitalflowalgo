# Deploying the Capital Flow Algo website

> **Current setup (live since 22 Sep 2026):** the site is hosted on **GitHub Pages** from the repository
> `github.com/saurabhvasstora-sudo/capitalflowalgo` (branch `main`, root folder, `CNAME` = capitalflowalgo.com).
> DNS at GoDaddy: four A records for `@` → 185.199.108/109/110/111.153 and CNAME `www` → `saurabhvasstora-sudo.github.io`.
> **To publish changes:** commit and `git push` from `C:\CapitalFlowAlgo` — the live site updates in about a minute.
> The Netlify/Cloudflare/Vercel/cPanel sections below are alternatives only.

The site is plain static files, so any host works. The options below are ordered from
easiest to most manual. All of them give you free HTTPS.

Before deploying, complete the "Before going live" checklist in `README.md`.

---

## Your setup: domain at GoDaddy → host the site on Netlify (free)

Your domain `capitalflowalgo.com` is registered at GoDaddy, and the GoDaddy dashboard shows a
free "Website Builder" site. **That builder cannot host custom HTML files**, so we won't use it.
Instead, keep the domain at GoDaddy and host these files on Netlify for free. ~15 minutes total.

### Step 1 — Put the site on Netlify
1. Go to <https://app.netlify.com> → sign up (free, Google login works).
2. Click **Add new site → Deploy manually**, then drag the whole `CapitalFlowAlgo` folder onto the
   upload area. In ~30 seconds you get a temporary address like `https://something.netlify.app`.
   Open it and check the site works.

### Step 2 — Tell Netlify about your domain
3. In Netlify: **Site configuration → Domain management → Add a domain** → type
   `capitalflowalgo.com` → **Verify** → **Add domain**. Netlify will also add `www.capitalflowalgo.com`.
4. Netlify now shows you the DNS records it needs. Keep that tab open.

### Step 3 — Point GoDaddy at Netlify
5. In GoDaddy: **Domain (left menu) → DNS / Manage DNS** for `capitalflowalgo.com`.
6. If there is an existing **A record** with name `@` (GoDaddy's website-builder / parking IP),
   **edit** it (don't add a second one):
   - Type `A` · Name `@` · Value `75.2.60.5` · TTL 600
7. Find or add the **CNAME** for `www`:
   - Type `CNAME` · Name `www` · Value `your-site-name.netlify.app` (the exact netlify.app address from step 2)
8. Delete any other `A` or `CNAME` records for `@` or `www` that point to GoDaddy's builder
   (they usually look like `Parked` or a `*.godaddysites.com` address). **Do not touch MX or TXT
   records** — those are for your email.
9. Save. DNS usually updates within 10–60 minutes (can take up to 24 h).

### Step 4 — Turn on HTTPS
10. Back in Netlify → Domain management → **HTTPS → Verify DNS configuration → Provision
    certificate**. Once it's green, `https://capitalflowalgo.com` is live with a padlock.

### Later: updating the site
Drag and drop the folder onto Netlify again (**Deploys → drag and drop**). Takes 30 seconds.

### Your professional email
The GoDaddy dashboard shows `ajjayy@capitalflowalgo.com` ready to activate (**Email → Activate
Email**). Once active, that address is already set in `assets/js/config.js` as the site's contact
email, and it's where enquiry-form messages will go once you add the Web3Forms key (see below).
Activating GoDaddy email adds its own MX records automatically — this does not interfere with the
website records above.

---

## Other hosting options (if you don't want Netlify)

## Option A — Netlify (generic steps)

1. Go to <https://app.netlify.com> and create a free account.
2. On the Sites page, drag and drop the **entire `CapitalFlowAlgo` folder** onto the
   "Drag and drop your site output folder here" area. Netlify uploads it and gives you a
   temporary URL like `https://random-name.netlify.app`. Check that it works.
3. **Connect your domain:** Site settings → Domain management → Add a domain → enter
   `capitalflowalgo.com` (or whatever your domain is).
4. Netlify shows you DNS records. At your domain registrar (GoDaddy, Namecheap, etc.):
   - Add an **A record** for `@` pointing to Netlify's load-balancer IP shown on screen
     (currently `75.2.60.5`).
   - Add a **CNAME record** for `www` pointing to `your-site-name.netlify.app`.
   - *Or* switch the domain's nameservers to Netlify's (Netlify DNS) — simplest if you don't
     use the domain for anything else.
5. Wait for DNS to propagate (minutes to a few hours). Netlify issues an SSL certificate
   automatically. Done.

**Updating the site later:** drag and drop the folder again (Deploys → drag-and-drop), or
connect a GitHub repository for automatic deploys on every push.

The included `netlify.toml` adds security headers and routes unknown URLs to `404.html`.

---

## Option B — Cloudflare Pages (free, fastest globally)

1. Create a free account at <https://dash.cloudflare.com>.
2. Workers & Pages → Create → Pages → **Upload assets**. Name the project, then upload the
   folder contents. You get `https://project-name.pages.dev`.
3. Custom domains → Set up a custom domain → enter your domain. If your domain's DNS is
   already on Cloudflare, it's automatic; otherwise add the CNAME they show you.
4. HTTPS is automatic.

---

## Option C — Vercel (free)

1. Install Node.js, then in a terminal:
   ```bash
   npm i -g vercel
   cd C:\CapitalFlowAlgo
   vercel --prod
   ```
2. Follow the prompts (log in, accept defaults). You get a `*.vercel.app` URL.
3. Project → Settings → Domains → add your domain and set the DNS records they show.

The included `vercel.json` enables clean URLs (`/strategies` instead of `/strategies.html`)
and security headers.

---

## Option D — cPanel / traditional web hosting (Hostinger, GoDaddy, Bluehost …)

1. Log in to cPanel → **File Manager** → open `public_html`.
2. Delete any default `index.html` placeholder there.
3. Upload **all files and folders** from `CapitalFlowAlgo` into `public_html`
   (tip: zip the folder contents, upload the zip, then use "Extract" in File Manager).
4. Make sure `index.html` and the `assets/` folder sit directly in `public_html`, not in a
   sub-folder.
5. Enable free SSL: cPanel → SSL/TLS Status → Run AutoSSL (or your host's Let's Encrypt option).
6. Point your domain to the hosting (the host's nameservers or the A record from your
   hosting welcome email).

Optional `.htaccess` for `public_html` (custom 404 + force HTTPS):
```apache
ErrorDocument 404 /404.html
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Option E — GitHub Pages (free)

1. Create a GitHub repository and push the folder contents to the `main` branch.
2. Repository → Settings → Pages → Source: `main` / root. Save.
3. Add your custom domain in the same screen and create the DNS records GitHub shows
   (four A records for apex + CNAME for `www`). Tick "Enforce HTTPS" once available.

---

## Connecting the contact form (2 minutes)

1. Go to <https://web3forms.com>, enter the email address that should receive enquiries,
   and click "Create Access Key". The key is emailed to you — no account needed.
2. Open `assets/js/config.js`, paste it into `web3formsKey: ""`.
3. Re-upload `config.js` (or redeploy). Submit a test enquiry from the live site.

Free tier: 250 submissions/month, spam protection included. Until a key is set, the form
opens WhatsApp with the enquiry pre-filled, so nothing is lost either way.

---

## After launch

- Submit `https://yourdomain.com/sitemap.xml` in **Google Search Console** so the site is
  indexed quickly.
- Create a **Google Business Profile** with the Dubai Silicon Oasis address — it adds a map
  card and reviews in Google search, a strong authenticity signal.
- Put the website link in your Instagram bio and WhatsApp Business profile.
- Update `performance-data.js` after every month-end and redeploy.
