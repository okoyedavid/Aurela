"use client";

import clsx from "clsx";
import {
  BarChart3,
  Bell,
  ClipboardList,
  LayoutDashboard,
  Heart,
  ShoppingCart,
  Settings,
  Users,
  X,
  Boxes,
  CircleDollarSign,
  Package,
  ReceiptText,
  Store,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuGroups = [
  [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 6 },
    { id: "team", label: "Team", icon: Users },
  ],
  [
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "reports", label: "Reports", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ],
];

const accountMenuGroups = [
  [
    {
      id: "dashboard",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "purchases",
      label: "Purchases",
      icon: ReceiptText,
      href: "/dashboard/purchases",
    },
    {
      id: "orders",
      label: "Orders & delivery",
      icon: ClipboardList,
      href: "/dashboard/orders",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      href: "/dashboard/wishlist",
    },
    { id: "cart", label: "Cart", icon: ShoppingCart, href: "/dashboard/cart" },
    { id: "shops", label: "My shops", icon: Store, href: "/dashboard/shops" },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/notifications",
    },
  ],
  [
    {
      id: "profile",
      label: "Profile",
      icon: Users,
      href: "/dashboard/profile",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ],
];

const sellerMenuGroups = [
  [
    { id: "shop", label: "Overview", icon: Store, href: "/shop" },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/shop/products",
    },
    { id: "orders", label: "Orders", icon: ReceiptText, href: "/shop/orders" },
    {
      id: "pricing",
      label: "Pricing",
      icon: CircleDollarSign,
      href: "/shop/pricing",
    },
    { id: "inventory", label: "Stock", icon: Boxes, href: "/shop/inventory" },
  ],
];

export default function DashboardSidebar({
  open,
  onClose,
  mode,
  collapsed = false,
}: {
  open: boolean;
  onClose: () => void;
  mode: "account" | "admin" | "seller";
  collapsed?: boolean;
}) {
  const [selected, setSelected] = useState("dashboard");
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-30 w-72 border-r border-border bg-card text-card-foreground transition-[transform,width] duration-300 lg:translate-x-0",
        collapsed && "lg:w-20",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Image
            src="/aurela-logo.png"
            alt="Aurela"
            width={44}
            height={44}
            className="rounded-2xl"
            priority
          />
          <div className={clsx("flex-1", collapsed && "lg:hidden")}>
            <div className="text-lg font-semibold">Aurela.</div>
            <div className="text-sm text-muted-foreground">
              {mode === "admin"
                ? "Platform administration"
                : mode === "seller"
                  ? "Seller operations"
                  : "Personal account"}
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/10 p-2 lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-6 overflow-auto">
          {(mode === "admin"
            ? menuGroups
            : mode === "seller"
              ? sellerMenuGroups
              : accountMenuGroups
          ).map((group, index) => (
            <div key={index} className="space-y-2">
              {index > 0 && (
                <div
                  className={clsx(
                    "px-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground",
                    collapsed && "lg:hidden",
                  )}
                >
                  Shortcuts
                </div>
              )}
              {group.map((item) => {
                const { id, label, icon: Icon } = item;
                const badge =
                  "badge" in item && typeof item.badge === "number"
                    ? item.badge
                    : undefined;
                const href =
                  "href" in item && typeof item.href === "string"
                    ? item.href
                    : undefined;
                const active = href ? pathname === href : selected === id;
                if (href)
                  return (
                    <Link
                      key={id}
                      href={href}
                      title={collapsed ? label : undefined}
                      onClick={onClose}
                      className={clsx(
                        "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                        collapsed && "lg:justify-center lg:px-0",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span
                        className={clsx(
                          "flex-1 text-sm font-medium",
                          collapsed && "lg:hidden",
                        )}
                      >
                        {label}
                      </span>
                    </Link>
                  );
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    className={clsx(
                      "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-sm font-medium">{label}</span>
                    {badge ? (
                      <span
                        className={clsx(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          active
                            ? "bg-primary-foreground text-primary"
                            : "bg-primary text-primary-foreground",
                        )}
                      >
                        {badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <Link
          href={
            mode === "account"
              ? "/dashboard/profile"
              : mode === "seller"
                ? "/shop"
                : "/admin"
          }
          onClick={onClose}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-border px-3 py-3 transition hover:bg-accent"
        >
          <Image
            src="/auth/men-2.jpg"
            alt="David Okoye"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className={clsx("flex-1", collapsed && "lg:hidden")}>
            <div className="font-medium">David Okoye</div>
            <div className="text-sm text-muted-foreground">
              {mode === "admin"
                ? "Administrator"
                : mode === "seller"
                  ? "Seller"
                  : "Customer"}
            </div>
          </div>
          <Settings
            className={clsx(
              "h-4 w-4 text-muted-foreground",
              collapsed && "lg:hidden",
            )}
          />
        </Link>
      </div>
    </aside>
  );
}
