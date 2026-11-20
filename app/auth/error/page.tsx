import AuthStatusShell from "@/components/auth/auth-status-shell";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const messages: Record<string, string> = { OAuthSignin: "The identity provider could not begin sign-in.", OAuthCallback: "The provider response could not be verified.", AccessDenied: "Access was denied or the account is not permitted to sign in.", Verification: "The verification link is invalid or expired." };
export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) { const { error = "Unknown" } = await searchParams; return <AuthStatusShell eyebrow="Authentication error" title="We couldn’t sign you in." description={messages[error] ?? "An unexpected authentication error occurred. No account changes were made."}><div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6"><AlertCircle className="h-6 w-6 text-destructive" /><p className="mt-4 text-sm text-muted-foreground">Reference: {error}</p></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Button asChild className="rounded-full px-7"><Link href="/login">Try again</Link></Button><Button asChild variant="outline" className="rounded-full px-7"><Link href="/forgot-password">Recover account</Link></Button></div></AuthStatusShell>; }
