"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Ellipsis,
  Plus,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  audienceSegments,
  countryMetrics,
  revenueData,
  teamMembers,
} from "./dashboard-data";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ value: number; payload: { orders: number } }>;
  label?: string;
};

function RevenueTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-3 text-sm text-white shadow-xl">
      <div className="font-semibold">{label}</div>
      <div className="mt-1 text-white/60">
        Revenue {formatCurrency(payload[0].value)}
      </div>
      <div className="text-white/60">{payload[0].payload.orders} orders</div>
    </div>
  );
}

export function TeamCards() {
  return (
    <>
      {teamMembers.map((member) => {
        const progress = (member.tasksCompleted / member.tasksTotal) * 100;
        const trendUp = member.trend === "up";

        return (
          <div key={member.id} className="w-full p-2 xl:w-1/3">
            <div className="flex h-full min-h-36 justify-between rounded-3xl border border-white/10 bg-[#121212] p-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {member.name}
                    </div>
                    <div className="text-sm text-white/45">{member.role}</div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-white/55">
                  {member.tasksCompleted} from {member.tasksTotal} tasks
                  completed
                </div>
                <div className="mt-3 h-2 max-w-[220px] rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 text-right">
                <div
                  className={`inline-flex rounded-full border px-2 py-1 ${
                    trendUp
                      ? "border-white/15 text-white"
                      : "border-white/10 text-white/55"
                  }`}
                >
                  {trendUp ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
                <div className="text-lg font-semibold text-white">
                  {formatCurrency(member.revenue)}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/35">
                  Last 6 months
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function RevenueCard() {
  return (
    <div className="w-full p-2 xl:w-2/3">
      <div className="h-80 rounded-3xl border border-white/10 bg-[#121212] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Revenue Summary</div>
            <div className="mt-1 text-sm text-white/45">Nov - Jul</div>
          </div>
          <div className="text-sm uppercase tracking-[0.2em] text-white/35">
            Last 9 months
          </div>
        </div>

        <div className="mt-6 h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid vertical={false} stroke="#242424" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8b8b8b", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8b8b8b", fontSize: 12 }}
              />
              <Tooltip content={<RevenueTooltip />} cursor={false} />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#4c4c4c"
                strokeDasharray="6 6"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ffffff"
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export function CountriesCard() {
  return (
    <div className="w-full p-2 xl:w-1/3">
      <div className="h-80 rounded-3xl border border-white/10 bg-[#121212] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Top Countries</div>
            <div className="mt-1 text-sm text-white/45">Favourites</div>
          </div>
          <Plus className="h-4 w-4 text-white/45" />
        </div>

        <div className="mt-5 space-y-4">
          {countryMetrics.map((country) => {
            const trendUp = country.trend === "up";

            return (
              <div key={country.id} className="flex items-center gap-3">
                <div className="w-5 text-sm text-white/35">{country.id}</div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
                  {country.name.slice(0, 2)}
                </div>
                <div className="flex-1 text-sm text-white">{country.name}</div>
                <div className="text-sm text-white/80">
                  {formatCurrency(country.revenue)}
                </div>
                {trendUp ? (
                  <ArrowUpRight className="h-4 w-4 text-white" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-white/45" />
                )}
                <Ellipsis className="h-4 w-4 text-white/35" />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="mt-8 inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
        >
          Check all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function SegmentationCard() {
  const total = audienceSegments.reduce(
    (sum, segment) => sum + segment.count,
    0,
  );

  return (
    <div className="w-full p-2 xl:w-1/3">
      <div className="h-80 rounded-3xl border border-white/10 bg-[#121212] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Segmentation</div>
            <div className="mt-1 text-sm text-white/45">All users</div>
          </div>
          <Ellipsis className="h-4 w-4 text-white/35" />
        </div>

        <div className="mt-6 space-y-4">
          {audienceSegments.map((segment) => {
            const width = `${(segment.count / total) * 100}%`;
            return (
              <div key={segment.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-white/70">{segment.label}</div>
                  <div className="text-white">{segment.count}</div>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width, backgroundColor: segment.shade }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white hover:text-black"
        >
          Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function SatisfactionCard() {
  return (
    <div className="w-full p-2 xl:w-1/3">
      <div className="h-80 rounded-3xl border border-white/10 bg-[#121212] p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-white">Satisfaction</div>
            <div className="mt-1 text-sm text-white/45">From all projects</div>
          </div>
          <Ellipsis className="h-4 w-4 text-white/35" />
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[18px] border-white/10">
            <div
              className="absolute inset-0 rounded-full border-[18px] border-transparent border-t-white border-r-white"
              style={{ transform: "rotate(30deg)" }}
            />
            <div className="text-center">
              <div className="text-3xl font-semibold text-white">97.8%</div>
              <div className="mt-1 text-sm text-white/45">Based on likes</div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/35">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

export function EmptyComponentsCard() {
  return (
    <div className="w-full p-2 xl:w-1/3">
      <div className="flex h-80 flex-col rounded-3xl border border-white/10 bg-[#121212]">
        <div className="h-24 rounded-t-3xl bg-[#1a1a1a]" />
        <div className="-mt-10 flex flex-1 flex-col items-center px-6 pb-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-black">
            <Plus className="h-8 w-8" />
          </div>
          <div className="mt-5 text-lg font-semibold text-white">
            No Components Created Yet
          </div>
          <div className="mt-2 text-sm leading-6 text-white/45">
            Create your first component to start organizing and reusing modules
            across the dashboard.
          </div>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#efefef]"
          >
            <Plus className="h-4 w-4" />
            Add Component
            <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
              129
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
