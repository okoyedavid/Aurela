"use client";

import {
  adminOrders,
  adminShops,
  moderationProducts,
} from "../../_components/admin-data";
import {
  AlertTriangle,
  ArrowLeft,
  Boxes,
  ClipboardCheck,
  LockKeyhole,
  PackageCheck,
  ShieldAlert,
  Store,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function AdminShopDetailPage() {
  const { shopId } = useParams<{ shopId: string }>();
  const shop = adminShops.find((item) => item.id === shopId);
  const [action, setAction] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [state, setState] = useState(shop?.state ?? "Unknown");
  const [audit, setAudit] = useState([
    "System · Weekly compliance score recalculated",
    "Moderation · Catalogue sample reviewed",
  ]);
  if (!shop)
    return (
      <div className="rounded-3xl border border-border bg-card p-12 text-center">
        <h2 className="text-2xl font-semibold">Shop not found</h2>
        <Link
          href="/admin/shops"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground"
        >
          Return to shops
        </Link>
      </div>
    );
  const products = moderationProducts.filter(
    (product) => product.shopId === shop.id,
  );
  const orders = adminOrders.flatMap((order) =>
    order.fulfilments
      .filter((fulfilment) => fulfilment.shop === shop.name)
      .map((fulfilment) => ({
        order: order.id,
        customer: order.customer,
        ...fulfilment,
      })),
  );
  const confirm = () => {
    if (!reason.trim()) return;
    if (action === "Restrict shop") setState("Restricted");
    if (action === "Restore shop") setState("Active");
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
        href="/admin/shops"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All shops
      </Link>
      <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-4xl font-semibold">{shop.name}</h2>
            <span className="rounded-full bg-muted px-3 py-1 text-xs">
              {state}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs ${shop.moderation === "Escalated" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
            >
              {shop.moderation}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            {shop.id} · {shop.category} · Created {shop.created}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setAction(
                state === "Restricted" ? "Restore shop" : "Restrict shop",
              )
            }
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
          >
            {state === "Restricted" ? "Restore shop" : "Restrict shop"}
          </button>
          <button
            type="button"
            onClick={() => setAction("Suspend shop")}
            className="rounded-full bg-destructive px-5 py-2.5 text-sm font-medium text-white"
          >
            Suspend shop
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Store className="h-5 w-5" />
              <h3 className="text-xl font-semibold">
                Ownership and performance
              </h3>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Owner</p>
                <Link
                  href={`/admin/sellers/${shop.sellerId}`}
                  className="mt-1 block font-medium hover:underline"
                >
                  {shop.owner}
                </Link>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">GMV</p>
                <p className="mt-1 font-medium">${shop.gmv.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Orders</p>
                <p className="mt-1 font-medium">{shop.orders}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  On-time fulfilment
                </p>
                <p className="mt-1 font-medium">{shop.fulfilment}%</p>
              </div>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Boxes className="h-5 w-5" />
                <h3 className="text-xl font-semibold">Products</h3>
              </div>
              <Link
                href={`/admin/products?shop=${shop.id}`}
                className="text-sm font-medium"
              >
                Open catalogue moderation
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid gap-3 rounded-2xl bg-muted p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {product.id} · {product.issue}
                    </p>
                  </div>
                  <span className="rounded-full bg-background px-3 py-1 text-xs">
                    {product.state}
                  </span>
                  <strong>${product.price}</strong>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <PackageCheck className="h-5 w-5" />
              <h3 className="text-xl font-semibold">
                Recent order fulfilments
              </h3>
            </div>
            <div className="mt-5 space-y-3">
              {orders.length ? (
                orders.map((order) => (
                  <div
                    key={order.code}
                    className="grid gap-3 rounded-2xl border border-border p-4 sm:grid-cols-[1fr_auto_auto]"
                  >
                    <div>
                      <p className="font-medium">{order.code}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.order} · {order.customer}
                      </p>
                    </div>
                    <span className="text-sm">{order.status}</span>
                    <strong>${order.amount}</strong>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl bg-muted p-5 text-sm text-muted-foreground">
                  No sample fulfilments in the current admin dataset.
                </p>
              )}
            </div>
          </section>
        </div>
        <aside className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Compliance</h3>
            </div>
            {shop.flags.length ? (
              <div className="mt-4 space-y-2">
                {shop.flags.map((flag) => (
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
                No unresolved compliance flags.
              </p>
            )}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">Disputes</p>
                <strong className="mt-1 block text-xl">{shop.disputes}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <p className="text-xs text-muted-foreground">
                  Pending listings
                </p>
                <strong className="mt-1 block text-xl">
                  {shop.pendingProducts}
                </strong>
              </div>
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Activity and audit</h3>
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
                  Shop enforcement
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
            <div className="mt-6 flex gap-3 rounded-2xl bg-muted p-4 text-sm leading-6">
              <AlertTriangle className="mt-1 h-4 w-4 shrink-0" />
              <p>
                Restrictions affect new listings and selling capability but must
                not erase paid fulfilment or financial records.
              </p>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required reason and evidence
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
              />
            </label>
            <div className="mt-5 flex justify-end gap-3">
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
                <LockKeyhole className="mr-2 inline h-4 w-4" />
                Confirm and audit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
