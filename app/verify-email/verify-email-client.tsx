"use client";
import AuthStatusShell from "@/components/auth/auth-status-shell";
import { Button } from "@/components/ui/button";
import { Check, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VerifyEmailClient({ token, email }: { token?: string; email?: string }) { const [resent, setResent] = useState(false); const verified = !!token; return <AuthStatusShell eyebrow="Email verification" title={verified ? "Email verified." : "Verify your email."} description={verified ? "Your email address has been confirmed and your Aurela account can continue." : `Open the verification link sent to ${email ?? "your email address"}.`} >{verified ? <div><span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-5 w-5" /></span><Button asChild className="mt-7 rounded-full px-7"><Link href="/dashboard">Continue to your account</Link></Button></div> : <div className="rounded-2xl bg-muted p-6"><Mail className="h-6 w-6" /><p className="mt-4 text-sm leading-6 text-muted-foreground">Didn’t receive it? Check spam or request another verification email.</p><Button variant="outline" disabled={resent} onClick={() => setResent(true)} className="mt-5 rounded-full">{resent ? "Verification email requested" : "Resend verification email"}</Button></div>}</AuthStatusShell>; }
