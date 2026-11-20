"use client";
import AuthStatusShell from "@/components/auth/auth-status-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ResetPasswordForm({ token }: { token?: string }) {
  const [complete, setComplete] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const mismatch = !!confirm && password !== confirm;
  if (!token)
    return (
      <AuthStatusShell
        eyebrow="Invalid reset link"
        title="This link cannot be used."
        description="The reset token is missing or may have expired."
      >
        <Button asChild className="rounded-full">
          <Link href="/forgot-password">Request another link</Link>
        </Button>
      </AuthStatusShell>
    );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!mismatch && password.length >= 8) setComplete(true);
  };
  return (
    <AuthStatusShell
      eyebrow="Secure password reset"
      title={complete ? "Password updated." : "Choose a new password."}
      description={
        complete
          ? "Your demonstration password has been accepted. A production implementation will revoke existing reset tokens and optionally other sessions."
          : "Use at least eight characters and avoid passwords used on other services."
      }
    >
      {complete ? (
        <Button asChild className="rounded-full px-7">
          <Link href="/login">Return to sign in</Link>
        </Button>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <Field label="New password" value={password} onChange={setPassword} />
          <Field
            label="Confirm password"
            value={confirm}
            onChange={setConfirm}
          />
          {mismatch && (
            <p role="alert" className="text-sm text-destructive">
              Passwords do not match.
            </p>
          )}
          <Button
            type="submit"
            disabled={password.length < 8 || mismatch}
            className="h-12 w-full rounded-full"
          >
            Update password
          </Button>
        </form>
      )}
    </AuthStatusShell>
  );
}
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-xs uppercase tracking-[.18em] text-muted-foreground">
      {label}
      <Input
        required
        minLength={8}
        type="password"
        autoComplete="new-password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 rounded-xl"
      />
    </label>
  );
}
