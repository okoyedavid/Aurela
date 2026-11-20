import SupportPage from "@/components/support/support-page";
import { PackageCheck, Plane, RotateCcw, Truck } from "lucide-react";

const stages = [
  {
    title: "Seller preparation",
    copy: "The seller confirms inventory, checks the item and prepares secure packaging.",
    Icon: PackageCheck,
  },
  {
    title: "Carrier network",
    copy: "Transport may use road, regional hubs or air depending on origin and destination.",
    Icon: Plane,
  },
  {
    title: "Final mile",
    copy: "A local carrier receives the parcel and provides the most precise delivery updates.",
    Icon: Truck,
  },
];
export default function ShippingReturnsPage() {
  return (
    <SupportPage
      title="Shipping, cancellations and returns."
      description="A clear overview of how orders move through a multi-seller marketplace and what to do when plans change."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {stages.map(({ title, copy, Icon }) => (
          <div
            key={title}
            className="rounded-[1.75rem] border border-border bg-card p-6"
          >
            <Icon className="h-6 w-6" />
            <h2 className="mt-8 text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {copy}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 space-y-10">
        <Policy
          title="Delivery estimates"
          text="Delivery estimates begin after seller handling and may differ across items in one order. Weather, customs, remote destinations and carrier disruption can affect arrival times. Verified tracking events should explain meaningful changes."
        />
        <Policy
          title="Cancellations"
          text="A cancellation request is most likely to succeed before seller preparation or carrier handoff. Once fulfilment starts, the order may need to arrive and follow the return process instead."
        />
        <Policy
          title="Returns"
          text="Items should generally be unused, in their original condition and returned with packaging and labels. Hygiene-sensitive, personalised, final-sale or regulated products may have different eligibility where law permits."
        />
        <Policy
          title="Refunds"
          text="Refunds should be issued to the original payment method after eligibility and item condition are confirmed. Bank and provider processing time may continue after Aurela marks a refund as issued."
        />
      </div>
      <div className="mt-12 flex items-center gap-5 rounded-4xl bg-muted p-7">
        <RotateCcw className="h-7 w-7 shrink-0" />
        <p className="text-sm leading-7 text-muted-foreground">
          The final policy shown during checkout and any mandatory consumer law
          take priority over this generic pre-launch guidance.
        </p>
      </div>
    </SupportPage>
  );
}
function Policy({ title, text }: { title: string; text: string }) {
  return (
    <section className="grid gap-3 border-t border-border pt-7 sm:grid-cols-[220px_1fr]">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="leading-7 text-muted-foreground">{text}</p>
    </section>
  );
}
