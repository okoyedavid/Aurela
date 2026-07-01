"use client";

import { useState } from "react";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-muted text-foreground">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 bg-foreground/35 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <DashboardSidebar
        mode="account"
        open={sidebarOpen}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
      />
      <div
        className={`min-h-screen transition-[padding] duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}
      >
        <div className="min-h-screen p-2 sm:p-4">
          <div className="min-h-[calc(100vh-1rem)] rounded-[2rem] border border-border bg-background p-2 sm:p-3">
            <DashboardHeader
              onOpenSidebar={() => setSidebarOpen(true)}
              onToggleSidebarCollapse={() => setCollapsed((value) => !value)}
              sidebarCollapsed={collapsed}
            />
            <div className="mt-2 flex flex-wrap content-start">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
