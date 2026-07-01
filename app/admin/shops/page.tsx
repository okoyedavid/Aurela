"use client";

import { adminShops } from "../_components/admin-data";
import {
  AlertTriangle,
  ChevronRight,
  Search,
  ShieldCheck,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminShopsPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [moderation, setModeration] = useState("all");
  const filtered = useMemo(
    () =>
      adminShops.filter(
        (shop) =>
          (!query ||
            `${shop.id} ${shop.name} ${shop.owner} ${shop.sellerId} ${shop.category}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (state === "all" || shop.state === state) &&
          (moderation === "all" || shop.moderation === moderation),
      ),
    [query, state, moderation],
  );
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Marketplace moderation
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Shops</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Review ownership, catalogue state, operational performance and active
          marketplace restrictions.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5">
          <Store className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Active shops</p>
          <strong className="mt-1 block text-3xl">512</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <ShieldCheck className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Moderation review
          </p>
          <strong className="mt-1 block text-3xl">18</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="mt-6 text-sm text-muted-foreground">Restricted shops</p>
          <strong className="mt-1 block text-3xl">6</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_190px_190px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Shop, owner, seller ID or category"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All shop states</option>
          <option>Active</option>
          <option>Restricted</option>
          <option>Suspended</option>
        </select>
        <select
          value={moderation}
          onChange={(event) => setModeration(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All moderation states</option>
          <option>Clear</option>
          <option>Review</option>
          <option>Escalated</option>
        </select>
      </div>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-[.14em] text-muted-foreground">
              <tr>
                {[
                  "Shop",
                  "Owner",
                  "State",
                  "Moderation",
                  "Products",
                  "Orders",
                  "GMV",
                  "Fulfilment",
                  "Disputes",
                  "",
                ].map((heading, index) => (
                  <th key={`${heading}-${index}`} className="px-4 py-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((shop) => (
                <tr key={shop.id} className="hover:bg-muted/40">
                  <td className="px-4 py-5">
                    <p className="font-semibold">{shop.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {shop.id} · {shop.category}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p>{shop.owner}</p>
                    <p className="text-xs text-muted-foreground">
                      {shop.sellerId}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      {shop.state}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${shop.moderation === "Escalated" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
                    >
                      {shop.moderation}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    {shop.products}{" "}
                    <span className="text-xs text-muted-foreground">
                      ({shop.pendingProducts} pending)
                    </span>
                  </td>
                  <td className="px-4 py-5">{shop.orders}</td>
                  <td className="px-4 py-5 font-semibold">
                    ${shop.gmv.toLocaleString()}
                  </td>
                  <td className="px-4 py-5">{shop.fulfilment}%</td>
                  <td className="px-4 py-5">{shop.disputes}</td>
                  <td className="px-4 py-5">
                    <Link
                      href={`/admin/shops/${shop.id}`}
                      className="grid h-9 w-9 place-items-center rounded-full border border-border"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No shops match the active filters.
          </div>
        )}
      </div>
    </section>
  );
}
