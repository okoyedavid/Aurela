"use client";

import { customerOrders } from "./account-data";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  PackageSearch,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function DashboardOrders({ orderId }: { orderId?: string }) {
  const [query, setQuery] = useState("");
  const order = orderId
    ? customerOrders.find(
        (entry) => entry.code.toLowerCase() === orderId.toLowerCase(),
      )
    : undefined;
  const filtered = useMemo(
    () =>
      customerOrders.filter((entry) =>
        `${entry.code} ${entry.status} ${entry.items.map((item) => item.name).join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  if (orderId && !order)
    return (
      <div className="m-2 w-[calc(100%-1rem)] rounded-3xl border border-border bg-card p-12 text-center">
        <PackageSearch className="mx-auto h-10 w-10 text-muted-foreground" />
        <h2 className="mt-5 text-2xl font-semibold">Order not found</h2>
        <Link
          href="/dashboard/orders"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground"
        >
          Return to orders
        </Link>
      </div>
    );
  if (order)
    return (
      <div className="m-2 w-[calc(100%-1rem)]">
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All orders
        </Link>
        <div className="mt-6 grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
                  Order code
                </p>
                <h2 className="mt-2 text-3xl font-semibold">{order.code}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Placed {order.placed}
                </p>
              </div>
              <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
                {order.status}
              </span>
            </div>
            <div className="mt-6 grid gap-3 rounded-2xl bg-muted p-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  Estimated delivery
                </p>
                <p className="mt-1 text-sm font-medium">{order.eta}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Courier</p>
                <p className="mt-1 text-sm font-medium">{order.courier}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Driver contact</p>
                <p className="mt-1 text-sm font-medium">
                  {order.driver.name} · {order.driver.phone}
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-border"
                >
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 35vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Quantity {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
              Delivery timeline
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Where your order is</h2>
            <div className="mt-8">
              {order.events.map((event, index) => (
                <div
                  key={event.title}
                  className="relative flex gap-4 pb-9 last:pb-0"
                >
                  {index < order.events.length - 1 && (
                    <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-border" />
                  )}
                  <span
                    className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border ${event.complete ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
                  >
                    {event.complete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {event.detail}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );

  return (
    <section className="m-2 w-[calc(100%-1rem)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Order history</h2>
          <p className="mt-2 text-muted-foreground">
            Each checkout shares one order code, even when it contains several
            pieces.
          </p>
        </div>
        <label className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search order code, item or status"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm outline-none"
          />
        </label>
      </div>
      <div className="mt-7 space-y-5">
        {filtered.map((entry) => (
          <Link
            key={entry.code}
            href={`/dashboard/orders/${entry.code}`}
            className="group block rounded-3xl border border-border bg-card p-5 transition hover:border-foreground/25 sm:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{entry.code}</h3>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {entry.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Placed {entry.placed} · {entry.items.length} piece
                  {entry.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <strong>${entry.total.toFixed(2)}</strong>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {entry.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl bg-muted p-2"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Qty {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-3xl bg-muted p-12 text-center text-muted-foreground">
            No orders match “{query}”.
          </div>
        )}
      </div>
    </section>
  );
}
