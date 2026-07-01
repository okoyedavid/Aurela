"use client";

import { adminCustomers, adminOrders } from "../_components/admin-data";
import {
  Headphones,
  Search,
  ShieldAlert,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminCustomersPage() {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");
  const [selected, setSelected] = useState<
    (typeof adminCustomers)[number] | null
  >(null);
  const filtered = useMemo(
    () =>
      adminCustomers.filter(
        (customer) =>
          (!query ||
            `${customer.id} ${customer.name} ${customer.email} ${customer.support}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (risk === "all" || customer.risk === risk),
      ),
    [query, risk],
  );
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Accounts and support
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Customers</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Review account standing, order history and support context without
          exposing full payment credentials.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5">
          <UserRound className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Active customers</p>
          <strong className="mt-1 block text-3xl">18,420</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <Headphones className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Open support cases
          </p>
          <strong className="mt-1 block text-3xl">86</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <ShieldAlert className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Account reviews</p>
          <strong className="mt-1 block text-3xl">14</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_180px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Customer, email, ID or support issue"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={risk}
          onChange={(event) => setRisk(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All risk levels</option>
          <option>Low</option>
          <option>Review</option>
          <option>High</option>
        </select>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {filtered.map((customer) => (
          <article
            key={customer.id}
            className="rounded-3xl border border-border bg-card p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{customer.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {customer.id} · {customer.email}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${customer.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
              >
                {customer.risk}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">Orders</p>
                <strong className="mt-1 block">{customer.orders}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">Spend</p>
                <strong className="mt-1 block">
                  ${customer.spend.toLocaleString()}
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">Disputes</p>
                <strong className="mt-1 block">{customer.disputes}</strong>
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Support context</p>
              <p className="mt-1 text-sm font-medium">{customer.support}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(customer)}
              className="mt-4 rounded-full border border-border px-5 py-2.5 text-sm font-medium"
            >
              Open customer context
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-foreground/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="my-6 w-full max-w-2xl rounded-[2rem] border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  Customer context
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{selected.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selected.email} · Joined {selected.joined}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Orders</span>
                <strong className="mt-1 block">{selected.orders}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Spend</span>
                <strong className="mt-1 block">${selected.spend}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Returns</span>
                <strong className="mt-1 block">{selected.returns}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">
                  Last active
                </span>
                <strong className="mt-1 block text-sm">
                  {selected.lastActive}
                </strong>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Related orders</h3>
              </div>
              <div className="mt-3 space-y-2">
                {adminOrders
                  .filter((order) => order.customer === selected.name)
                  .map((order) => (
                    <Link
                      key={order.id}
                      href={`/admin/orders/${order.id}`}
                      className="flex items-center justify-between rounded-2xl border border-border p-4"
                    >
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.status} · {order.placed}
                        </p>
                      </div>
                      <strong>${order.total}</strong>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-muted p-4">
              <p className="text-sm font-medium">Support handling guidance</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Use order and fulfilment evidence when responding. Never request
                passwords, CVV values, complete card numbers, recovery codes or
                private crypto keys.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Add internal note
              </button>
              <button
                type="button"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Open support case
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
