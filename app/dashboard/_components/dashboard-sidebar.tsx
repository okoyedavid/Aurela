"use client";

import clsx from "clsx";
import {
  BarChart3,
  Bell,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const menuGroups = [
  [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "chat", label: "Chat", icon: MessageSquare, badge: 6 },
    { id: "team", label: "Team", icon: Users },
  ],
  [
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "reports", label: "Reports", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ],
];

export default function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState("dashboard");

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-30 w-72 border-r border-white/10 bg-[#0d0d0d] text-[#f5f5f5] transition-transform lg:sticky lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">Dashboard</div>
            <div className="text-sm text-white/50">Operations overview</div>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/10 p-2 lg:hidden"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 rounded-3xl border border-white/10 bg-[#151515] p-4">
          <div className="text-sm font-medium text-white/60">Workspace</div>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <div className="font-semibold">Sales House</div>
              <div className="text-sm text-white/50">General item team</div>
            </div>
            <ChevronRight className="h-4 w-4 text-white/50" />
          </div>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-6 overflow-auto">
          {menuGroups.map((group, index) => (
            <div key={index} className="space-y-2">
              {index > 0 && (
                <div className="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
                  Shortcuts
                </div>
              )}
              {group.map(({ id, label, icon: Icon, badge }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  className={clsx(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition",
                    selected === id
                      ? "bg-white text-black"
                      : "text-white/70 hover:bg-white/6 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-sm font-medium">{label}</span>
                  {badge ? (
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        selected === id
                          ? "bg-black text-white"
                          : "bg-white text-black",
                      )}
                    >
                      {badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="rounded-3xl border border-white/10 bg-[#151515] p-4">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Used Space</span>
            <span>77%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div className="h-full w-[77%] rounded-full bg-white" />
          </div>
          <div className="mt-3 text-xs leading-5 text-white/45">
            Admin updated usage at 09:12 am. You are close to your current
            storage threshold.
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
            JW
          </div>
          <div className="flex-1">
            <div className="font-medium">Jerry Wilson</div>
            <div className="text-sm text-white/45">Admin</div>
          </div>
          <Settings className="h-4 w-4 text-white/40" />
        </div>
      </div>
    </aside>
  );
}
