import AccountCards from "../_components/account-cards";

export default async function DashboardNotificationsPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <AccountCards section="notifications" />;
}
