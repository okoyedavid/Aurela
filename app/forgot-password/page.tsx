"use client";
import AuthStatusShell from "@/components/auth/AuthStatusShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <AuthStatusShell
      eyebrow="Account recovery"
      title={sent ? "Check your inbox." : "Reset your password."}
      description={
        sent
          ? `If an Aurela account exists for ${email}, reset instructions have been sent.`
          : "Enter the email associated with your account. For privacy, the response is the same whether or not an account exists."
      }
    >
      {sent ? (
        <div className="rounded-2xl bg-muted p-6">
          <Check className="h-6 w-6" />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            The demonstration does not send email yet. Production delivery
            requires a transactional email provider and expiring server token.
          </p>
          <Button
            variant="outline"
            className="mt-5 rounded-full"
            onClick={() => setSent(false)}
          >
            Use another email
          </Button>
        </div>
      ) : (
        <form onSubmit={submit}>
          <label className="text-xs uppercase tracking-[.18em] text-muted-foreground">
            Email address
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-12 rounded-xl pl-11"
              />
            </div>
          </label>
          <Button type="submit" className="mt-6 h-12 w-full rounded-full">
            Send reset instructions
          </Button>
        </form>
      )}
    </AuthStatusShell>
  );
}
