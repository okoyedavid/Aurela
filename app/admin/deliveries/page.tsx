"use client";

import { deliveryRequests } from "../_components/admin-data";
import {
  AlertTriangle,
  ChevronRight,
  Clock3,
  PackageSearch,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminDeliveriesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [risk, setRisk] = useState("all");
  const filtered = useMemo(
    () =>
      deliveryRequests.filter(
        (request) =>
          (!query ||
            `${request.id} ${request.fulfilment} ${request.order} ${request.shop} ${request.seller} ${request.customer} ${request.destination}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (status === "all" || request.status === status) &&
          (risk === "all" || request.risk === risk),
      ),
    [query, status, risk],
  );
  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
            Platform fulfilment
          </p>
          <h2 className="mt-2 text-4xl font-semibold">Delivery review queue</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Inspect package evidence and operational capacity before Aurela
            accepts custody or confirms the platform-delivery fee.
          </p>
        </div>
        <div className="rounded-2xl bg-primary px-5 py-3 text-primary-foreground">
          <p className="text-xs text-primary-foreground/60">Oldest waiting</p>
          <p className="mt-1 font-semibold">16h 24m</p>
        </div>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-card p-5">
          <PackageSearch className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Open requests</p>
          <strong className="mt-1 block text-3xl">
            {deliveryRequests.length}
          </strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="mt-6 text-sm text-muted-foreground">Inspection flags</p>
          <strong className="mt-1 block text-3xl">4</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <Clock3 className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Near response SLA
          </p>
          <strong className="mt-1 block text-3xl">1</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <Truck className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Capacity today</p>
          <strong className="mt-1 block text-3xl">18 slots</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_230px_160px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Request, order, seller, shop or destination"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All queue states</option>
          {[...new Set(deliveryRequests.map((request) => request.status))].map(
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
      <div className="mt-5 space-y-4">
        {filtered.map((request) => (
          <Link
            key={request.id}
            href={`/admin/deliveries/${request.id}`}
            className="group block rounded-3xl border border-border bg-card p-5 transition hover:border-foreground/25 sm:p-7"
          >
            <div className="grid gap-5 lg:grid-cols-[1.1fr_.8fr_.8fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold">{request.id}</h3>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {request.status}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${request.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
                  >
                    {request.risk}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium">{request.shop}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {request.fulfilment} · {request.order} · {request.seller}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Package</p>
                <p className="mt-1 text-sm font-medium">
                  {request.inspectedWeight} kg · {request.dimensions}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Declared {request.declaredWeight} kg
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fee review</p>
                <p className="mt-1 text-sm font-medium">
                  Baseline ${request.baselineFee.toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Proposed ${request.proposedFee.toFixed(2)}
                </p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border">
                <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
            {request.flags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                {request.flags.map((flag) => (
                  <span
                    key={flag}
                    className="inline-flex items-center gap-2 rounded-full bg-destructive/8 px-3 py-1 text-xs text-destructive"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {flag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-3xl bg-muted p-12 text-center text-muted-foreground">
            No delivery requests match these filters.
          </div>
        )}
      </div>
    </section>
  );
}
