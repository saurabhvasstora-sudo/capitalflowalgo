/* =====================================================================
   CAPITAL FLOW ALGO — SITE CONFIGURATION
   ---------------------------------------------------------------------
   Edit the values below once; every page reads from this file.
   Items marked TODO are placeholders — replace them before going live.
   ===================================================================== */
window.CFA_CONFIG = {

  /* --- Company identity ------------------------------------------- */
  brandName:   "Capital Flow Algo",
  legalName:   "Capital Flow Algo",                 // trading name used across the site and legal pages
  tagline:     "Institutional-grade trading algorithms, running in your own account.",
  domain:      "https://www.capitalflowalgo.com",

  /* --- Location --------------------------------------------------- */
  addressLine1: "Dubai Silicon Oasis",              // TODO: add office / building number, e.g. "Office 412, Building A2"
  addressLine2: "Dubai, United Arab Emirates",
  mapsQuery:    "Dubai Silicon Oasis, Dubai",       // used for the "Get directions" link
  officeHours:  "Monday – Friday, 9:00 – 18:00 (GST, UTC+4)",

  /* --- Contact ---------------------------------------------------- */
  email:        "capitalflowalgo@gmail.com",        // primary — enquiries and form submissions go here
  emailAlt:     "ajjayy@capitalflowalgo.com",       // domain email (activate in GoDaddy → Email → Activate), shown as a second contact
  whatsapp:     "919762995635",                     // digits only, country code first, no + or spaces
  phoneDisplay: "+91 97629 95635",                  // how the number appears on screen
  whatsappGreeting: "Hi Capital Flow Algo, I'd like to know more about your trading algorithms.",

  /* --- Social ----------------------------------------------------- */
  instagram:    "capitalflowalgo",                  // TODO: handle without @
  telegram:     "",                                 // optional: handle without @
  linkedin:     "",                                 // optional: full URL
  youtube:      "",                                 // optional: full URL
  x:            "",                                 // optional: handle without @

  /* --- Broker wording ---------------------------------------------
     Brokers are deliberately not named on the site. This phrase is used
     inside sentences ("...your own account with a regulated MT5 broker"). */
  broker: { name: "a regulated MT5 broker", regulator: "regulated", url: "" },

  /* --- Account-opening links (our introducing-broker links) ----------
     Shown on open-account.html after the visitor submits their details.
     Order matters: the first one is highlighted as "recommended". */
  accountLinks: [
    {
      label:    "Open Account — Platform A",
      subtitle: "Recommended for the Gold Arbitrage strategy",
      url:      "https://app.qbexmarket.com/signup?ibcode=901000007733"
    },
    {
      label:    "Open Account — Platform B",
      subtitle: "Recommended for the Forex Multi-Pair strategy",
      url:      "https://trade.newera365.com/client/register/6a77504214ab5"
    }
  ],

  platform: "MetaTrader 5 (MT5)",
  logoMark: "assets/img/logo-mark.png",             // icon only (used in the header next to the wordmark)
  logoFull: "assets/img/logo.png",                  // full logo with wordmark (footer, about page)

  /* --- Minimum investment ---------------------------------------- */
  minimum: {
    arbitrage: "$3,000",
    forex:     "$1,000",
    entry:     "$1,000"                             // lowest entry point across the system
  },

  /* --- Return tiers ------------------------------------------------
     Monthly return range by account size. Higher capital = higher tier.
     Edit the numbers or add tiers; the calculator, strategy cards and
     the home page all read from here.                                */
  returnTiers: [
    { min: 1000,  max: 9999, low: 3, high: 5, name: "Core",    note: "Entry tier" },
    { min: 10000, max: null, low: 5, high: 8, name: "Premium", note: "Higher allocation & priority execution" }
  ],
  returnRangeLabel: "3 – 8%",                       // overall range shown in headlines
  tierThresholdLabel: "$10,000",                    // where the higher tier begins

  /* --- Broker partnerships ------------------------------------------
     Facts you can evidence today. When a broker sends an official signed
     confirmation letter, save it to assets/docs/ and put the filename in
     `letter` — a "View confirmation letter" button then appears.        */
  partners: [
    {
      name:     "QBEX Market",
      role:     "Introducing partner",
      detail:   "Registered introducing partner, IB code 901000007733. Clients we refer open their account directly with QBEX Market, in their own name.",
      url:      "https://www.qbexmarket.com/",
      letter:   ""
    },
    {
      name:     "Newera Capital",
      role:     "Introducing partner",
      detail:   "Registered introducing partner. Clients we refer open their account directly with Newera Capital, in their own name, through our partner registration link.",
      url:      "https://www.newera365.com/",
      letter:   ""
    }
  ],

  /* --- Innovation lab / upcoming systems --------------------------
     Shown in the "What we're building next" section. Set `locked: true`
     to show a project as classified (name and description blurred out).
     Replace these with your real projects whenever you want.          */
  lab: {
    projects: [
      {
        codename: "Project Meridian",
        origin:   "Institutional desk model",
        category: "Multi-commodity basis capture",
        stage:    "Live testing",
        progress: 70,
        locked:   false,
        desc:     "The basis engine behind our gold strategy, widened to run silver, oil and selected metals at the same time — rotating capital to whichever spread is widest that hour. Commodity desks have run versions of this for decades. Almost no private investor has ever had access to one."
      },
      {
        codename: "Project Tidal",
        origin:   "Smart-money flow",
        category: "Cross-venue funding capture",
        stage:    "In development",
        progress: 45,
        locked:   false,
        desc:     "Harvests the funding payments that leveraged traders pay each other across multiple exchanges simultaneously. Market-neutral, and uncorrelated to everything else on the platform — when one engine is flat, this one is still working."
      },
      {
        codename: "Project Sentinel",
        origin:   "Risk-desk architecture",
        category: "Adaptive protection layer",
        stage:    "Research",
        progress: 30,
        locked:   false,
        desc:     "Not a strategy — a layer that sits above every strategy we run, reading market regime in real time and cutting exposure before volatility arrives instead of after it. This is the part of a hedge fund nobody markets, and the part that keeps them alive."
      },
      {
        codename: "Classified",
        origin:   "Undisclosed",
        category: "Undisclosed",
        stage:    "Proving on our own capital",
        progress: 15,
        locked:   true,
        desc:     "We are not describing this one yet. It is running on our own money, and if it holds up it changes what this platform can offer. Clients on the early-access list are briefed before any public announcement."
      }
    ]
  },

  /* --- Google Analytics 4 ------------------------------------------
     1. Go to analytics.google.com -> Admin -> Create property
     2. Platform: Web. Enter https://capitalflowalgo.com
     3. Copy the Measurement ID (looks like G-XXXXXXXXXX) and paste below.
     Leave empty and no tracking script loads at all.                  */
  ga4Id: "",

  /* --- Contact form (Web3Forms — free, no backend) ---------------
     1. Go to https://web3forms.com, enter the email above, get an Access Key.
     2. Paste the key here. Submissions arrive in that inbox.
     Leave empty and the form falls back to opening WhatsApp with the message. */
  web3formsKey: "",

  /* --- Verified track record (optional) --------------------------
     Fill these to show a "Verify it yourself" block on the Performance page.
     Only ever use an INVESTOR (read-only) password here — never the master password. */
  /* --- Live accounts shown in the "verify before you trust" block ----
     Only the two accounts already published are listed here. The extra
     accounts you sent are held in PRIVATE-accounts.md (not committed to
     the public repository) until you decide how you want them handled —
     see that file for the options.                                    */
  mt5Accounts: [
    {
      key:      "arbitrage",
      strategy: "Gold Spot–Futures Arbitrage",
      server:   "Newera Capital Market",
      login:    "510774",
      investorPassword: "View@2026",
      note:     "Live · starting equity USD 10,000",
      enabled:  true
    },
    {
      key:      "forex",
      strategy: "Forex Multi-Pair Algo",
      server:   "Qbex",
      login:    "900909625750",
      investorPassword: "Apple@123",
      note:     "Live account",
      enabled:  true
    }
  ],
  myfxbookUrl: "",                                  // optional verified-account link
  fxblueUrl:   "",                                  // optional verified-account link

  /* --- Misc -------------------------------------------------------- */
  foundedYear: "",                                  // leave empty to hide the "Founded" row on the About page
  calendlyUrl: ""                                   // optional: booking link for "Book a call"; falls back to WhatsApp
};
