import VerifyEmailClient from "./VerifyEmailClient";
export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string; email?: string }> }) { const params = await searchParams; return <VerifyEmailClient token={params.token} email={params.email} />; }
