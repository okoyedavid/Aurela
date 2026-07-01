"use client";

import ThemeToggle from "@/components/dashboard/ThemeToggle";
import { Bell, KeyRound, LogOut, Mail, Palette, Save } from "lucide-react";
import Link from "./logout-dialog";

export default function AccountSettings() {
  return (
    <div className="grid w-full gap-5 p-2 xl:grid-cols-2">
      <SettingCard
        Icon={Mail}
        title="Email address"
        copy="Change the address used for receipts and account recovery."
      >
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input
            type="email"
            defaultValue="david@example.com"
            className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none"
          />
        </label>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Save className="h-4 w-4" /> Update email
        </button>
      </SettingCard>
      <SettingCard
        Icon={KeyRound}
        title="Change password"
        copy="Use at least eight characters and avoid passwords used elsewhere."
      >
        <div className="grid gap-3">
          <Password label="Current password" />
          <Password label="New password" />
          <Password label="Confirm new password" />
        </div>
        <button className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          Change password
        </button>
      </SettingCard>
      <SettingCard
        Icon={Bell}
        title="Notification preferences"
        copy="Choose which account updates Aurela sends you."
      >
        <div className="space-y-3">
          <Toggle label="Order and delivery updates" defaultChecked />
          <Toggle label="Wishlist price and stock alerts" defaultChecked />
          <Toggle label="Editorial and collection updates" />
          <Toggle label="Seller messages" defaultChecked />
        </div>
      </SettingCard>
      <SettingCard
        Icon={Palette}
        title="Appearance"
        copy="This preference applies to dashboard, seller and admin areas."
      >
        <div className="flex items-center justify-between rounded-2xl bg-muted p-4">
          <div>
            <p className="font-medium">Colour theme</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Light, dark or system
            </p>
          </div>
          <ThemeToggle />
        </div>
      </SettingCard>
      <div className="rounded-3xl border border-destructive/25 bg-card p-6 sm:p-8 xl:col-span-2">
        <h2 className="text-xl font-semibold">Account access</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          End this session on the current device.
        </p>
        <Link
          href="/login"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-destructive/30 px-6 py-3 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Log out
        </Link>
      </div>
    </div>
  );
}

function SettingCard({
  Icon,
  title,
  copy,
  children,
}: {
  Icon: typeof Mail;
  title: string;
  copy: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
      <div className="flex gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
function Password({ label }: { label: string }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        type="password"
        className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none"
      />
    </label>
  );
}
function Toggle({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-4">
      <span className="text-sm font-medium">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-5 accent-foreground"
      />
    </label>
  );
}
