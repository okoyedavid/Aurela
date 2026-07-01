import DashboardOrders from "../../_components/dashboard-orders";

export default async function DashboardOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { orderId } = await params;
  return <DashboardOrders orderId={orderId} />;
}
