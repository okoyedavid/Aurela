import AccountCards from "./_components/account-cards";

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <AccountCards />;
}
