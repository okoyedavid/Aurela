import DashboardOrders from "../_components/dashboard-orders";

export default async function DashboardOrdersPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <DashboardOrders />;
}
