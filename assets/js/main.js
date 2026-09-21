/* =====================================================================
   CAPITAL FLOW ALGO — SITE SCRIPT
   Builds the shared header/footer, binds config values, and powers the
   interactive parts (nav, reveal, contact form, calculator, performance).
   ===================================================================== */
(function () {
  "use strict";
  const C = window.CFA_CONFIG || {};
  const P = window.CFA_PERFORMANCE || null;

  /* ---------- helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const waLink = (msg) => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg || C.whatsappGreeting || "")}`;
  const callLink = () => C.calendlyUrl || waLink("Hi Capital Flow Algo, I'd like to book a consultation call.");
  const fmtMoney = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const fmtPct = (n, d = 1) => (n >= 0 ? "+" : "") + n.toFixed(d) + "%";

  const LOGO = `<svg viewBox="0 0 124 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="cfaG" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#B8902E"/><stop offset=".5" stop-color="#D9B24A"/><stop offset="1" stop-color="#F2D57C"/></linearGradient><linearGradient id="cfaGr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#166A45"/><stop offset="1" stop-color="#2E9E68"/></linearGradient></defs><rect x="38" y="54" width="12" height="22" rx="2" fill="url(#cfaGr)"/><rect x="55" y="42" width="12" height="34" rx="2" fill="url(#cfaGr)"/><rect x="72" y="30" width="12" height="46" rx="2" fill="url(#cfaGr)"/><path d="M14 66c4 20 34 30 58 22 12-4 22-12 30-24" fill="none" stroke="url(#cfaG)" stroke-width="7" stroke-linecap="round"/><path d="M22 52c-4 16 16 30 42 26 14-2 26-10 35-24" fill="none" stroke="#1E7A4F" stroke-width="4" stroke-linecap="round" opacity=".85"/><path d="M96 26l14-12-2 20-6-6-8 4z" fill="url(#cfaG)"/></svg>`;

  /* Brand: use the logo file from config if it exists, otherwise the inline SVG mark + wordmark. */
  const WORDMARK = `<span class="brand-text"><b><i>Capital</i>Flow</b><span>Algo</span></span>`;
  const brandMark = () => (C.logoMark ? `<img class="brand-mark" src="${esc(C.logoMark)}" alt="" width="48" height="48">` : LOGO) + WORDMARK;
  const brandFull = () => C.logoFull ? `<img class="footer-logo" src="${esc(C.logoFull)}" alt="${esc(C.brandName)}">` : `<span class="brand">${brandMark()}</span>`;

  const ICONS = {
    sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
    moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`,
    wa: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>`,
    ig: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
    tg: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.4 18.7 19.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.1-8.2c.4-.4-.1-.5-.6-.2L6.2 13.3 1.4 11.8c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.4z"/></svg>`,
    in: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 2H3.6C2.7 2 2 2.7 2 3.6v16.8c0 .9.7 1.6 1.6 1.6h16.8c.9 0 1.6-.7 1.6-1.6V3.6c0-.9-.7-1.6-1.6-1.6zM8 19H5V9h3v10zM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM19 19h-3v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6V19h-3V9h2.9v1.4c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19z"/></svg>`,
    yt: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8zM9.8 15.5v-7l6 3.5-6 3.5z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3h6.4l4.4 5.9L17.5 3zm-1.1 16.2h1.7L6.9 4.7H5.1l11.3 14.5z"/></svg>`
  };

  /* ---------- header ---------- */
  function buildHeader() {
    const host = $("#site-header");
    if (!host) return;
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = [
      ["index.html", "Home"],
      ["strategies.html", "Strategies"],
      ["performance.html", "Performance"],
      ["how-it-works.html", "How It Works"],
      ["calculator.html", "Calculator"],
      ["faq.html", "FAQ"],
      ["about.html", "About"],
      ["contact.html", "Contact"]
    ];
    const isActive = (href) => page === href || (href === "strategies.html" && page.startsWith("strategy-"));
    host.className = "site-header";
    host.innerHTML = `
      <div class="container nav">
        <a class="brand" href="index.html" aria-label="${esc(C.brandName)} home">${brandMark()}</a>
        <ul class="nav-links" id="navLinks">
          ${links.map(([h, t]) => `<li><a href="${h}" class="${isActive(h) ? "active" : ""}">${t}</a></li>`).join("")}
          <li class="nav-mobile-cta">
            <a class="btn btn-primary" href="${callLink()}" target="_blank" rel="noopener">Book a Call</a>
            <a class="btn btn-wa" href="${waLink()}" target="_blank" rel="noopener">${ICONS.wa} WhatsApp Us</a>
          </li>
        </ul>
        <div class="nav-cta">
          <a class="btn btn-outline btn-sm" href="${waLink()}" target="_blank" rel="noopener">${ICONS.wa} WhatsApp</a>
          <a class="btn btn-primary btn-sm" href="${callLink()}" target="_blank" rel="noopener">Book a Call</a>
          <button class="theme-toggle" id="themeToggle" type="button" aria-label="Switch to light mode" title="Light / dark mode">${ICONS.sun}</button>
          <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
        </div>
      </div>`;
    const toggle = $("#navToggle"), nav = $("#navLinks");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }));
  }

  /* ---------- footer ---------- */
  function buildFooter() {
    const host = $("#site-footer");
    if (!host) return;
    const social = [];
    if (C.instagram) social.push(`<a href="https://instagram.com/${esc(C.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.ig}</a>`);
    if (C.telegram) social.push(`<a href="https://t.me/${esc(C.telegram)}" target="_blank" rel="noopener" aria-label="Telegram">${ICONS.tg}</a>`);
    if (C.linkedin) social.push(`<a href="${esc(C.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.in}</a>`);
    if (C.youtube) social.push(`<a href="${esc(C.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${ICONS.yt}</a>`);
    if (C.x) social.push(`<a href="https://x.com/${esc(C.x)}" target="_blank" rel="noopener" aria-label="X">${ICONS.x}</a>`);
    social.push(`<a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONS.wa}</a>`);

    host.className = "site-footer";
    host.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" style="display:inline-block">${brandFull()}</a>
            <p class="mt-2">${esc(C.tagline)}</p>
            <p class="mt-2 small">${esc(C.addressLine1)}<br>${esc(C.addressLine2)}</p>
            <div class="socials">${social.join("")}</div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="how-it-works.html">How It Works</a></li>
              <li><a href="performance.html">Track Record</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Strategies</h4>
            <ul>
              <li><a href="strategy-arbitrage.html">Gold Spot–Futures Arbitrage</a></li>
              <li><a href="strategy-forex.html">Forex Multi-Pair Algo</a></li>
              <li><a href="strategies.html#pipeline">Research Pipeline</a></li>
              <li><a href="calculator.html">Returns Calculator</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:${esc(C.email)}">${esc(C.email)}</a></li>
              <li><a href="tel:+${esc(C.whatsapp)}">${esc(C.phoneDisplay)}</a></li>
              <li><a href="${waLink()}" target="_blank" rel="noopener">Chat on WhatsApp</a></li>
              <li><span class="small muted">${esc(C.officeHours)}</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-risk">
          <strong style="color:var(--muted)">Risk warning:</strong> Trading foreign exchange, derivatives and digital assets carries a high level of risk and may not be suitable for all investors. Past performance, including the historical monthly figures shown on this website, is not a reliable indicator of future results and does not constitute a guarantee of any kind. Returns can be negative, and you could lose some or all of your capital. Nothing on this website constitutes investment, legal or tax advice, or an offer or solicitation in any jurisdiction where such an offer would be unlawful. Client funds are held in the client's own account with a third-party broker; ${esc(C.brandName)} does not take custody of client money. Please read our full <a href="risk-disclosure.html" style="color:var(--gold)">Risk Disclosure</a> before engaging our services.
        </div>
        <div class="footer-bottom">
          <span>© <span id="year"></span> ${esc(C.legalName)}. Registered in Dubai Silicon Oasis, Dubai, UAE. All rights reserved.</span>
          <span><a href="privacy.html">Privacy Policy</a> &nbsp;·&nbsp; <a href="terms.html">Terms of Service</a> &nbsp;·&nbsp; <a href="risk-disclosure.html">Risk Disclosure</a></span>
        </div>
      </div>`;
    $("#year").textContent = new Date().getFullYear();

    const wa = document.createElement("a");
    wa.className = "wa-float"; wa.href = waLink(); wa.target = "_blank"; wa.rel = "noopener"; wa.setAttribute("aria-label", "Chat on WhatsApp");
    wa.innerHTML = ICONS.wa;
    document.body.appendChild(wa);
  }

  /* ---------- config binding: <span data-cfg="email"></span>, <a data-href="wa"> ---------- */
  function bindConfig() {
    const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), C);
    $$("[data-cfg]").forEach((el) => { const v = get(el.dataset.cfg); if (v !== undefined && v !== "") el.textContent = v; });
    $$("[data-href]").forEach((el) => {
      const k = el.dataset.href;
      if (k === "wa") el.href = waLink(el.dataset.msg);
      else if (k === "call") el.href = callLink();
      else if (k === "mail") el.href = "mailto:" + C.email;
      else if (k === "tel") el.href = "tel:+" + C.whatsapp;
      else if (k === "maps") el.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.mapsQuery || "");
      else if (k === "broker" && C.broker && C.broker.url) el.href = C.broker.url;
      else if (k === "instagram") el.href = "https://instagram.com/" + C.instagram;
    });
    $$("[data-show]").forEach((el) => { if (!get(el.dataset.show)) el.style.display = "none"; });
  }

  /* ---------- light / dark theme ---------- */
  const THEME_KEY = "cfa-theme";
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    const b = $("#themeToggle");
    if (b) { b.innerHTML = t === "light" ? ICONS.moon : ICONS.sun; b.setAttribute("aria-label", t === "light" ? "Switch to dark mode" : "Switch to light mode"); }
    themeCharts();
  }
  function initTheme() {
    let t = "dark";
    try { t = localStorage.getItem(THEME_KEY) || t; } catch (e) {}
    applyTheme(t);
    const b = $("#themeToggle");
    if (b) b.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      applyTheme(next);
    });
  }
  const cssVar = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  function themeCharts() {
    if (!window.Chart) return;
    const text = cssVar("--muted") || "#9AA5BA", grid = cssVar("--chart-grid") || "rgba(255,255,255,.08)";
    Chart.defaults.color = text; Chart.defaults.borderColor = grid;
    Object.values(Chart.instances || {}).forEach((ch) => {
      ch.options.color = text;
      Object.values(ch.options.scales || {}).forEach((sc) => { sc.ticks = Object.assign({}, sc.ticks, { color: text }); sc.grid = Object.assign({}, sc.grid, { color: grid }); });
      if (ch.options.plugins && ch.options.plugins.legend) ch.options.plugins.legend.labels = Object.assign({}, ch.options.plugins.legend.labels, { color: text });
      ch.update("none");
    });
  }

  /* ---------- MT5 investor-access cards: <div data-mt5-accounts="arbitrage|forex|(all)"> ---------- */
  function mt5Cards() {
    const hosts = $$("[data-mt5-accounts]");
    if (!hosts.length) return;
    const all = (C.mt5Accounts || []).filter((m) => m.server && m.login && m.investorPassword);
    hosts.forEach((h) => {
      const key = h.dataset.mt5Accounts;
      const list = key ? all.filter((m) => m.key === key) : all;
      if (!list.length) { h.closest("section") && (h.closest("section").style.display = "none"); return; }
      h.innerHTML = `<div class="grid ${list.length > 1 ? "grid-2" : ""}" style="gap:14px;${list.length === 1 ? "max-width:520px" : ""}">` + list.map((m) => `
        <div class="spec mt5-card"><div class="mt5-head"><span>Strategy</span><span>${esc(m.strategy)}</span></div>
          <div><span>Platform</span><span>MetaTrader 5 (free app)</span></div>
          <div><span>Server</span><span class="mono">${esc(m.server)}</span></div>
          <div><span>Login</span><span class="mono">${esc(m.login)}</span></div>
          <div><span>Investor password</span><span class="mono">${esc(m.investorPassword)}</span></div>
          ${m.note ? `<div><span>Note</span><span>${esc(m.note)}</span></div>` : ""}
        </div>`).join("") + `</div>
        <p class="small muted mt-2">How to check: install <strong>MetaTrader 5</strong> from the App Store / Google Play → <em>Login to an existing account</em> → search the server name → enter the login and investor password. Investor access is <strong>read-only</strong> — you can see every trade, balance and equity change, but nothing can be executed or withdrawn.</p>`;
    });
  }

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- contact form ---------- */
  function contactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const msg = $("#formMsg"), btn = $("button[type=submit]", form);
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      msg.className = "form-msg";
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.consent) { msg.textContent = "Please confirm you have read the risk disclosure."; msg.className = "form-msg err"; return; }
      const summary = `New enquiry from ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nCountry: ${data.country || "-"}\nStrategy: ${data.strategy}\nCapital: ${data.capital}\nMessage: ${data.message || "-"}`;
      if (!C.web3formsKey) {
        window.open(waLink(summary), "_blank", "noopener");
        msg.textContent = "Opening WhatsApp with your enquiry — press send to reach us instantly."; msg.className = "form-msg ok";
        return;
      }
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ access_key: C.web3formsKey, subject: `New enquiry — ${data.strategy} — ${data.name}`, from_name: C.brandName + " Website", ...data, botcheck: undefined })
        });
        const out = await res.json();
        if (out.success) { form.reset(); msg.textContent = "Thank you — your enquiry has been received. We'll reply within one business day."; msg.className = "form-msg ok"; }
        else throw new Error(out.message || "Failed");
      } catch (e) {
        msg.innerHTML = `Something went wrong. Please <a href="${waLink(summary)}" target="_blank" rel="noopener" style="color:var(--gold)">send it via WhatsApp</a> instead.`; msg.className = "form-msg err";
      } finally { btn.disabled = false; btn.textContent = "Send Enquiry"; }
    });
  }

  /* ---------- chart defaults ---------- */
  function chartDefaults() {
    if (!window.Chart) return;
    Chart.defaults.color = cssVar("--muted") || "#9AA5BA";
    Chart.defaults.font.family = "Inter, system-ui, sans-serif";
    Chart.defaults.borderColor = cssVar("--chart-grid") || "rgba(255,255,255,.08)";
  }
  const gradient = (ctx, hex, a1 = 0.35) => {
    const g = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height || 300);
    g.addColorStop(0, hex + Math.round(a1 * 255).toString(16).padStart(2, "0")); g.addColorStop(1, hex + "00"); return g;
  };
  const compound = (arr) => { let v = 100; return arr.map((r) => (v = v * (1 + r / 100)) ); };
  const stats = (arr) => {
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    const cum = arr.reduce((v, r) => v * (1 + r / 100), 1) - 1;
    return { avg, cum: cum * 100, best: Math.max(...arr), worst: Math.min(...arr), pos: arr.filter((r) => r > 0).length, n: arr.length };
  };

  /* ---------- home hero mini chart ---------- */
  function heroChart() {
    const cv = $("#heroChart");
    if (!cv || !window.Chart || !P) return;
    const a = compound(P.strategies.arbitrage.returns), f = compound(P.strategies.forex.returns);
    const ctx = cv.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: { labels: P.months, datasets: [
        { data: f, borderColor: P.strategies.forex.color, backgroundColor: gradient(ctx, P.strategies.forex.color, 0.25), fill: true, tension: .4, borderWidth: 2, pointRadius: 0 },
        { data: a, borderColor: P.strategies.arbitrage.color, backgroundColor: gradient(ctx, P.strategies.arbitrage.color, 0.25), fill: true, tension: .4, borderWidth: 2, pointRadius: 0 }
      ] },
      options: { responsive: true, maintainAspectRatio: false, animation: { duration: 1800 }, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false, type: "logarithmic" } } }
    });
    const s = stats(P.strategies.forex.returns), sa = stats(P.strategies.arbitrage.returns);
    const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
    set("#heroFx", fmtPct(s.avg)); set("#heroArb", fmtPct(sa.avg)); set("#heroMonths", s.n + " months"); set("#heroAsOf", P.asOf);
    if (P.illustrative) { const b = $("#heroIllustrative"); if (b) b.style.display = ""; }
  }

  /* ---------- performance page ---------- */
  function performancePage() {
    const table = $("#perfTable");
    if (!table || !P) return;
    const A = P.strategies.arbitrage, F = P.strategies.forex;
    const sa = stats(A.returns), sf = stats(F.returns);
    const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
    set("#asOf", P.asOf);
    if (P.illustrative) { const b = $("#illustrativeBanner"); if (b) b.style.display = ""; }

    set("#arbAvg", fmtPct(sa.avg)); set("#arbCum", fmtPct(sa.cum, 0)); set("#arbBest", fmtPct(sa.best)); set("#arbWorst", fmtPct(sa.worst)); set("#arbPos", `${sa.pos} / ${sa.n}`);
    set("#fxAvg", fmtPct(sf.avg)); set("#fxCum", fmtPct(sf.cum, 0)); set("#fxBest", fmtPct(sf.best)); set("#fxWorst", fmtPct(sf.worst)); set("#fxPos", `${sf.pos} / ${sf.n}`);

    const cls = (v) => (v >= 0 ? "num pos" : "num neg");
    const eqA = compound(A.returns), eqF = compound(F.returns);
    $("tbody", table).innerHTML = P.months.map((m, i) => `
      <tr><td>${esc(m)}</td>
        <td class="${cls(A.returns[i])}">${fmtPct(A.returns[i])}</td><td class="num">${(eqA[i] / 100 * 10000).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</td>
        <td class="${cls(F.returns[i])}">${fmtPct(F.returns[i])}</td><td class="num">${(eqF[i] / 100 * 10000).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</td>
      </tr>`).join("");
    $("tfoot", table).innerHTML = `<tr><td>Cumulative (${sa.n} months, compounded)</td><td class="${cls(sa.cum)}">${fmtPct(sa.cum, 0)}</td><td class="num">${fmtMoney(eqA[eqA.length - 1] * 100)}</td><td class="${cls(sf.cum)}">${fmtPct(sf.cum, 0)}</td><td class="num">${fmtMoney(eqF[eqF.length - 1] * 100)}</td></tr>`;

    if (!window.Chart) return;
    const cv = $("#perfChart"), ctx = cv.getContext("2d");
    let mode = "growth", chart;
    const build = () => {
      if (chart) chart.destroy();
      const growth = mode === "growth";
      chart = new Chart(ctx, {
        type: growth ? "line" : "bar",
        data: { labels: P.months, datasets: [
          { label: F.name, data: growth ? eqF : F.returns, borderColor: F.color, backgroundColor: growth ? gradient(ctx, F.color, 0.3) : F.color + "CC", fill: growth, tension: .35, borderWidth: 2, pointRadius: growth ? 2 : 0, borderRadius: 4 },
          { label: A.name, data: growth ? eqA : A.returns, borderColor: A.color, backgroundColor: growth ? gradient(ctx, A.color, 0.3) : A.color + "CC", fill: growth, tension: .35, borderWidth: 2, pointRadius: growth ? 2 : 0, borderRadius: 4 }
        ] },
        options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
          plugins: { legend: { position: "top", labels: { usePointStyle: true, boxWidth: 8 } },
            tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${growth ? "$" + (c.parsed.y * 100).toLocaleString("en-US", { maximumFractionDigits: 0 }) : fmtPct(c.parsed.y)}` } } },
          scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 10 } },
            y: { type: growth ? "logarithmic" : "linear", ticks: { callback: (v) => growth ? "$" + (v * 100).toLocaleString("en-US") : v + "%" } } }
        }
      });
    };
    build();
    $$("#chartMode button").forEach((b) => b.addEventListener("click", () => { $$("#chartMode button").forEach((x) => x.classList.remove("active")); b.classList.add("active"); mode = b.dataset.mode; build(); }));

    // verified-account block
    const v = $("#verifyBlock");
    if (v) {
      const rows = [];
      if (C.myfxbookUrl) rows.push(`<a class="btn btn-outline btn-sm" href="${esc(C.myfxbookUrl)}" target="_blank" rel="noopener">View on Myfxbook ↗</a>`);
      if (C.fxblueUrl) rows.push(`<a class="btn btn-outline btn-sm" href="${esc(C.fxblueUrl)}" target="_blank" rel="noopener">View on FX Blue ↗</a>`);
      if ((C.mt5Accounts || []).some((m) => m.server && m.login && m.investorPassword)) rows.push(`<div data-mt5-accounts></div>`);
      if (rows.length) { $("#verifyContent").innerHTML = rows.join(" "); v.style.display = ""; mt5Cards(); }
    }
  }

  /* ---------- calculator ---------- */
  function calculator() {
    const form = $("#calcForm");
    if (!form) return;
    const cap = $("#capital"), months = $("#months"), strat = $("#strategy"), comp = $("#compound"), mv = $("#monthsVal");
    const RANGES = { arbitrage: [5, 8], forex: [15, 20] };
    let chart;
    const run = () => {
      const c = Math.max(0, +cap.value || 0), n = +months.value, [lo, hi] = RANGES[strat.value], isComp = comp.checked;
      mv.textContent = n + (n === 1 ? " month" : " months");
      const series = (r) => { const out = [c]; let v = c; for (let i = 1; i <= n; i++) { v = isComp ? v * (1 + r / 100) : v + c * r / 100; out.push(v); } return out; };
      const L = series(lo), H = series(hi), M = series((lo + hi) / 2);
      const end = (s) => s[s.length - 1];
      $("#resLow").textContent = fmtMoney(end(L)); $("#resHigh").textContent = fmtMoney(end(H)); $("#resMid").textContent = fmtMoney(end(M));
      $("#resProfit").textContent = fmtMoney(end(L) - c) + " – " + fmtMoney(end(H) - c);
      $("#resMonthly").textContent = fmtMoney(c * lo / 100) + " – " + fmtMoney(c * hi / 100);
      $("#resRange").textContent = `${lo}–${hi}% per month, ${isComp ? "profits reinvested" : "profits withdrawn monthly"}`;
      if (!window.Chart) return;
      const ctx = $("#calcChart").getContext("2d");
      const labels = Array.from({ length: n + 1 }, (_, i) => i === 0 ? "Start" : "M" + i);
      if (chart) { chart.data.labels = labels; chart.data.datasets[0].data = H; chart.data.datasets[1].data = L; chart.update(); return; }
      chart = new Chart(ctx, { type: "line", data: { labels, datasets: [
        { label: "Upper (" + hi + "%)", data: H, borderColor: "#F2D57C", backgroundColor: gradient(ctx, "#D9B24A", 0.3), fill: "+1", tension: .3, borderWidth: 2, pointRadius: 0 },
        { label: "Lower (" + lo + "%)", data: L, borderColor: "#D9B24A", backgroundColor: "transparent", tension: .3, borderWidth: 2, pointRadius: 0, borderDash: [5, 4] }
      ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { mode: "index", intersect: false },
        plugins: { legend: { labels: { usePointStyle: true, boxWidth: 8 } }, tooltip: { callbacks: { label: (x) => ` ${x.dataset.label}: ${fmtMoney(x.parsed.y)}` } } },
        scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 12 } }, y: { ticks: { callback: (v) => "$" + (+v).toLocaleString("en-US") } } } } });
    };
    form.addEventListener("input", run); run();
    $$("[data-preset]").forEach((b) => b.addEventListener("click", () => { cap.value = b.dataset.preset; run(); }));
  }

  /* ---------- strategy page mini stats ---------- */
  function strategyStats() {
    const key = document.body.dataset.strategy;
    if (!key || !P || !P.strategies[key]) return;
    const S = P.strategies[key], s = stats(S.returns);
    const set = (id, v) => { const e = $(id); if (e) e.textContent = v; };
    set("#sAvg", fmtPct(s.avg)); set("#sBest", fmtPct(s.best)); set("#sWorst", fmtPct(s.worst)); set("#sPos", `${s.pos} / ${s.n}`); set("#sCum", fmtPct(s.cum, 0)); set("#sAsOf", P.asOf);
    if (P.illustrative) { const b = $("#illustrativeBanner"); if (b) b.style.display = ""; }
    const cv = $("#stratChart");
    if (!cv || !window.Chart) return;
    const ctx = cv.getContext("2d");
    new Chart(ctx, { type: "bar", data: { labels: P.months, datasets: [{ label: "Monthly return", data: S.returns, backgroundColor: S.color + "CC", borderRadius: 5 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => " " + fmtPct(c.parsed.y) } } },
        scales: { x: { grid: { display: false }, ticks: { maxTicksLimit: 10 } }, y: { ticks: { callback: (v) => v + "%" } } } } });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHeader(); buildFooter(); bindConfig(); initTheme(); reveal(); contactForm(); chartDefaults(); heroChart(); performancePage(); calculator(); strategyStats(); mt5Cards(); themeCharts();
  });
})();
