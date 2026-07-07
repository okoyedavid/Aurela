"use client";

import { useState } from "react";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";
import {
  CountriesCard,
  EmptyComponentsCard,
  RevenueCard,
  SatisfactionCard,
  SegmentationCard,
  TeamCards,
} from "./dashboard-cards";
import AccountCards from "./account-cards";
import SellerWorkspace from "./seller-workspace";
import AccountProfile from "./account-profile";
import AccountSettings from "./account-settings";
import DashboardOrders from "./dashboard-orders";
import DashboardPurchases from "./dashboard-purchases";

type DashboardSection =
  | "overview"
  | "products"
  | "orders"
  | "pricing"
  | "inventory"
  | "purchases"
  | "wishlist"
  | "cart"
  | "notifications"
  | "profile"
  | "settings"
  | "order-detail";

export default function DashboardShell({
  mode = "account",
  section = "overview",
  orderId,
}: {
  mode?: "account" | "admin" | "seller";
  section?: DashboardSection;
  orderId?: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted text-foreground">
      <DashboardSidebar
        mode={mode}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
        <div className="flex-1 p-2 sm:p-4">
          <div className="min-h-[calc(100vh-1rem)] rounded-4xl border border-border bg-background p-2 sm:p-3">
            <DashboardHeader
              accountMode={mode === "account"}
              onOpenSidebar={() => setSidebarOpen(true)}
              title={
                mode === "admin"
                  ? "Aurela Administration"
                  : mode === "seller"
                    ? "Seller workspace"
                    : section === "profile"
                      ? "Your profile"
                      : section === "settings"
                        ? "Settings"
                        : section === "orders" || section === "order-detail"
                          ? "Your orders"
                          : "Welcome back, David"
              }
              subtitle={
                mode === "admin"
                  ? "Commerce, customers and platform performance"
                  : mode === "seller"
                    ? "Manage products, orders, pricing and stock"
                    : section === "profile"
                      ? "Personal details, access and active sessions"
                      : section === "settings"
                        ? "Security, communication and display preferences"
                        : "Orders, saved pieces and account activity"
              }
              badge={
                mode === "admin"
                  ? "Admin"
                  : mode === "seller"
                    ? "Seller"
                    : "Member"
              }
            />
            <div className="mt-2 flex flex-wrap content-start">
              {mode === "account" ? (
                section === "profile" ? (
                  <AccountProfile />
                ) : section === "settings" ? (
                  <AccountSettings />
                ) : section === "purchases" ? (
                  <DashboardPurchases />
                ) : section === "orders" || section === "order-detail" ? (
                  <DashboardOrders orderId={orderId} />
                ) : (
                  <AccountCards
                    section={
                      section as
                        | "overview"
                        | "wishlist"
                        | "cart"
                        | "notifications"
                    }
                  />
                )
              ) : mode === "seller" ? (
                <SellerWorkspace
                  section={
                    section as
                      | "overview"
                      | "products"
                      | "orders"
                      | "pricing"
                      | "inventory"
                  }
                />
              ) : (
                <>
                  <TeamCards />
                  <RevenueCard />
                  <CountriesCard />
                  <SegmentationCard />
                  <SatisfactionCard />
                  <EmptyComponentsCard />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
