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
  email:        "ajjayy@capitalflowalgo.com",       // GoDaddy professional email — activate it in the GoDaddy dashboard (Email → Activate)
  whatsapp:     "971500000000",                     // TODO: digits only, with country code, no + or spaces
  phoneDisplay: "+971 50 000 0000",                 // TODO: how the number should look on screen
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

  platform: "MetaTrader 5 (MT5)",
  logoMark: "assets/img/logo-mark.png",             // icon only (used in the header next to the wordmark)
  logoFull: "assets/img/logo.png",                  // full logo with wordmark (footer, about page)

  /* --- Minimum investment ---------------------------------------- */
  minimum: {
    arbitrage: "$1,000",
    forex:     "$1,000"
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
