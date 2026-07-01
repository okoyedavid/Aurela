"use client";

import { adminOrders } from "../_components/admin-data";
import {
  ChevronRight,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminOrdersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [payment, setPayment] = useState("all");
  const [risk, setRisk] = useState("all");
  const filtered = useMemo(
    () =>
      adminOrders.filter(
        (order) =>
          (!query ||
            `${order.id} ${order.customer} ${order.email} ${order.fulfilments.map((item) => `${item.code} ${item.shop}`).join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (status === "all" || order.status === status) &&
          (payment === "all" || order.payment === payment) &&
          (risk === "all" || order.risk === risk),
      ),
    [query, status, payment, risk],
  );
  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
            Marketplace operations
          </p>
          <h2 className="mt-2 text-4xl font-semibold">Customer orders</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Inspect payment, risk and every shop-specific fulfilment attached to
            a customer checkout.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium"
        >
          <Download className="h-4 w-4" /> Export filtered
        </button>
      </div>
      <div className="mt-7 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_190px_170px_150px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Order, customer, email, shop or fulfilment"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All fulfilment states</option>
          {[...new Set(adminOrders.map((order) => order.status))].map(
            (value) => (
              <option key={value}>{value}</option>
            ),
          )}
        </select>
        <select
          value={payment}
          onChange={(event) => setPayment(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All payment states</option>
          {[...new Set(adminOrders.map((order) => order.payment))].map(
            (value) => (
              <option key={value}>{value}</option>
            ),
          )}
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
      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" /> {filtered.length} matching
          orders
        </span>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setStatus("all");
            setPayment("all");
            setRisk("all");
          }}
          className="font-medium text-foreground"
        >
          Reset filters
        </button>
      </div>
      <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-[.14em] text-muted-foreground">
              <tr>
                {[
                  "Order",
                  "Customer",
                  "Placed",
                  "Payment",
                  "Fulfilments",
                  "Status",
                  "Risk",
                  "Total",
                  "",
                ].map((heading, index) => (
                  <th
                    key={`${heading}-${index}`}
                    className="px-4 py-4 font-medium"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((order) => (
                <tr key={order.id} className="transition hover:bg-muted/40">
                  <td className="px-4 py-5">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold hover:underline"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-5">
                    <p className="font-medium">{order.customer}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.email}
                    </p>
                  </td>
                  <td className="px-4 py-5 text-muted-foreground">
                    {order.placed}
                  </td>
                  <td className="px-4 py-5">
                    <p>{order.payment}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.method}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <p className="font-medium">
                      {order.fulfilments.length} shop record
                      {order.fulfilments.length === 1 ? "" : "s"}
                    </p>
                    <p className="mt-1 max-w-48 truncate text-xs text-muted-foreground">
                      {order.fulfilments.map((item) => item.code).join(", ")}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${order.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
                    >
                      {order.risk}
                    </span>
                  </td>
                  <td className="px-4 py-5 font-semibold">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-5">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      aria-label={`Open ${order.id}`}
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
            No orders match the active filters.
          </div>
        )}
      </div>
    </section>
  );
}
