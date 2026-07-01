import AccountSettings from "../_components/account-settings";

export default async function DashboardSettingsPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <AccountSettings />;
}
