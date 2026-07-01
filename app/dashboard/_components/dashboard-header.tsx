"use client";

import { accountNotifications } from "./account-data";
import { Bell, Crown, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DashboardHeader({
  onOpenSidebar,
  onToggleSidebarCollapse,
  sidebarCollapsed = false,
  title = "Hello David",
  subtitle = "Your Aurela account at a glance",
  badge = "Member",
  accountMode = true,
}: {
  onOpenSidebar: () => void;
  onToggleSidebarCollapse?: () => void;
  sidebarCollapsed?: boolean;
  title?: string;
  subtitle?: string;
  badge?: string;
  accountMode?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {onToggleSidebarCollapse && (
            <button
              type="button"
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={onToggleSidebarCollapse}
              className="mt-0.5 hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition hover:bg-accent lg:grid"
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                {title}
              </h1>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                <Crown className="h-3.5 w-3.5" />
                {badge}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Open sidebar"
          className="rounded-full border border-border p-3 text-foreground lg:hidden"
          onClick={onOpenSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {accountMode && (
        <div className="flex items-center justify-end gap-2" ref={menuRef}>
          <div className="relative">
            <button
              type="button"
              aria-label="Open notifications"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition hover:bg-accent"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                6
              </span>
            </button>
            {open && (
              <div className="fixed left-3 right-3 top-20 z-40 overflow-hidden rounded-3xl border border-border bg-popover text-popover-foreground shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-[22rem]">
                <div className="flex items-center justify-between border-b border-border p-5">
                  <h2 className="font-semibold">Recent notifications</h2>
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setOpen(false)}
                    className="text-xs font-medium text-muted-foreground"
                  >
                    View all
                  </Link>
                </div>
                <div className="max-h-[min(28rem,calc(100vh-7rem))] divide-y divide-border overflow-auto">
                  {accountNotifications.map((notice, index) => (
                    <div
                      key={notice.title}
                      className={`${index >= 5 ? "hidden sm:block" : ""} p-4`}
                    >
                      <p className="text-sm font-medium">{notice.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {notice.detail}
                      </p>
                      <span className="mt-2 block text-[11px] text-muted-foreground">
                        {notice.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 rounded-full border border-border bg-card p-1.5 pr-4 transition hover:bg-accent"
          >
            <Image
              src="/auth/men-2.jpg"
              alt="David Okoye"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium">David Okoye</span>
              <span className="block text-xs text-muted-foreground">
                Customer
              </span>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
