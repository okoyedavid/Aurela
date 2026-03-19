"use client";

import { Crown, Menu, Search } from "lucide-react";

export default function DashboardHeader({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white">
              Hello David
            </h1>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black">
              <Crown className="h-3.5 w-3.5" />
              Premium
            </div>
          </div>
          <p className="mt-2 text-sm text-white/50">October 26</p>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 p-3 text-white lg:hidden"
          onClick={onOpenSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      <label className="relative block w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
        <input
          type="search"
          placeholder="Search"
          className="h-12 w-full rounded-2xl border border-white/10 bg-[#131313] pl-11 pr-4 text-sm text-white placeholder:text-white/35 focus:border-white/25 focus:outline-none"
        />
      </label>
    </div>
  );
}
