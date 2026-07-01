"use client";

import { paymentRecords } from "../_components/admin-data";
import {
  AlertTriangle,
  Banknote,
  CreditCard,
  Download,
  Search,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminPaymentsPage() {
  const [query, setQuery] = useState("");
  const [rail, setRail] = useState("all");
  const [state, setState] = useState("all");
  const [selected, setSelected] = useState<
    (typeof paymentRecords)[number] | null
  >(null);
  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const [audit, setAudit] = useState<string[]>([]);
  const filtered = useMemo(
    () =>
      paymentRecords.filter(
        (payment) =>
          (!query ||
            `${payment.id} ${payment.order} ${payment.customer} ${payment.providerRef}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (rail === "all" || payment.rail === rail) &&
          (state === "all" || payment.state === state),
      ),
    [query, rail, state],
  );
  const confirm = () => {
    if (!selected || !action || !reason.trim()) return;
    setAudit((current) => [
      `${selected.id} · ${action} · ${reason.trim()}`,
      ...current,
    ]);
    setSelected(null);
    setAction("");
    setReason("");
  };
  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
            Financial operations
          </p>
          <h2 className="mt-2 text-4xl font-semibold">Payments</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Inspect transactions, refunds and disputes across card, transfer and
            cryptocurrency rails.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm"
        >
          <Download className="h-4 w-4" /> Export ledger view
        </button>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-card p-5">
          <Banknote className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Gross processed</p>
          <strong className="mt-1 block text-3xl">$184,260</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <CreditCard className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Card settlement</p>
          <strong className="mt-1 block text-3xl">$112,840</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <Wallet className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Transfer and crypto
          </p>
          <strong className="mt-1 block text-3xl">$71,420</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <p className="mt-6 text-sm text-muted-foreground">
            Refunds and chargebacks
          </p>
          <strong className="mt-1 block text-3xl">$6,840</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_180px_210px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Transaction, order, customer or provider reference"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={rail}
          onChange={(event) => setRail(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All payment rails</option>
          <option>Card</option>
          <option>Bank transfer</option>
          <option>Crypto</option>
        </select>
        <select
          value={state}
          onChange={(event) => setState(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All transaction states</option>
          {[...new Set(paymentRecords.map((payment) => payment.state))].map(
            (value) => (
              <option key={value}>{value}</option>
            ),
          )}
        </select>
      </div>
      <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-muted/70 text-xs uppercase tracking-[.14em] text-muted-foreground">
              <tr>
                {[
                  "Transaction",
                  "Order",
                  "Customer",
                  "Rail",
                  "State",
                  "Risk",
                  "Amount",
                  "Refund",
                  "Chargeback",
                  "",
                ].map((heading, index) => (
                  <th key={`${heading}-${index}`} className="px-4 py-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((payment) => (
                <tr key={payment.id} className="hover:bg-muted/40">
                  <td className="px-4 py-5">
                    <p className="font-semibold">{payment.id}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {payment.providerRef}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <Link
                      href={`/admin/orders/${payment.order}`}
                      className="font-medium hover:underline"
                    >
                      {payment.order}
                    </Link>
                  </td>
                  <td className="px-4 py-5">{payment.customer}</td>
                  <td className="px-4 py-5">
                    <p>{payment.rail}</p>
                    <p className="text-xs text-muted-foreground">
                      {payment.method}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                      {payment.state}
                    </span>
                  </td>
                  <td className="px-4 py-5">{payment.risk}</td>
                  <td className="px-4 py-5 font-semibold">
                    {payment.currency === "USD" ? "$" : ""}
                    {payment.amount}{" "}
                    {payment.currency !== "USD" ? payment.currency : ""}
                  </td>
                  <td className="px-4 py-5">${payment.refund}</td>
                  <td className="px-4 py-5">{payment.chargeback}</td>
                  <td className="px-4 py-5">
                    <button
                      type="button"
                      onClick={() => setSelected(payment)}
                      className="rounded-full border border-border px-4 py-2 text-xs"
                    >
                      Review
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
          <h3 className="font-semibold">Session audit additions</h3>
          <div className="mt-3 space-y-2">
            {audit.map((entry) => (
              <p key={entry} className="rounded-2xl bg-muted p-3 text-xs">
                {entry}
              </p>
            ))}
          </div>
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
                  {selected.id} · {selected.rail}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Financial action
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Amount</span>
                <strong className="mt-1 block">
                  {selected.amount} {selected.currency}
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">
                  Provider reference
                </span>
                <strong className="mt-1 block text-sm">
                  {selected.providerRef}
                </strong>
              </div>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">Action</span>
              <select
                value={action}
                onChange={(event) => setAction(event.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-background px-4"
              >
                <option value="">Select an action</option>
                <option>Place payout hold</option>
                <option>Begin refund review</option>
                <option>Record chargeback evidence</option>
                <option>Reconcile provider record</option>
              </select>
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required reason
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
              />
            </label>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Financial actions must create immutable ledger or case records.
              Never overwrite settled amounts, provider references or blockchain
              confirmations.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!action || !reason.trim()}
                onClick={confirm}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                Confirm and audit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
