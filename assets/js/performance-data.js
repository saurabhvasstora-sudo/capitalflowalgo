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
      targetRange: "3 – 6% / month",
      color: "#D9B24A",
      returns: [4.2, 3.8, 5.1, 4.5, 3.4, 4.9, 5.6, 4.1, 3.7, 4.8, 5.3, 3.9, 4.4, 5.0, 3.6, 4.7, 5.8, 4.3, 3.5, 4.6]
    },
    forex: {
      name:  "Forex Multi-Pair Algo",
      short: "Forex",
      targetRange: "4 – 8% / month",
      color: "#34C77B",
      returns: [6.4, 7.1, 5.2, 7.3, 6.6, 5.9, 7.8, 6.1, 6.4, 7.6, 5.5, 7.2, 6.9, 6.8, 5.3, 7.1, 6.6, 7.4, 6.1, 5.8]
    }
  }
};
