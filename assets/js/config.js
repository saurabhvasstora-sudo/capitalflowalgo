/* =====================================================================
   CAPITAL FLOW ALGO — SITE CONFIGURATION
   ---------------------------------------------------------------------
   Edit the values below once; every page reads from this file.
   Items marked TODO are placeholders — replace them before going live.
   ===================================================================== */
window.CFA_CONFIG = {

  /* --- Company identity ------------------------------------------- */
  brandName:   "Capital Flow Algo",
  legalName:   "Capital Flow Algo",                 // TODO: exact name on trade licence, e.g. "Capital Flow Algo FZE"
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

  /* --- Innovation lab / upcoming systems --------------------------
     Shown in the "What we're building next" section. Set `locked: true`
     to show a project as classified (name and description blurred out).
     Replace these with your real projects whenever you want.          */
  lab: {
    headline: "The systems we haven't shown anyone yet.",
    intro: "Everything we run today started as a project in this list. What sits here now is the next generation — models we are building, testing and stress-running on our own capital before a single client sees them. Some will reach the platform this year. Some will never leave the lab. That is exactly how it should be.",
    projects: [
      {
        codename: "Project Meridian",
        category: "Multi-commodity arbitrage",
        stage:    "Live testing",
        progress: 70,
        locked:   false,
        desc:     "Extends our gold basis engine across silver, oil and selected metals simultaneously, rotating capital to wherever the spread is widest that hour."
      },
      {
        codename: "Project Tidal",
        category: "Market-neutral yield",
        stage:    "In development",
        progress: 45,
        locked:   false,
        desc:     "Captures perpetual-futures funding payments across multiple venues at once — a return stream that moves independently of everything else we run."
      },
      {
        codename: "Project Sentinel",
        category: "Adaptive risk layer",
        stage:    "Research",
        progress: 30,
        locked:   false,
        desc:     "Not a strategy — a layer that sits above all of them, reading market regime in real time and scaling every position down before volatility arrives rather than after."
      },
      {
        codename: "Classified",
        category: "Undisclosed",
        stage:    "Concept",
        progress: 15,
        locked:   true,
        desc:     "Details withheld while the model is proven on our own capital. Early-access clients are briefed first."
      }
    ]
  },

  /* --- Contact form (Web3Forms — free, no backend) ---------------
     1. Go to https://web3forms.com, enter the email above, get an Access Key.
     2. Paste the key here. Submissions arrive in that inbox.
     Leave empty and the form falls back to opening WhatsApp with the message. */
  web3formsKey: "",

  /* --- Verified track record (optional) --------------------------
     Fill these to show a "Verify it yourself" block on the Performance page.
     Only ever use an INVESTOR (read-only) password here — never the master password. */
  mt5Accounts: [
    {
      key:      "arbitrage",
      strategy: "Gold Spot–Futures Arbitrage",
      server:   "Newera Capital Market",         // TODO: confirm the exact MT5 server name as shown in the MT5 app
      login:    "510774",
      investorPassword: "View@2026",             // investor (read-only) password
      note:     "Live account · starting equity USD 10,000"
    },
    {
      key:      "forex",
      strategy: "Forex Multi-Pair Algo",
      server:   "Qbex",                          // TODO: confirm the exact MT5 server name as shown in the MT5 app
      login:    "900909625750",
      investorPassword: "Apple@123",             // investor (read-only) password
      note:     "Live account"
    }
    /* Add more accounts here. ONLY investor (read-only) passwords — never master/trading passwords.
       An account is shown on the Performance page only when all three of server/login/investorPassword are filled. */
  ],
  myfxbookUrl: "",                                  // optional verified-account link
  fxblueUrl:   "",                                  // optional verified-account link

  /* --- Misc -------------------------------------------------------- */
  foundedYear: 2024,                                // TODO
  calendlyUrl: ""                                   // optional: booking link for "Book a call"; falls back to WhatsApp
};
