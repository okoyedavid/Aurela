"use client";

import { adminSellers } from "../_components/admin-data";
import {
  ChevronRight,
  Search,
  ShieldCheck,
  Store,
  UserCheck,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminSellersPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("all");
  const [risk, setRisk] = useState("all");
  const filtered = useMemo(
    () =>
      adminSellers.filter(
        (seller) =>
          (!query ||
            `${seller.id} ${seller.name} ${seller.email} ${seller.shopNames.join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (state === "all" || seller.state === state) &&
          (risk === "all" || seller.risk === risk),
      ),
    [query, state, risk],
  );
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Marketplace trust
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Sellers</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Review applications, identity status, shop performance, fulfilment
          quality and enforcement history.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-card p-5">
          <UserCheck className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Active sellers</p>
          <strong className="mt-1 block text-3xl">386</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <UserPlus className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Applications</p>
          <strong className="mt-1 block text-3xl">12</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <ShieldCheck className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Under review</p>
          <strong className="mt-1 block text-3xl">7</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <Store className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Active shops</p>
          <strong className="mt-1 block text-3xl">512</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_190px_160px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Seller, email, ID or shop"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All account states</option>
          <option>Active</option>
          <option>Application</option>
          <option>Suspended</option>
        </select>
        <select
          value={risk}
          onChange={(event) => setRisk(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All risk</option>
          <option>Low</option>
          <option>Review</option>
          <option>High</option>
        </select>
      </div>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-[.14em] text-muted-foreground">
              <tr>
                {[
                  "Seller",
                  "State",
                  "Verification",
                  "Shops",
                  "Orders",
                  "GMV",
                  "Fulfilment",
                  "Disputes",
                  "Risk",
                  "",
                ].map((heading, index) => (
                  <th key={`${heading}-${index}`} className="px-4 py-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((seller) => (
                <tr key={seller.id} className="hover:bg-muted/40">
                  <td className="px-4 py-5">
                    <p className="font-semibold">{seller.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {seller.id} · {seller.email}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      {seller.state}
                    </span>
                  </td>
                  <td className="px-4 py-5">{seller.verification}</td>
                  <td className="px-4 py-5">{seller.shops}</td>
                  <td className="px-4 py-5">{seller.orders}</td>
                  <td className="px-4 py-5 font-semibold">
                    ${seller.gmv.toLocaleString()}
                  </td>
                  <td className="px-4 py-5">
                    {seller.fulfilment ? `${seller.fulfilment}%` : "—"}
                  </td>
                  <td className="px-4 py-5">{seller.disputes}</td>
                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${seller.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
                    >
                      {seller.risk}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <Link
                      href={`/admin/sellers/${seller.id}`}
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
            No sellers match the active filters.
          </div>
        )}
      </div>
    </section>
  );
}
