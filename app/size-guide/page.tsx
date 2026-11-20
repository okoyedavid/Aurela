import SupportPage from "@/components/support/support-page";
import { Ruler, Shirt, Footprints, Info } from "lucide-react";

const tips = [
  "Measure over close-fitting clothing or underwear, not bulky layers.",
  "Keep the tape comfortably level and firm without pulling it tight.",
  "Ask someone to help where possible; posture changes measurements.",
  "Record centimetres and inches so seller charts are easier to compare.",
  "If you fall between sizes, consider the stated fit and fabric stretch before sizing up or down.",
];
export default function SizeGuidePage() {
  return (
    <SupportPage
      title="Find your size at home."
      description="A measuring tape, a few quiet minutes and the seller’s product chart are usually enough. Always prioritise measurements on the individual listing because sizing varies between sellers."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Measure
          title="Clothing"
          icon={Shirt}
          items={[
            [
              "Chest or bust",
              "Measure around the fullest point, keeping the tape level across your back.",
            ],
            [
              "Waist",
              "Measure around your natural waist, usually the narrowest point above the navel.",
            ],
            [
              "Hips",
              "Stand with feet together and measure around the fullest part of your hips.",
            ],
            [
              "Inseam",
              "Measure from the crotch seam to the desired trouser hem along the inside leg.",
            ],
          ]}
        />
        <Measure
          title="Footwear"
          icon={Footprints}
          items={[
            [
              "Prepare",
              "Place a sheet of paper against a wall and wear the socks intended for the shoe.",
            ],
            [
              "Trace",
              "Stand with your heel lightly against the wall and mark the longest toe.",
            ],
            [
              "Measure",
              "Measure both feet from wall to toe and use the larger measurement.",
            ],
            [
              "Compare",
              "Use the seller’s centimetre measurement rather than relying only on regional size conversion.",
            ],
          ]}
        />
      </div>
      <section className="mt-8 rounded-4xl bg-primary dark:bg-muted p-7 text-scrim-foreground sm:p-10">
        <div className="flex items-center gap-3">
          <Ruler className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">
            Tips for a better measurement
          </h2>
        </div>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {tips.map((tip) => (
            <li
              key={tip}
              className="flex gap-3 text-sm leading-6 text-scrim-foreground/65"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scrim-foreground" />
              {tip}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-8 flex gap-4 rounded-2xl border border-border p-5">
        <Info className="h-5 w-5 shrink-0" />
        <p className="text-sm leading-6 text-muted-foreground">
          Body measurements describe you; garment measurements describe the
          product. Compare both when a seller provides them, and read fit notes
          such as slim, regular or oversized.
        </p>
      </div>
    </SupportPage>
  );
}
function Measure({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: typeof Shirt;
  items: string[][];
}) {
  return (
    <section className="rounded-4xl border border-border bg-card p-6 sm:p-8">
      <Icon className="h-7 w-7" />
      <h2 className="mt-7 text-3xl font-semibold">{title}</h2>
      <ol className="mt-7 space-y-6">
        {items.map(([name, copy], index) => (
          <li key={name} className="grid grid-cols-[32px_1fr] gap-3">
            <span className="text-xs text-muted-foreground">0{index + 1}</span>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {copy}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
