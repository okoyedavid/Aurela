export type TeamMember = {
  id: number;
  name: string;
  role: string;
  revenue: number;
  trend: "up" | "down";
  tasksCompleted: number;
  tasksTotal: number;
};

export type CountryMetric = {
  id: number;
  name: string;
  revenue: number;
  trend: "up" | "down";
};

export type AudienceSegment = {
  label: string;
  count: number;
  shade: string;
};

export type RevenuePoint = {
  month: string;
  revenue: number;
  target: number;
  orders: number;
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Esther Howard",
    role: "Sales Manager, USA",
    revenue: 3490,
    trend: "up",
    tasksCompleted: 3,
    tasksTotal: 5,
  },
  {
    id: 2,
    name: "Eleanor Pena",
    role: "Sales Manager, Europe",
    revenue: 590,
    trend: "down",
    tasksCompleted: 5,
    tasksTotal: 5,
  },
  {
    id: 3,
    name: "Robert Fox",
    role: "Sales Manager, Asia",
    revenue: 2600,
    trend: "up",
    tasksCompleted: 1,
    tasksTotal: 5,
  },
];

export const countryMetrics: CountryMetric[] = [
  { id: 1, name: "USA", trend: "up", revenue: 21942.83 },
  { id: 2, name: "Ireland", trend: "down", revenue: 19710 },
  { id: 3, name: "Ukraine", trend: "down", revenue: 12320.3 },
  { id: 4, name: "Sweden", trend: "up", revenue: 9725 },
];

export const audienceSegments: AudienceSegment[] = [
  { label: "Not Specified", count: 800, shade: "#111111" },
  { label: "Male", count: 441, shade: "#343434" },
  { label: "Female", count: 233, shade: "#5b5b5b" },
  { label: "Other", count: 126, shade: "#7a7a7a" },
];

export const revenueData: RevenuePoint[] = [
  { month: "Nov", revenue: 760, target: 980, orders: 112 },
  { month: "Dec", revenue: 1190, target: 1320, orders: 164 },
  { month: "Jan", revenue: 980, target: 1240, orders: 148 },
  { month: "Feb", revenue: 1430, target: 1510, orders: 201 },
  { month: "Mar", revenue: 1580, target: 1660, orders: 224 },
  { month: "Apr", revenue: 1730, target: 1690, orders: 260 },
  { month: "May", revenue: 1490, target: 1630, orders: 215 },
  { month: "Jun", revenue: 1850, target: 1910, orders: 284 },
  { month: "Jul", revenue: 2110, target: 2050, orders: 304 },
];
