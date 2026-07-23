"use client";

import { useState, useMemo } from "react";
import { Search, TrendingUp, TrendingDown, Info } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { MOCK_CRYPTO_ASSETS } from "@/data";
import { formatPrice, formatNumber, formatPercent, cn } from "@/lib/utils";

export default function MarketPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"rank" | "price" | "change24h" | "marketCap">("rank");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "change24h" ? "desc" : "asc");
    }
  };

  const sorted = useMemo(() => {
    const filtered = MOCK_CRYPTO_ASSETS.filter(
      (a) =>
        search === "" ||
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.symbol.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      return (a[sortField] - b[sortField]) * mult;
    });
  }, [search, sortField, sortDir]);

  const SortButton = ({
    field,
    children,
  }: {
    field: typeof sortField;
    children: React.ReactNode;
  }) => (
    <button
      onClick={() => handleSort(field)}
      className={cn(
        "text-xs font-medium transition-colors hover:text-brand-white",
        sortField === field ? "text-brand-white" : "text-brand-muted"
      )}
      aria-sort={sortField === field ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
    >
      {children}
      {sortField === field && (
        <span aria-hidden="true">{sortDir === "asc" ? " ↑" : " ↓"}</span>
      )}
    </button>
  );

  return (
    <PageLayout>
      <div className="pt-24 pb-20 px-4">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <div className="badge-blue mb-4 w-fit">Live Market</div>
            <h1 className="font-display text-display-md font-extrabold text-brand-white">
              Crypto <span className="gradient-text">Market Overview</span>
            </h1>
            <p className="mt-3 text-brand-muted max-w-2xl">
              Track cryptocurrency prices and market data. Live data integration
              via CoinGecko API activates at Milestone 6.
            </p>

            {/* Mock data notice */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-4 py-2 text-xs text-brand-gold">
              <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Displaying mock/placeholder data for UI demonstration. Not live prices.
            </div>
          </div>

          {/* Search */}
          <div className="mb-6 relative max-w-sm">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search coins..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-11"
              aria-label="Search cryptocurrencies"
            />
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-brand-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full" role="table" aria-label="Cryptocurrency market data">
                <thead>
                  <tr className="border-b border-brand-border bg-brand-card/60">
                    <th scope="col" className="py-4 px-4 text-left">
                      <SortButton field="rank">#</SortButton>
                    </th>
                    <th scope="col" className="py-4 px-4 text-left text-xs font-medium text-brand-muted">
                      Asset
                    </th>
                    <th scope="col" className="py-4 px-4 text-right">
                      <SortButton field="price">Price</SortButton>
                    </th>
                    <th scope="col" className="py-4 px-4 text-right">
                      <SortButton field="change24h">24h Change</SortButton>
                    </th>
                    <th scope="col" className="py-4 px-4 text-right hidden md:table-cell">
                      <SortButton field="marketCap">Market Cap</SortButton>
                    </th>
                    <th scope="col" className="py-4 px-4 text-right hidden lg:table-cell">
                      <span className="text-xs font-medium text-brand-muted">Volume 24h</span>
                    </th>
                    <th scope="col" className="py-4 px-4 text-right hidden lg:table-cell">
                      <span className="text-xs font-medium text-brand-muted">7d Chart</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((asset, index) => {
                    const isPositive = asset.change24h >= 0;
                    return (
                      <tr
                        key={asset.id}
                        className={cn(
                          "border-b border-brand-border/50 hover:bg-brand-card/40 transition-colors duration-150",
                          index % 2 === 0 ? "bg-transparent" : "bg-brand-card/20"
                        )}
                      >
                        {/* Rank */}
                        <td className="py-4 px-4 text-sm text-brand-muted">
                          {asset.rank > 0 ? asset.rank : "—"}
                        </td>

                        {/* Asset */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-card border border-brand-border text-xs font-bold text-brand-blue shrink-0"
                              aria-hidden="true"
                            >
                              {asset.symbol.slice(0, 2)}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-brand-white">
                                {asset.name}
                              </div>
                              <div className="text-xs text-brand-muted">{asset.symbol}</div>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm font-semibold text-brand-white tabular-nums">
                            {formatPrice(asset.price)}
                          </span>
                        </td>

                        {/* 24h Change */}
                        <td className="py-4 px-4 text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 text-sm font-medium tabular-nums",
                              isPositive ? "positive" : "negative"
                            )}
                          >
                            {isPositive ? (
                              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            {formatPercent(asset.change24h)}
                          </span>
                        </td>

                        {/* Market Cap */}
                        <td className="py-4 px-4 text-right hidden md:table-cell">
                          <span className="text-sm text-brand-muted tabular-nums">
                            {asset.marketCap > 0 ? formatNumber(asset.marketCap) : "—"}
                          </span>
                        </td>

                        {/* Volume */}
                        <td className="py-4 px-4 text-right hidden lg:table-cell">
                          <span className="text-sm text-brand-muted tabular-nums">
                            {formatNumber(asset.volume24h)}
                          </span>
                        </td>

                        {/* Sparkline placeholder */}
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <div
                            className="w-24 h-8 rounded bg-brand-border/30 ml-auto flex items-center justify-center"
                            aria-label="Chart — coming at Milestone 6"
                            title="Chart — coming at Milestone 6"
                          >
                            <span className="text-[10px] text-brand-muted">chart</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {sorted.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-brand-muted">No assets match &ldquo;{search}&rdquo;</p>
                <button
                  onClick={() => setSearch("")}
                  className="mt-2 text-sm text-brand-blue hover:text-brand-blue-glow"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-brand-muted text-center">
            Mock data for UI demonstration · Live CoinGecko data at Milestone 6
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
