import DashboardThemeProvider from "@/components/dashboard/dashboard-theme-provider";
import AdminDashboardLayout from "./_components/admin-dashboard-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardThemeProvider>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </DashboardThemeProvider>
  );
}
