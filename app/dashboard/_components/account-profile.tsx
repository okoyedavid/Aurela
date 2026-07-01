"use client";

import { Camera, LogOut, Monitor, ShieldCheck, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "./logout-dialog";
import { useState } from "react";

export default function AccountProfile() {
  const [preview, setPreview] = useState("/auth/men-2.jpg");
  return (
    <div className="grid w-full gap-5 p-2 xl:grid-cols-[1.1fr_.9fr]">
      <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Personal information</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Update how your name and photo appear across Aurela.
        </p>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative h-28 w-28 overflow-hidden rounded-full bg-muted">
            <Image
              src={preview}
              alt="David Okoye"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium">
              <Camera className="h-4 w-4" /> Change photo
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
            <p className="mt-2 text-xs text-muted-foreground">
              JPG, PNG or WebP. Maximum 5 MB.
            </p>
          </div>
        </div>
        <form
          className="mt-8 grid gap-5 sm:grid-cols-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field label="First name" defaultValue="David" />
          <Field label="Last name" defaultValue="Okoye" />
          <Field label="Display name" defaultValue="David Okoye" wide />
          <button className="w-fit rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Save profile
          </button>
        </form>
      </section>
      <div className="space-y-5">
        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Authentication</h2>
          </div>
          <div className="mt-6 rounded-2xl bg-muted p-4">
            <p className="font-medium">Logged in at 1 July 2026, 10:42</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Password and Google sign-in enabled
            </p>
          </div>
        </section>
        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold">Session details</h2>
          <div className="mt-5 space-y-4">
            <Session
              Icon={Monitor}
              title="Chrome on Windows"
              detail="Lagos, Nigeria · Current session"
            />
            <Session
              Icon={Smartphone}
              title="Mobile browser"
              detail="Lagos, Nigeria · 28 June 2026"
            />
          </div>
        </section>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 rounded-full border border-destructive/30 px-6 py-3 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Log out
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  wide = false,
}: {
  label: string;
  defaultValue: string;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "sm:col-span-2" : ""}>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        defaultValue={defaultValue}
        className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none focus:border-ring"
      />
    </label>
  );
}
function Session({
  Icon,
  title,
  detail,
}: {
  Icon: typeof Monitor;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
