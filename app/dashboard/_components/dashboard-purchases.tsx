"use client";

import { customerOrders } from "./account-data";
import { CreditCard, Search, WalletCards } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function DashboardPurchases() {
  const [query, setQuery] = useState("");
  const purchases = useMemo(
    () =>
      customerOrders.filter((purchase) =>
        `${purchase.code} ${purchase.paymentMethod} ${purchase.transactionId} ${purchase.items.map((item) => item.name).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const lifetimeSpend = customerOrders.reduce(
    (sum, purchase) => sum + purchase.total,
    0,
  );

  return (
    <section className="m-2 w-[calc(100%-1rem)]">
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Total spent" value={`$${lifetimeSpend.toFixed(2)}`} />
        <Metric
          label="Completed purchases"
          value={String(customerOrders.length)}
        />
        <Metric label="Pending payments" value="0" />
      </div>
      <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Purchase history</h2>
          <p className="mt-2 text-muted-foreground">
            Your financial record: what you bought, when you paid and the
            payment method used.
          </p>
        </div>
        <label className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search code, item or transaction"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm outline-none"
          />
        </label>
      </div>
      <div className="mt-7 space-y-5">
        {purchases.map((purchase) => (
          <article
            key={purchase.code}
            className="rounded-3xl border border-border bg-card p-5 sm:p-7"
          >
            <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-semibold">{purchase.code}</h3>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    {purchase.paymentStatus}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Purchased {purchase.placed} · Transaction{" "}
                  {purchase.transactionId}
                </p>
              </div>
              <div className="flex items-center gap-3 lg:text-right">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-muted">
                  <CreditCard className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-medium">{purchase.paymentMethod}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Amount paid{" "}
                    <strong className="text-foreground">
                      ${purchase.total.toFixed(2)}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {purchase.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-2xl bg-muted p-3"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 py-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Quantity {item.quantity}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
        {purchases.length === 0 && (
          <div className="rounded-3xl bg-muted p-12 text-center">
            <WalletCards className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              No purchases match “{query}”.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-6 text-3xl font-semibold">{value}</p>
    </div>
  );
}
