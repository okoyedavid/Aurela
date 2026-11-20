import DashboardThemeProvider from "@/components/dashboard/dashboard-theme-provider";

export default function ShopLayout({ children }: { children: React.ReactNode }) { return <DashboardThemeProvider>{children}</DashboardThemeProvider>; }
