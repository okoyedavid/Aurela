import DashboardThemeProvider from "@/components/dashboard/dashboard-theme-provider";
import CustomerDashboardLayout from "./_components/customer-dashboard-layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardThemeProvider>
      <CustomerDashboardLayout>{children}</CustomerDashboardLayout>
    </DashboardThemeProvider>
  );
}
