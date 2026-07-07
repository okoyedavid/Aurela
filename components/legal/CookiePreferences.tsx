"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);
  const save = () => {
    localStorage.setItem(
      "aurela-cookie-preferences",
      JSON.stringify({
        necessary: true,
        analytics,
        marketing,
        updatedAt: new Date().toISOString(),
      }),
    );
    setSaved(true);
  };
  return (
    <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
        Your preferences
      </p>
      <h2 className="mt-3 text-2xl font-semibold">Choose optional cookies</h2>
      <div className="mt-6 divide-y divide-border">
        <Toggle
          label="Necessary"
          detail="Required for security, authentication, cart and core site operation."
          checked
          disabled
          onChange={() => undefined}
        />
        <Toggle
          label="Analytics"
          detail="Helps Aurela understand performance and improve customer journeys."
          checked={analytics}
          onChange={setAnalytics}
        />
        <Toggle
          label="Marketing"
          detail="Supports campaign measurement and relevant advertising where permitted."
          checked={marketing}
          onChange={setMarketing}
        />
      </div>
      <Button onClick={save} className="mt-6 rounded-full px-7">
        {saved ? "Preferences saved" : "Save preferences"}
      </Button>
    </section>
  );
}
function Toggle({
  label,
  detail,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  detail: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-5 py-5">
      <span className="min-w-0 flex-1">
        <strong className="block">{label}</strong>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
          {detail}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-primary"
      />
    </label>
  );
}
