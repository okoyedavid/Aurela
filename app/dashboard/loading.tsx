export default function DashboardLoading() {
  return <div className="w-full animate-pulse p-2"><div className="grid gap-4 md:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-36 rounded-3xl bg-muted" />)}</div><div className="mt-4 grid gap-4 lg:grid-cols-2"><div className="h-80 rounded-3xl bg-muted" /><div className="h-80 rounded-3xl bg-muted" /></div></div>;
}
