import DashboardPurchases from "../_components/dashboard-purchases";

export default async function DashboardPurchasesPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <DashboardPurchases />;
}
