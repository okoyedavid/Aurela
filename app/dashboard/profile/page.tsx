import AccountProfile from "../_components/account-profile";

export default async function DashboardProfilePage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <AccountProfile />;
}
