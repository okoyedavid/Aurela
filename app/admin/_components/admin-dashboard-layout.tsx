"use client";

import {
  AlertTriangle,
  Banknote,
  BarChart3,
  Bell,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  Store,
  UserRound,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const links = [
    { label: "Platform overview", href: "/admin", Icon: LayoutDashboard },
    { label: "Orders", href: "/admin/orders", Icon: ClipboardList },
    { label: "Delivery reviews", href: "/admin/deliveries", Icon: ShieldCheck },
    { label: "Sellers", href: "/admin/sellers", Icon: Users },
    { label: "Shops", href: "/admin/shops", Icon: Store },
    { label: "Products", href: "/admin/products", Icon: Boxes },
    { label: "Customers", href: "/admin/customers", Icon: UserRound },
    { label: "Payments", href: "/admin/payments", Icon: Banknote },
    { label: "Payouts", href: "/admin/payouts", Icon: WalletCards },
    { label: "Disputes", href: "/admin/disputes", Icon: AlertTriangle },
    { label: "Reports", href: "/admin/reports", Icon: BarChart3 },
    { label: "Notifications", href: "/admin/notifications", Icon: Bell },
    { label: "Audit log", href: "/admin/audit-log", Icon: ClipboardCheck },
    { label: "Settings", href: "/admin/settings", Icon: Settings },
  ];
  return (
    <div className="min-h-screen bg-muted text-foreground">
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-20 bg-foreground/35 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-border bg-card p-4 transition-[transform,width] duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} ${collapsed ? "lg:w-20" : ""}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Image
              src="/aurela-logo.png"
              alt="Aurela"
              width={42}
              height={42}
              className="rounded-xl"
            />
            <div className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="font-semibold">Aurela Admin</p>
              <p className="text-xs text-muted-foreground">
                Marketplace operations
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 lg:hidden"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="mt-6 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1">
            {links.map(({ label, href, Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === href
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? label : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium ${collapsed ? "lg:justify-center lg:px-0" : ""} ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className={collapsed ? "lg:hidden" : ""}>{label}</span>
                  {label === "Delivery reviews" && (
                    <span
                      className={`ml-auto rounded-full bg-destructive px-2 py-0.5 text-[10px] text-white ${collapsed ? "lg:hidden" : ""}`}
                    >
                      3
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3 rounded-2xl border border-border p-3 ${collapsed ? "lg:justify-center" : ""}`}
          >
            <Image
              src="/auth/men-2.jpg"
              alt="David Okoye"
              width={38}
              height={38}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className={`min-w-0 flex-1 ${collapsed ? "lg:hidden" : ""}`}>
              <p className="truncate text-sm font-medium">David Okoye</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Settings className={`h-4 w-4 ${collapsed ? "lg:hidden" : ""}`} />
          </Link>
        </div>
      </aside>
      <div
        className={`min-h-screen p-2 transition-[padding] duration-300 sm:p-4 ${collapsed ? "lg:pl-24" : "lg:pl-[18rem]"}`}
      >
        <div className="min-h-[calc(100vh-2rem)] rounded-4xl border border-border bg-background p-3 sm:p-5">
          <header className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setCollapsed((value) => !value)}
                className="hidden h-10 w-10 place-items-center rounded-full border border-border lg:grid"
              >
                {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>
              <div>
                <h1 className="text-2xl font-semibold">
                  Marketplace operations
                </h1>
                <p className="text-sm text-muted-foreground">
                  Live administrative control
                </p>
              </div>
            </div>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Admin
            </span>
          </header>
          <main className="pt-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
