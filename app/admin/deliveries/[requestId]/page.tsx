"use client";

import { deliveryRequests } from "../../_components/admin-data";
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  ClipboardCheck,
  Package,
  Ruler,
  Scale,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DeliveryRequestDetailPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const request = deliveryRequests.find((item) => item.id === requestId);
  const [decision, setDecision] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [fee, setFee] = useState("");
  const [status, setStatus] = useState(request?.status ?? "Unknown");
  const [audit, setAudit] = useState([
    "System · Request submitted by seller",
    "Operations · Evidence checks assigned",
  ]);
  if (!request)
    return (
      <div className="rounded-3xl border border-border bg-card p-12 text-center">
        <h2 className="text-2xl font-semibold">Delivery request not found</h2>
        <Link
          href="/admin/deliveries"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          Return to queue
        </Link>
      </div>
    );
  const confirm = () => {
    if (!reason.trim() || (decision === "Reprice request" && !fee)) return;
    const result =
      decision === "Accept platform delivery"
        ? "Accepted—awaiting handoff"
        : decision === "Reject request"
          ? "Rejected"
          : `Repriced to $${Number(fee).toFixed(2)}—seller approval required`;
    setStatus(result);
    setAudit((current) => [
      `David Okoye · ${decision}${fee ? ` · $${Number(fee).toFixed(2)}` : ""} · ${reason.trim()}`,
      ...current,
    ]);
    setDecision(null);
    setReason("");
    setFee("");
  };
  const variance = request.inspectedWeight - request.declaredWeight;
  return (
    <section>
      <Link
        href="/admin/deliveries"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Delivery queue
      </Link>
      <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-4xl font-semibold">{request.id}</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs">
              {status}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${request.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
            >
              {request.risk} risk
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            {request.fulfilment} · {request.order} · Submitted{" "}
            {request.submitted}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDecision("Reject request")}
            className="rounded-full border border-destructive/30 px-5 py-2.5 text-sm font-medium text-destructive"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => {
              setDecision("Reprice request");
              setFee(String(request.proposedFee));
            }}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
          >
            Reprice
          </button>
          <button
            type="button"
            onClick={() => setDecision("Accept platform delivery")}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Accept delivery
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <h3 className="text-xl font-semibold">
              Declared versus inspected package
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-muted p-4">
                <Scale className="h-4 w-4" />
                <p className="mt-4 text-xs text-muted-foreground">
                  Declared weight
                </p>
                <strong className="mt-1 block text-xl">
                  {request.declaredWeight} kg
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <Scale className="h-4 w-4" />
                <p className="mt-4 text-xs text-muted-foreground">
                  Inspected weight
                </p>
                <strong className="mt-1 block text-xl">
                  {request.inspectedWeight} kg
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <Ruler className="h-4 w-4" />
                <p className="mt-4 text-xs text-muted-foreground">Dimensions</p>
                <strong className="mt-1 block text-sm">
                  {request.dimensions}
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <Package className="h-4 w-4" />
                <p className="mt-4 text-xs text-muted-foreground">
                  Category norm
                </p>
                <strong className="mt-1 block text-sm">
                  {request.categoryTypical}
                </strong>
              </div>
            </div>
            <div
              className={`mt-5 rounded-2xl p-4 ${variance > 0.5 ? "bg-destructive/8 text-destructive" : "bg-muted"}`}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5" />
                <strong>
                  Weight variance: {variance > 0 ? "+" : ""}
                  {variance.toFixed(1)} kg
                </strong>
              </div>
              <p className="mt-2 text-sm">
                Acceptance should use inspected weight and volumetric handling
                requirements, not the seller declaration alone.
              </p>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Calculator className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Fee calculation</h3>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-3">
                <span>Shop item subtotal</span>
                <strong>${request.subtotal.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span>10% platform-delivery baseline</span>
                <strong>${request.baselineFee.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between border-b border-border pb-3">
                <span>Weight / handling adjustment</span>
                <strong>
                  ${(request.proposedFee - request.baselineFee).toFixed(2)}
                </strong>
              </div>
              <div className="flex justify-between text-base">
                <span>Proposed delivery fee</span>
                <strong>${request.proposedFee.toFixed(2)}</strong>
              </div>
            </div>
            <p className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
              A repriced request requires seller approval before custody
              transfer. Acceptance is not complete until the package handoff is
              scanned and recorded.
            </p>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Route and contents</h3>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="mt-1 font-medium">{request.shop}</p>
                <p className="text-sm text-muted-foreground">
                  Seller: {request.seller}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Destination</p>
                <p className="mt-1 font-medium">{request.destination}</p>
                <p className="text-sm text-muted-foreground">
                  Customer: {request.customer}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-muted p-4">
              {request.items.map((item) => (
                <p key={item} className="text-sm font-medium">
                  {item}
                </p>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Inspection flags</h3>
            </div>
            {request.flags.length ? (
              <div className="mt-4 space-y-2">
                {request.flags.map((flag) => (
                  <div
                    key={flag}
                    className="rounded-2xl bg-destructive/8 p-3 text-sm text-destructive"
                  >
                    {flag}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                No package or seller-history flags.
              </p>
            )}
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">Submitted evidence</h3>
            <div className="mt-4 space-y-2">
              {request.evidence.map((evidence) => (
                <button
                  key={evidence}
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-border p-3 text-left text-sm"
                >
                  <span>{evidence}</span>
                  <span className="text-xs text-muted-foreground">Inspect</span>
                </button>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Decision audit</h3>
            </div>
            <div className="mt-4 space-y-2">
              {audit.map((entry) => (
                <div
                  key={entry}
                  className="rounded-2xl bg-muted p-3 text-xs leading-5"
                >
                  {entry}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
      {decision && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDecision(null);
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
                  Delivery custody decision
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{decision}</h2>
              </div>
              <button
                type="button"
                onClick={() => setDecision(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {decision === "Reprice request" && (
              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-medium">
                  Revised fee
                </span>
                <input
                  type="number"
                  min={request.baselineFee}
                  value={fee}
                  onChange={(event) => setFee(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                />
              </label>
            )}
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required decision reason
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                placeholder="Reference inspected evidence, capacity or handling requirements"
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
              />
            </label>
            <div className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
              Accepting creates an awaiting-handoff state. Aurela assumes
              custody only after a successful package scan. Rejections and
              repricing notify the seller with this reason.
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDecision(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  !reason.trim() || (decision === "Reprice request" && !fee)
                }
                onClick={confirm}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                Confirm decision
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
