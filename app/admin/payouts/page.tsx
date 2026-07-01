"use client";

import { payoutRecords } from "../_components/admin-data";
import {
  AlertTriangle,
  Banknote,
  CalendarClock,
  LockKeyhole,
  Search,
  WalletCards,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminPayoutsPage() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [selected, setSelected] = useState<
    (typeof payoutRecords)[number] | null
  >(null);
  const [action, setAction] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [audit, setAudit] = useState<string[]>([]);
  const filtered = useMemo(
    () =>
      payoutRecords.filter(
        (payout) =>
          (!query ||
            `${payout.id} ${payout.seller} ${payout.sellerId} ${payout.batch}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (stateFilter === "all" || payout.state === stateFilter),
      ),
    [query, stateFilter],
  );
  const confirm = () => {
    if (
      !selected ||
      !action ||
      !reason.trim() ||
      (["Place hold", "Release hold"].includes(action) && !amount)
    )
      return;
    setAudit((current) => [
      `${selected.id} · ${action}${amount ? ` $${amount}` : ""} · ${reason.trim()}`,
      ...current,
    ]);
    setSelected(null);
    setAction("");
    setAmount("");
    setReason("");
  };
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Seller settlements
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Payouts</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Manage seller balances, documented holds and immutable payout batches
          without altering the underlying payment ledger.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-card p-5">
          <WalletCards className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Available balances
          </p>
          <strong className="mt-1 block text-3xl">$84,260</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <CalendarClock className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Next batch</p>
          <strong className="mt-1 block text-3xl">$72,480</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <LockKeyhole className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Funds held</p>
          <strong className="mt-1 block text-3xl">$6,840</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="mt-6 text-sm text-muted-foreground">
            Failed destinations
          </p>
          <strong className="mt-1 block text-3xl">3</strong>
        </div>
      </div>
      <section className="mt-6 rounded-3xl bg-primary p-5 text-primary-foreground sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-primary-foreground/55">
              Batch PB-0701-A
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              Scheduled for 2 July 2026
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/65">
              184 seller payouts · $72,480.00 · Preflight reconciliation
              incomplete
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-full border border-primary-foreground/20 px-5 py-2.5 text-sm"
            >
              Run preflight
            </button>
            <button
              type="button"
              className="rounded-full bg-background px-5 py-2.5 text-sm font-semibold text-foreground"
            >
              Review batch
            </button>
          </div>
        </div>
      </section>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_210px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Payout, seller or batch"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={stateFilter}
          onChange={(event) => setStateFilter(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All payout states</option>
          {[...new Set(payoutRecords.map((payout) => payout.state))].map(
            (value) => (
              <option key={value}>{value}</option>
            ),
          )}
        </select>
      </div>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-[.14em] text-muted-foreground">
              <tr>
                {[
                  "Payout",
                  "Seller",
                  "Available",
                  "Held",
                  "Scheduled",
                  "Destination",
                  "Batch",
                  "State",
                  "",
                ].map((heading, index) => (
                  <th key={`${heading}-${index}`} className="px-4 py-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((payout) => (
                <tr key={payout.id}>
                  <td className="px-4 py-5 font-semibold">{payout.id}</td>
                  <td className="px-4 py-5">
                    <Link
                      href={`/admin/sellers/${payout.sellerId}`}
                      className="font-medium hover:underline"
                    >
                      {payout.seller}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {payout.sellerId}
                    </p>
                  </td>
                  <td className="px-4 py-5">${payout.available.toFixed(2)}</td>
                  <td className="px-4 py-5">${payout.held.toFixed(2)}</td>
                  <td className="px-4 py-5 font-semibold">
                    ${payout.scheduled.toFixed(2)}
                  </td>
                  <td className="px-4 py-5">{payout.method}</td>
                  <td className="px-4 py-5">{payout.batch}</td>
                  <td className="px-4 py-5">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      {payout.state}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <button
                      type="button"
                      onClick={() => setSelected(payout)}
                      className="rounded-full border border-border px-4 py-2 text-xs"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {audit.length > 0 && (
        <div className="mt-5 rounded-3xl border border-border bg-card p-5">
          <h3 className="font-semibold">Session audit</h3>
          {audit.map((item) => (
            <p key={item} className="mt-2 rounded-2xl bg-muted p-3 text-xs">
              {item}
            </p>
          ))}
        </div>
      )}
      {selected && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg rounded-[2rem] border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  {selected.id} · {selected.seller}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Payout control</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium">Action</span>
              <select
                value={action}
                onChange={(event) => setAction(event.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-background px-4"
              >
                <option value="">Select action</option>
                <option>Place hold</option>
                <option>Release hold</option>
                <option>Move to next batch</option>
                <option>Retry failed destination</option>
              </select>
            </label>
            {["Place hold", "Release hold"].includes(action) && (
              <label className="mt-5 block">
                <span className="mb-2 block text-sm font-medium">Amount</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                />
              </label>
            )}
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required reason
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4"
              />
            </label>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              This creates a hold, release or batch instruction. It never
              rewrites settled customer transactions.
            </p>
            <button
              type="button"
              disabled={
                !action ||
                !reason.trim() ||
                (["Place hold", "Release hold"].includes(action) && !amount)
              }
              onClick={confirm}
              className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Confirm and audit
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
