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

export default function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#080808] text-[#f4f4f4]">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-0">
        <div className="flex-1 p-2 sm:p-4">
          <div className="min-h-[calc(100vh-1rem)] rounded-[2rem] border border-white/8 bg-[#0b0b0b] p-2 sm:p-3">
            <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />
            <div className="mt-2 flex flex-wrap content-start">
              <TeamCards />
              <RevenueCard />
              <CountriesCard />
              <SegmentationCard />
              <SatisfactionCard />
              <EmptyComponentsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
