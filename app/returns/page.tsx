"use client";
import SupportPage from "@/components/support/SupportPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, PackageOpen } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ReturnsPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <SupportPage
      title="Start or inspect a return."
      description="The entry point is public so guests can understand eligibility. Creating or viewing a real return should require order verification and, where available, account authentication."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {submitted ? (
          <section className="rounded-4xl border border-border bg-card p-8">
            <Check className="h-8 w-8" />
            <h2 className="mt-7 text-3xl font-semibold">
              Return request prepared.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              No return was created because the backend is not connected.
              Production should verify the order, display eligible lines and
              issue a dated return reference.
            </p>
            <Button
              className="mt-7 rounded-full"
              onClick={() => setSubmitted(false)}
            >
              Start again
            </Button>
          </section>
        ) : (
          <form
            onSubmit={submit}
            className="space-y-5 rounded-4xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Order reference" placeholder="AR-12345678" />
              <Field
                label="Order email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <label className="block text-sm font-medium">
              Reason
              <select
                required
                className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4"
              >
                <option value="">Choose a reason</option>
                <option>Size or fit</option>
                <option>Changed my mind</option>
                <option>Incorrect item</option>
                <option>Damaged or defective</option>
                <option>Item not as described</option>
              </select>
            </label>
            <label className="block text-sm font-medium">
              Additional details
              <textarea
                rows={5}
                className="mt-2 w-full rounded-xl border border-border bg-background p-4"
                placeholder="Tell us about the item and its current condition."
              />
            </label>
            <Button type="submit" className="h-12 rounded-full px-7">
              Check return eligibility
            </Button>
          </form>
        )}
        <aside className="h-fit rounded-4xl bg-primary dark:bg-muted p-7 text-scrim-foreground">
          <PackageOpen className="h-7 w-7" />
          <h2 className="mt-8 text-2xl font-semibold">Before you begin</h2>
          <ul className="mt-5 space-y-4 text-sm leading-6 text-scrim-foreground/65">
            <li>Keep labels and original packaging where possible.</li>
            <li>Do not send an item before receiving return instructions.</li>
            <li>Photograph damage, incorrect items and packaging.</li>
            <li>
              Review{" "}
              <Link
                href="/shipping-returns"
                className="text-scrim-foreground underline underline-offset-4"
              >
                shipping and return guidance
              </Link>
              .
            </li>
          </ul>
        </aside>
      </div>
    </SupportPage>
  );
}
function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <Input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 h-12 rounded-xl"
      />
    </label>
  );
}
