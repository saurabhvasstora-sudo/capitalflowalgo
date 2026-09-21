/* =====================================================================
   CAPITAL FLOW ALGO — TRACK RECORD DATA
   ---------------------------------------------------------------------
   Monthly net returns (%) per strategy. Edit the arrays, keep the order.
   `illustrative: true` shows a visible "illustrative data" banner on the
   site. Set it to false ONLY after replacing these numbers with your real,
   verifiable figures.
   ===================================================================== */
window.CFA_PERFORMANCE = {
  illustrative: true,           // TODO: set to false once real figures are entered
  asOf: "August 2026",          // TODO: last month included

  months: [
    "Jan 2025","Feb 2025","Mar 2025","Apr 2025","May 2025","Jun 2025",
    "Jul 2025","Aug 2025","Sep 2025","Oct 2025","Nov 2025","Dec 2025",
    "Jan 2026","Feb 2026","Mar 2026","Apr 2026","May 2026","Jun 2026",
    "Jul 2026","Aug 2026"
  ],

  strategies: {
    arbitrage: {
      name:  "Gold Spot–Futures Arbitrage",
      short: "Arbitrage",
      targetRange: "5 – 8% / month",
      color: "#D9B24A",
      returns: [6.2, 5.8, 7.1, 6.5, 5.4, 6.9, 7.6, 6.1, 5.7, 6.8, 7.3, 5.9, 6.4, 7.0, 5.6, 6.7, 7.8, 6.3, 5.5, 6.6]
    },
    forex: {
      name:  "Forex Multi-Pair Algo",
      short: "Forex",
      targetRange: "15 – 20% / month",
      color: "#34C77B",
      returns: [16.4, 18.1, 15.2, 19.3, 17.6, 15.9, 18.8, 16.1, 17.4, 19.6, 15.5, 18.2, 16.9, 17.8, 15.3, 19.1, 16.6, 18.4, 17.1, 15.8]
    }
  }
};
