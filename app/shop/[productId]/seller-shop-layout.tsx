"use client";

import {
  ArrowLeft,
  Banknote,
  Boxes,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  PackageCheck,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SellerShopLayout({
  shopId,
  children,
}: {
  shopId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const base = `/shop/${shopId}`;
  const links = [
    { label: "Overview", href: base, Icon: LayoutDashboard },
    { label: "Products", href: `${base}/products`, Icon: Boxes },
    { label: "Orders", href: `${base}/orders`, Icon: ShoppingBag },
    { label: "Purchases", href: `${base}/purchases`, Icon: Banknote },
    { label: "Delivery", href: `${base}/delivery`, Icon: Truck },
  ];
  return (
    <div className="min-h-screen bg-muted text-foreground">
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-foreground/35 lg:hidden"
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
              <p className="truncate font-semibold">Seller studio</p>
              <p className="truncate text-xs text-muted-foreground">
                {shopId.replaceAll("-", " ")}
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
          <Link
            href="/dashboard/shops"
            className={`mt-5 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-muted-foreground hover:bg-accent ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
            title="All shops"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>All shops</span>
          </Link>
          <nav className="mt-5 flex-1 space-y-2">
            {links.map(({ label, href, Icon }) => {
              const active = pathname === href;
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
                </Link>
              );
            })}
          </nav>
          <div
            className={`rounded-2xl bg-muted p-3 ${collapsed ? "lg:hidden" : ""}`}
          >
            <div className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4" />
              <span className="text-sm font-medium">10 open fulfilments</span>
            </div>
          </div>
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
                <h1 className="text-2xl font-semibold capitalize">
                  {shopId.replaceAll("-", " ")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Seller workspace
                </p>
              </div>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              Active shop
            </span>
          </header>
          <main className="pt-5">{children}</main>
        </div>
      </div>
    </div>
  );
}
