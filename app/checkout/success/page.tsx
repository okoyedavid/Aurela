import { Button } from "@/components/ui/button";
import { ArrowRight, Check, PackageCheck } from "lucide-react";
import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; total?: string }>;
}) {
  const { order = "AR-PENDING", total } = await searchParams;
  return (
    <main className="min-h-[calc(100dvh-64px)] bg-muted px-3 py-10 sm:px-5 lg:px-6">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-4xl bg-card text-card-foreground lg:min-h-[660px] lg:grid-cols-[1fr_.8fr] lg:rounded-[2.5rem]">
        <section className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-6 w-6" />
          </span>
          <p className="mt-10 text-xs uppercase tracking-[.28em] text-muted-foreground">
            Order received
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[.92] tracking-[-.055em] sm:text-7xl">
            Thank you for choosing Aurela.
          </h1>
          <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
            Your demonstration order has been created. In the production
            platform, a receipt and delivery updates will be sent to your email.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full px-7">
              <Link href="/dashboard">
                View purchases <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full px-7"
            >
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </section>
        <aside className="bg-primary p-7 text-primary-foreground sm:p-10 lg:p-12">
          <PackageCheck className="h-9 w-9" />
          <h2 className="mt-10 text-2xl font-semibold">Order summary</h2>
          <dl className="mt-7 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
            <Row label="Reference" value={order} />
            <Row label="Status" value="Received" />
            {total && <Row label="Total" value={`$${total}`} />}
            <Row label="Delivery" value="Calculated at checkout" />
            <Row label="Payment" value="Demonstration only" />
          </dl>
          <p className="mt-8 text-sm leading-6 text-primary-foreground/55">
            Keep reference{" "}
            <strong className="text-primary-foreground">{order}</strong> for
            future support enquiries.
          </p>
        </aside>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-5 py-4 text-sm">
      <dt className="text-primary-foreground/50">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
