"use client";

import { disputeRecords } from "../_components/admin-data";
import {
  AlertTriangle,
  Clock3,
  FileCheck2,
  Scale,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminDisputesPage() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [selected, setSelected] = useState<
    (typeof disputeRecords)[number] | null
  >(null);
  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [audit, setAudit] = useState<string[]>([]);
  const filtered = useMemo(
    () =>
      disputeRecords.filter(
        (dispute) =>
          (!query ||
            `${dispute.id} ${dispute.order} ${dispute.customer} ${dispute.seller} ${dispute.type}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (stateFilter === "all" || dispute.state === stateFilter),
      ),
    [query, stateFilter],
  );
  const confirm = () => {
    if (!selected || !decision || !reason.trim()) return;
    setAudit((current) => [
      `${selected.id} · ${decision} · ${reason.trim()}`,
      ...current,
    ]);
    setSelected(null);
    setDecision("");
    setReason("");
  };
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Resolution centre
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Disputes</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Resolve returns, delivery claims and seller/customer disagreements
          from preserved evidence and policy—not mutable listing content.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5">
          <Scale className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Open cases</p>
          <strong className="mt-1 block text-3xl">27</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <Clock3 className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">SLA risk</p>
          <strong className="mt-1 block text-3xl">5</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <ShieldAlert className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Value protected</p>
          <strong className="mt-1 block text-3xl">$8,420</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_220px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Case, order, customer, seller or claim"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={stateFilter}
          onChange={(event) => setStateFilter(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All case states</option>
          {[...new Set(disputeRecords.map((dispute) => dispute.state))].map(
            (value) => (
              <option key={value}>{value}</option>
            ),
          )}
        </select>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {filtered.map((dispute) => (
          <article
            key={dispute.id}
            className="rounded-3xl border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{dispute.id}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${dispute.priority === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
                  >
                    {dispute.priority}
                  </span>
                </div>
                <p className="mt-2 text-lg font-medium">{dispute.type}</p>
              </div>
              <strong>${dispute.amount}</strong>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {dispute.summary}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">State</span>
                <strong className="mt-1 block">{dispute.state}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Evidence</span>
                <strong className="mt-1 block">{dispute.evidence} files</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">SLA</span>
                <strong className="mt-1 block">{dispute.sla}</strong>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={`/admin/orders/${dispute.order}`}
                className="text-sm font-medium"
              >
                Open {dispute.order}
              </Link>
              <button
                type="button"
                onClick={() => setSelected(dispute)}
                className="rounded-full border border-border px-4 py-2 text-sm"
              >
                Review case
              </button>
            </div>
          </article>
        ))}
      </div>
      {audit.length > 0 && (
        <div className="mt-5 rounded-3xl border border-border bg-card p-5">
          {audit.map((entry) => (
            <p key={entry} className="mt-2 rounded-2xl bg-muted p-3 text-xs">
              {entry}
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
            className="w-full max-w-xl rounded-4xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  {selected.id} · {selected.order}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Resolve dispute</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 rounded-2xl bg-muted p-4">
              <p className="font-medium">{selected.summary}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Customer: {selected.customer} · Seller: {selected.seller} ·{" "}
                {selected.evidence} evidence files
              </p>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">Resolution</span>
              <select
                value={decision}
                onChange={(event) => setDecision(event.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-background px-4"
              >
                <option value="">Select outcome</option>
                <option>Request more evidence</option>
                <option>Approve full refund</option>
                <option>Approve partial refund</option>
                <option>Return to seller</option>
                <option>Resolve for seller</option>
                <option>Escalate legal or safety review</option>
              </select>
            </label>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Policy finding and evidence
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4"
              />
            </label>
            <div className="mt-4 flex gap-3 rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
              <FileCheck2 className="h-4 w-4 shrink-0" />
              <p>
                Resolution stores the evidence snapshot, policy version and
                administrator identity. Refunds create separate financial
                records.
              </p>
            </div>
            <button
              type="button"
              disabled={!decision || !reason.trim()}
              onClick={confirm}
              className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
            >
              Confirm resolution
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
