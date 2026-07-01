"use client";

import { adminOrders } from "../../_components/admin-data";
import {
  AlertTriangle,
  ArrowLeft,
  Banknote,
  Check,
  CircleUserRound,
  ClipboardCheck,
  CreditCard,
  ExternalLink,
  FileText,
  LockKeyhole,
  PackageCheck,
  RotateCcw,
  ShieldAlert,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AdminOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = adminOrders.find((item) => item.id === orderId);
  const [action, setAction] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [audit, setAudit] = useState<string[]>([
    "System · Order risk scored at checkout",
    "Operations · Delivery review queue assigned",
  ]);
  if (!order)
    return (
      <div className="rounded-3xl border border-border bg-card p-12 text-center">
        <h2 className="text-2xl font-semibold">Order not found</h2>
        <Link
          href="/admin/orders"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          Return to orders
        </Link>
      </div>
    );
  const confirmAction = () => {
    if (!reason.trim()) return;
    setAudit((current) => [
      `David Okoye · ${action} · ${reason.trim()}`,
      ...current,
    ]);
    setAction(null);
    setReason("");
  };
  return (
    <section>
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All orders
      </Link>
      <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-4xl font-semibold">{order.id}</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs">
              {order.status}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${order.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
            >
              {order.risk} risk
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Placed {order.placed} · {order.fulfilments.length} shop fulfilment
            {order.fulfilments.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAction("Place payout hold")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium"
          >
            <LockKeyhole className="h-4 w-4" /> Hold payout
          </button>
          <button
            type="button"
            onClick={() => setAction("Initiate refund review")}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium"
          >
            <RotateCcw className="h-4 w-4" /> Review refund
          </button>
          <button
            type="button"
            onClick={() => setAction("Escalate order")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
          >
            <ShieldAlert className="h-4 w-4" /> Escalate
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Payment record</h3>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">State</p>
                <p className="mt-1 font-medium">{order.payment}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Method</p>
                <p className="mt-1 font-medium">{order.method}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gross amount</p>
                <p className="mt-1 font-medium">${order.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transaction</p>
                <p className="mt-1 font-medium">TXN-{order.id.slice(3)}26</p>
              </div>
            </div>
            <div className="mt-5 rounded-2xl bg-muted p-4 text-sm">
              <div className="flex items-center justify-between">
                <span>Seller payable before holds</span>
                <strong>${(order.total * 0.88).toFixed(2)}</strong>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span>Marketplace and processing allocation</span>
                <strong>${(order.total * 0.12).toFixed(2)}</strong>
              </div>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5" />
                <h3 className="text-xl font-semibold">Shop fulfilments</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                Independent seller records
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {order.fulfilments.map((fulfilment) => (
                <article
                  key={fulfilment.code}
                  className="rounded-2xl border border-border p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{fulfilment.code}</h4>
                        <span className="rounded-full bg-muted px-3 py-1 text-xs">
                          {fulfilment.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {fulfilment.shop}
                      </p>
                    </div>
                    <strong>${fulfilment.amount.toFixed(2)}</strong>
                  </div>
                  <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Items</p>
                      {fulfilment.items.map((item) => (
                        <p key={item} className="mt-1 text-sm font-medium">
                          {item}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Delivery ownership
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {fulfilment.delivery}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Admin control
                      </p>
                      <button
                        type="button"
                        onClick={() => setAction(`Review ${fulfilment.code}`)}
                        className="mt-1 inline-flex items-center gap-1 text-sm font-semibold"
                      >
                        Inspect fulfilment{" "}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Combined order timeline</h3>
            </div>
            <div className="mt-7">
              {order.events.map((event, index) => (
                <div key={event} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < order.events.length - 1 && (
                    <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-border" />
                  )}
                  <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium">{event}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Recorded by platform audit · Event {index + 1}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <CircleUserRound className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Customer</h3>
            </div>
            <p className="mt-5 font-medium">{order.customer}</p>
            <p className="mt-1 text-sm text-muted-foreground">{order.email}</p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">
                  Lifetime orders
                </span>
                <strong className="mt-1 block">14</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Disputes</span>
                <strong className="mt-1 block">1</strong>
              </div>
            </div>
            <button
              type="button"
              className="mt-5 w-full rounded-full border border-border py-2.5 text-sm font-medium"
            >
              Open customer record
            </button>
          </section>
          <section
            className={`rounded-3xl border p-5 ${order.risk === "High" ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Risk assessment</h3>
            </div>
            <p className="mt-4 text-3xl font-semibold">{order.risk}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Payment identity signals checked</li>
              <li>• Address velocity within threshold</li>
              <li>• Delivery weight variance flagged</li>
            </ul>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Internal notes</h3>
            </div>
            <textarea
              value={internalNote}
              onChange={(event) => setInternalNote(event.target.value)}
              rows={3}
              placeholder="Visible only to authorised admins"
              className="mt-4 w-full rounded-2xl border border-border bg-background p-3 text-sm"
            />
            <button
              type="button"
              disabled={!internalNote.trim()}
              onClick={() => {
                setAudit((current) => [
                  `David Okoye · Added internal note · ${internalNote.trim()}`,
                  ...current,
                ]);
                setInternalNote("");
              }}
              className="mt-3 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-40"
            >
              Add note
            </button>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Audit trail</h3>
            </div>
            <div className="mt-4 space-y-3">
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
      {action && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAction(null);
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
                  Guarded admin action
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{action}</h2>
              </div>
              <button
                type="button"
                onClick={() => setAction(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 rounded-2xl bg-muted p-4 text-sm leading-6">
              <Banknote className="mb-3 h-5 w-5" />
              This action will be recorded with your administrator identity.
              Financial actions should create ledger entries rather than
              overwrite transaction totals.
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required reason
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
                placeholder="Explain the evidence and operational reason"
              />
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setAction(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!reason.trim()}
                onClick={confirmAction}
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
