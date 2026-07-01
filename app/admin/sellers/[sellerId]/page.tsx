"use client";

import { adminSellers } from "../../_components/admin-data";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeDollarSign,
  CircleUserRound,
  ClipboardCheck,
  FileCheck2,
  LockKeyhole,
  ShieldAlert,
  Store,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AdminSellerDetailPage() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const seller = adminSellers.find((item) => item.id === sellerId);
  const [action, setAction] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("7 days");
  const [state, setState] = useState(seller?.state ?? "Unknown");
  const [audit, setAudit] = useState([
    "System · Seller risk profile recalculated",
    "Trust team · Identity record reviewed",
  ]);
  if (!seller)
    return (
      <div className="rounded-3xl border border-border bg-card p-12 text-center">
        <h2 className="text-2xl font-semibold">Seller not found</h2>
        <Link
          href="/admin/sellers"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          Return to sellers
        </Link>
      </div>
    );
  const confirm = () => {
    if (!reason.trim()) return;
    const nextState =
      action === "Approve seller application"
        ? "Active"
        : action === "Suspend seller"
          ? "Suspended"
          : state;
    setState(nextState);
    setAudit((current) => [
      `David Okoye · ${action} · ${duration} · ${reason.trim()}`,
      ...current,
    ]);
    setAction(null);
    setReason("");
  };
  return (
    <section>
      <Link
        href="/admin/sellers"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All sellers
      </Link>
      <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-4xl font-semibold">{seller.name}</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs">
              {state}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${seller.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
            >
              {seller.risk} risk
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            {seller.id} · Joined {seller.joined} · {seller.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seller.state === "Application" && (
            <>
              <button
                type="button"
                onClick={() => setAction("Reject seller application")}
                className="rounded-full border border-destructive/30 px-5 py-2.5 text-sm font-medium text-destructive"
              >
                Reject application
              </button>
              <button
                type="button"
                onClick={() => setAction("Approve seller application")}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
              >
                Approve seller
              </button>
            </>
          )}{" "}
          {seller.state !== "Application" && (
            <>
              <button
                type="button"
                onClick={() => setAction("Hold seller payouts")}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
              >
                Hold payouts
              </button>
              <button
                type="button"
                onClick={() => setAction("Issue formal warning")}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
              >
                Issue warning
              </button>
              <button
                type="button"
                onClick={() => setAction("Suspend seller")}
                className="rounded-full bg-destructive px-5 py-2.5 text-sm font-medium text-white"
              >
                Suspend
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <CircleUserRound className="h-5 w-5" />
              <h3 className="text-xl font-semibold">
                Identity and verification
              </h3>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Verification</p>
                <p className="mt-1 font-medium">{seller.verification}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Document</p>
                <p className="mt-1 font-medium">{seller.identity.type}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reference</p>
                <p className="mt-1 font-medium">{seller.identity.reference}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Checked</p>
                <p className="mt-1 font-medium">{seller.identity.checked}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
              >
                <FileCheck2 className="h-4 w-4" /> Inspect identity documents
              </button>
              <button
                type="button"
                className="rounded-full border border-border px-4 py-2 text-sm"
              >
                Run verification again
              </button>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Store className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Shops</h3>
            </div>
            {seller.shopNames.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {seller.shopNames.map((shop, index) => (
                  <div
                    key={shop}
                    className="rounded-2xl border border-border p-4"
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-medium">{shop}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Shop SH-{seller.id.slice(3)}
                          {index + 1}
                        </p>
                      </div>
                      <span className="h-fit rounded-full bg-muted px-3 py-1 text-xs">
                        Active
                      </span>
                    </div>
                    <button
                      type="button"
                      className="mt-5 text-sm font-semibold"
                    >
                      Open shop record →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-2xl bg-muted p-8 text-center text-sm text-muted-foreground">
                No shop is created until this application is approved.
              </div>
            )}
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <h3 className="text-xl font-semibold">Performance</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs text-muted-foreground">GMV</p>
                <strong className="mt-2 block text-2xl">
                  ${seller.gmv.toLocaleString()}
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs text-muted-foreground">Orders</p>
                <strong className="mt-2 block text-2xl">{seller.orders}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs text-muted-foreground">
                  On-time fulfilment
                </p>
                <strong className="mt-2 block text-2xl">
                  {seller.fulfilment || 0}%
                </strong>
              </div>
              <div className="rounded-2xl bg-muted p-4">
                <p className="text-xs text-muted-foreground">Disputes</p>
                <strong className="mt-2 block text-2xl">
                  {seller.disputes}
                </strong>
              </div>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" />
              <h3 className="text-xl font-semibold">
                Sanctions and restrictions
              </h3>
            </div>
            {seller.sanctions ? (
              <div className="mt-5 space-y-3">
                {Array.from({ length: seller.sanctions }, (_, index) => (
                  <div key={index} className="rounded-2xl bg-destructive/8 p-4">
                    <p className="font-medium text-destructive">
                      Formal warning {index + 1}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fulfilment accuracy and package declaration review.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-muted p-5 text-sm text-muted-foreground">
                No active or historical sanctions.
              </p>
            )}
          </section>
        </div>
        <aside className="space-y-5">
          <section
            className={`rounded-3xl border p-5 ${seller.risk === "High" ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Risk profile</h3>
            </div>
            <p className="mt-5 text-3xl font-semibold">{seller.risk}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Identity consistency checked</li>
              <li>• Delivery declaration variance monitored</li>
              <li>• Dispute ratio compared with category</li>
            </ul>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <BadgeDollarSign className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Financial position</h3>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available payout</span>
                <strong>${(seller.gmv * 0.08).toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Funds on hold</span>
                <strong>${seller.risk === "High" ? "1,240.00" : "0.00"}</strong>
              </div>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Administrative audit</h3>
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
                  Guarded seller action
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
            {![
              "Approve seller application",
              "Reject seller application",
            ].includes(action) && (
              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-medium">Duration</span>
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                >
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>Until manual review</option>
                  <option>Permanent</option>
                </select>
              </label>
            )}
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required evidence and reason
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                placeholder="Reference the policy, evidence and intended outcome"
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
              />
            </label>
            <div className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
              <LockKeyhole className="mb-2 h-4 w-4" />
              This action records the administrator, reason and duration. Seller
              notification and appeal rights should be generated from the saved
              sanction record.
            </div>
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
