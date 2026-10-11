"use client";

import { useState, useMemo } from "react";

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AuctionSimulator() {
  const [yourValue, setYourValue] = useState(50);
  const [seed, setSeed] = useState(42);
  const [auctionType, setAuctionType] = useState("second");

  const results = useMemo(() => {
    const r = mulberry32(seed);
    const rivals = [r() * 100, r() * 100, r() * 100];
    const allBids = [yourValue, ...rivals].sort((a, b) => b - a);

    const yourRank = allBids.indexOf(yourValue) + 1;
    const winningBid = allBids[0];
    const secondBid = allBids[1];

    let yourPayoff = 0;
    if (auctionType === "first") {
      yourPayoff = yourRank === 1 ? yourValue - yourValue : 0;
    } else {
      yourPayoff = yourRank === 1 ? yourValue - secondBid : 0;
    }

    return { rivals, yourRank, winningBid, secondBid, yourPayoff: yourPayoff.toFixed(2) };
  }, [yourValue, seed, auctionType]);

  return (
    <div data-widget className="w-full space-y-4 min-h-96">
      <div className="space-y-2">
        <label className="text-sm font-medium">Your value: {yourValue}</label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={yourValue}
          onChange={(e) => setYourValue(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Auction type:</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setAuctionType("first")}
            className={`px-3 py-1 text-xs rounded ${auctionType === "first" ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            First-price
          </button>
          <button
            onClick={() => setAuctionType("second")}
            className={`px-3 py-1 text-xs rounded ${auctionType === "second" ? "bg-[#FF3C3C] text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            Second-price
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="border rounded p-2">
          <div className="font-mono text-gray-600 dark:text-gray-400">Your rank</div>
          <div className="font-semibold">{results.yourRank}</div>
        </div>
        <div className="border rounded p-2">
          <div className="font-mono text-gray-600 dark:text-gray-400">Your payoff</div>
          <div className="font-semibold">{results.yourPayoff}</div>
        </div>
      </div>

      <button
        onClick={() => setSeed(seed + 1)}
        className="w-full px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:opacity-80"
      >
        New rivals
      </button>

      <div aria-live="polite" className="text-xs text-gray-600 dark:text-gray-400">
        {auctionType === "second" ? "Vickrey auction" : "First-price auction"}: you bid {yourValue},
        payoff {results.yourPayoff}
      </div>
    </div>
  );
}
