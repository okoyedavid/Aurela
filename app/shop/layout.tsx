import DashboardThemeProvider from "@/components/dashboard/DashboardThemeProvider";

export default function ShopLayout({ children }: { children: React.ReactNode }) { return <DashboardThemeProvider>{children}</DashboardThemeProvider>; }
