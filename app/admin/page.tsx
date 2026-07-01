import { adminAlerts, adminOrders } from "./_components/admin-data";
import {
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  CircleDollarSign,
  Clock3,
  PackageCheck,
  ShieldAlert,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const gmv = adminOrders.reduce((sum, order) => sum + order.total, 0);
  const metrics = [
    {
      label: "GMV today",
      value: `$${gmv.toLocaleString()}`,
      change: "+12.4% vs yesterday",
      Icon: CircleDollarSign,
    },
    {
      label: "Orders today",
      value: "142",
      change: "18 require attention",
      Icon: PackageCheck,
    },
    {
      label: "Active sellers",
      value: "386",
      change: "12 awaiting review",
      Icon: Users,
    },
    {
      label: "Open disputes",
      value: "27",
      change: "5 over response SLA",
      Icon: ShieldAlert,
    },
  ];
  return (
    <div>
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-muted-foreground">
            1 July 2026 · Live snapshot
          </p>
          <h2 className="mt-3 text-4xl font-semibold">Platform health</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Financial, fulfilment and marketplace risks requiring operational
            attention.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
          >
            Export snapshot
          </button>
          <Link
            href="/admin/orders"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Open order operations
          </Link>
        </div>
      </section>
      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, change, Icon }) => (
          <article
            key={label}
            className="rounded-3xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{label}</span>
              <Icon className="h-4 w-4" />
            </div>
            <p className="mt-7 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{change}</p>
          </article>
        ))}
      </section>
      <section className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Orders requiring action</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Prioritised by risk, dispute and fulfilment state.
              </p>
            </div>
            <Link href="/admin/orders" className="text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[.14em] text-muted-foreground">
                <tr>
                  {[
                    "Order",
                    "Customer",
                    "Payment",
                    "Fulfilment",
                    "Risk",
                    "Total",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="border-b border-border px-3 py-3"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminOrders
                  .filter((order) => order.status !== "Delivered")
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="border-b border-border px-3 py-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-semibold hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="border-b border-border px-3 py-4">
                        {order.customer}
                      </td>
                      <td className="border-b border-border px-3 py-4">
                        {order.payment}
                      </td>
                      <td className="border-b border-border px-3 py-4">
                        {order.status}
                      </td>
                      <td className="border-b border-border px-3 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${order.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-muted"}`}
                        >
                          {order.risk}
                        </span>
                      </td>
                      <td className="border-b border-border px-3 py-4 font-semibold">
                        ${order.total}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-5">
          <section className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Operational alerts</h3>
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="mt-5 divide-y divide-border">
              {adminAlerts.map((alert) => (
                <div key={alert.title} className="py-4">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`text-xs font-semibold uppercase tracking-[.15em] ${alert.severity === "Critical" ? "text-destructive" : "text-muted-foreground"}`}
                    >
                      {alert.severity}
                    </span>
                    <span className="rounded-full bg-muted px-2 py-1 text-[10px]">
                      {alert.queue}
                    </span>
                  </div>
                  <p className="mt-2 font-medium">{alert.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {alert.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <BadgeDollarSign className="h-6 w-6" />
            <p className="mt-5 text-xs uppercase tracking-[.2em] text-primary-foreground/55">
              Settlement position
            </p>
            <p className="mt-2 text-3xl font-semibold">$84,260</p>
            <p className="mt-2 text-sm text-primary-foreground/65">
              Seller funds scheduled, with $6,840 held for disputes and delivery
              review.
            </p>
          </section>
        </div>
      </section>
      <section className="mt-5 grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/orders?status=delivery-review"
          className="group rounded-3xl border border-border bg-card p-5"
        >
          <Clock3 className="h-5 w-5" />
          <h3 className="mt-7 text-xl font-semibold">3 delivery inspections</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Review weight, handling and the final platform fee.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
            Open queue{" "}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          href="/admin/orders?status=disputed"
          className="group rounded-3xl border border-border bg-card p-5"
        >
          <ShieldAlert className="h-5 w-5" />
          <h3 className="mt-7 text-xl font-semibold">
            5 breached dispute SLAs
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Customer or seller response is overdue.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
            Review disputes <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <Link
          href="/admin/orders?status=seller-overdue"
          className="group rounded-3xl border border-border bg-card p-5"
        >
          <Store className="h-5 w-5" />
          <h3 className="mt-7 text-xl font-semibold">
            4 seller acknowledgements overdue
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Paid fulfilments remain unacknowledged after 24 hours.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
            Contact sellers <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </section>
    </div>
  );
}
