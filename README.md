# Capital Flow Algo — Website

Static, dependency-free marketing website for **Capital Flow Algo** (Dubai Silicon Oasis).
No build step, no framework, no server-side code — upload the folder anywhere and it works.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, live stats, strategies, how it works, why us, pipeline, FAQ preview, CTA |
| `strategies.html` | Strategy overview, side-by-side comparison, research pipeline |
| `strategy-arbitrage.html` | Spot–Futures Arbitrage deep-dive (chart, how it works, risks) |
| `strategy-forex.html` | Forex Multi-Pair Algo deep-dive (chart, how it works, risks) |
| `performance.html` | Month-by-month track record, growth chart, "verify it yourself" block |
| `how-it-works.html` | 7-step onboarding process, permissions model, checklist, timeline |
| `calculator.html` | Interactive returns calculator (compounding toggle, chart) |
| `faq.html` | Grouped FAQ (safety of funds, returns & risk, strategies, onboarding, tracking, company) |
| `about.html` | Company story, principles, office + map |
| `contact.html` | Contact cards, enquiry form, map |
| `risk-disclosure.html` / `privacy.html` / `terms.html` | Legal pages |
| `404.html` | Not-found page |

## The only two files you need to edit

### 1. `assets/js/config.js` — contact details, broker, minimums, socials
Every phone number, email, address, Instagram handle, broker name and minimum-investment
figure on the site is read from this file. Search for `TODO` and replace each placeholder.

Key items:
- `whatsapp` — digits only with country code (e.g. `971501234567`). Powers the floating
  WhatsApp button, the "Chat on WhatsApp" links, and the contact-form fallback.
- `email` — where enquiries go.
- `web3formsKey` — free key from <https://web3forms.com> (enter your email there, copy the key).
  Until this is set, the contact form opens WhatsApp with the enquiry pre-filled instead.
- `broker.name` — the phrase used in sentences site-wide (default "a regulated MT5 broker"; brokers are intentionally not named).
- `minimum.arbitrage` / `minimum.forex` — minimum investment per strategy.
- `mt5Accounts[]` — the two live accounts are pre-filled with server + login; **paste the investor
  (read-only) password into each `investorPassword: ""`** and the "Verify it yourself" block appears on
  the Performance page. Never put a master/trading password here.
- `calendlyUrl` — optional booking link for "Book a Call"; falls back to WhatsApp.

### 2. `assets/js/performance-data.js` — the track record
Monthly net returns (%) for each strategy. Replace the arrays with your real numbers, update
`months` and `asOf`, then set `illustrative: false`. While `illustrative` is `true`, the site
shows a visible "Illustrative data" banner on the Performance and strategy pages (and a small
note on the home page) so nobody mistakes sample data for real results.

## Local preview

```bash
python -m http.server 8080
```
Then open <http://localhost:8080>. (Opening `index.html` directly from the file system also
works for everything except the Google Maps embed.)

## Deployment

See `DEPLOY.md` for step-by-step instructions for Netlify, Cloudflare Pages, Vercel and cPanel,
plus connecting your domain.

## Before going live — checklist

- [ ] Fill every `TODO` in `assets/js/config.js`
- [ ] Replace illustrative returns in `assets/js/performance-data.js` and set `illustrative: false`
- [ ] Get a Web3Forms key so the contact form emails you
- [ ] Paste the two investor passwords into `config.js` → `mt5Accounts` (see above)
- [ ] Activate `ajjayy@capitalflowalgo.com` in GoDaddy (Email → Activate) or change `email` in `config.js`
- [ ] Have the Risk Disclosure / Terms / Privacy reviewed by a UAE legal adviser
- [ ] Add your Instagram handle and any other socials
- [ ] Test the WhatsApp button on a phone

## Tech notes

- Logo: `assets/img/logo.png` (full, transparent) and `assets/img/logo-mark.png` (icon) — header uses the icon +
  text wordmark, footer/About use the full logo. Favicons are `favicon-32/180/512.png`; social preview is `og-image.png`.
- Light/dark mode: toggle in the top-right of the header; the choice is remembered per visitor. Default is dark.
- Fonts: Inter + Space Grotesk via Google Fonts.
- Charts: Chart.js 4 from cdnjs (loaded only on pages that need it).
- Header, footer and floating WhatsApp button are injected by `assets/js/main.js` so they exist
  in one place; page content is plain HTML for SEO.
- `data-cfg="path.to.value"` on any element binds it to `config.js`; `data-href="wa|call|mail|tel|maps|broker|instagram"`
  sets a link's `href` from config.
