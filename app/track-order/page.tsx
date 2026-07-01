"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Circle, MapPin, PackageCheck, Plane, Search, Truck } from "lucide-react";
import { FormEvent, useState } from "react";

const events = [
  { title: "Order received", detail: "Aurela has received your order and confirmed the selected pieces.", place: "Aurela marketplace", time: "Today · 09:12", Icon: Check, complete: true },
  { title: "Preparing your order", detail: "The seller is preparing and packaging your items for dispatch.", place: "Seller fulfilment centre", time: "Today · 11:40", Icon: PackageCheck, complete: true },
  { title: "Handed to the carrier", detail: "The parcel will be scanned when the delivery network accepts it.", place: "Awaiting carrier scan", time: "Estimated next", Icon: Truck, complete: false },
  { title: "Regional transit", detail: "The parcel may travel by road or air depending on its origin and destination.", place: "Regional network", time: "Pending", Icon: Plane, complete: false },
  { title: "Out for delivery", detail: "Your local driver has the parcel and is completing the final mile.", place: "Destination city", time: "Pending", Icon: MapPin, complete: false },
];

export default function TrackOrderPage() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);
  const submit = (event: FormEvent) => { event.preventDefault(); setTracked(reference.trim().toUpperCase()); };
  const useLatest = () => { try { const latest = JSON.parse(localStorage.getItem("aurela-latest-order") ?? "null"); if (latest?.order) { setReference(latest.order); setTracked(latest.order); } } catch { /* no saved order */ } };

  return (
    <main className="min-h-[75vh] bg-muted px-3 py-10 text-foreground sm:px-5 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[.26em] text-muted-foreground">Order journey</p><h1 className="mt-3 text-5xl font-semibold leading-[.95] tracking-[-.055em] sm:text-7xl">Follow every meaningful update.</h1><p className="mt-6 max-w-2xl leading-7 text-muted-foreground">A timeline is more reliable than a map across sellers, flights, regional carriers and local drivers. Live maps can be added only during the final mile when coordinates are available.</p></div>
        <form onSubmit={submit} className="mt-10 grid gap-3 rounded-[2rem] border border-border bg-card p-5 sm:grid-cols-[1fr_1fr_auto] sm:p-7"><label className="text-sm font-medium">Order reference<Input required value={reference} onChange={event => setReference(event.target.value)} placeholder="AR-12345678" className="mt-2 h-12 rounded-xl" /></label><label className="text-sm font-medium">Email address<Input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 h-12 rounded-xl" /></label><Button type="submit" className="h-12 self-end rounded-full px-7"><Search className="mr-2 h-4 w-4" />Track order</Button><button type="button" onClick={useLatest} className="text-left text-xs text-muted-foreground underline underline-offset-4 sm:col-span-3">Use the latest demonstration order saved on this device</button></form>

        {tracked && <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]"><div className="rounded-[2rem] border border-border bg-card p-6 sm:p-9"><div className="flex flex-col gap-2 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-muted-foreground">Reference</p><h2 className="mt-2 text-2xl font-semibold">{tracked}</h2></div><span className="w-fit rounded-full bg-muted px-4 py-2 text-xs font-medium">Being prepared</span></div><ol className="mt-8">{events.map((item, index) => <li key={item.title} className="relative grid grid-cols-[44px_1fr] gap-4 pb-9 last:pb-0">{index < events.length - 1 && <span className={`absolute left-[21px] top-10 h-[calc(100%-2rem)] w-px ${item.complete ? "bg-primary" : "bg-border"}`} />}<span className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border ${item.complete ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground"}`}><item.Icon className="h-4 w-4" /></span><div><div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><h3 className="font-semibold">{item.title}</h3><time className="text-xs text-muted-foreground">{item.time}</time></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p><p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Circle className="h-2 w-2 fill-current" />{item.place}</p></div></li>)}</ol></div><aside className="h-fit rounded-[2rem] bg-primary p-7 text-primary-foreground"><MapPin className="h-7 w-7" /><h2 className="mt-8 text-2xl font-semibold">Why no permanent map?</h2><p className="mt-4 text-sm leading-6 text-primary-foreground/60">Maps are useful only when a last-mile carrier shares accurate live coordinates. Before that point, verified scan events provide clearer and more honest tracking.</p><div className="mt-7 rounded-2xl bg-primary-foreground/10 p-4 text-sm"><strong>Next update</strong><p className="mt-1 text-primary-foreground/55">Carrier acceptance scan</p></div></aside></section>}
      </div>
    </main>
  );
}
