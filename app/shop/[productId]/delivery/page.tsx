"use client";

import {
  Check,
  ClipboardCheck,
  Clock3,
  Plus,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

const fulfilments = [
  {
    code: "SF-1048-FT",
    customer: "Amara K.",
    product: "Italian Leather Oxford",
    category: "footwear",
    subtotal: 184,
    weight: "1.2 kg",
    mode: "undecided",
  },
  {
    code: "SF-1052-FT",
    customer: "Tobi A.",
    product: "Leather Loafers",
    category: "footwear",
    subtotal: 312,
    weight: "2.4 kg",
    mode: "self",
  },
  {
    code: "SF-1056-FT",
    customer: "Leila M.",
    product: "Structured Ankle Boot",
    category: "heavy-footwear",
    subtotal: 210,
    weight: "8.8 kg",
    mode: "review",
  },
];

const approvedEvents = {
  footwear: [
    {
      value: "quality-checked",
      label: "Quality and pair check completed",
      detail: "Confirm matching pair, size, colour and visible condition.",
    },
    {
      value: "packaged",
      label: "Protectively packaged",
      detail: "Shoes boxed and protected against moisture or crushing.",
    },
    {
      value: "courier-handoff",
      label: "Handed to courier or driver",
      detail: "Requires courier name and tracking or driver reference.",
    },
    {
      value: "in-transit",
      label: "In transit",
      detail: "Shipment has departed the seller or courier facility.",
    },
    {
      value: "destination-city",
      label: "Arrived in destination city",
      detail: "Parcel reached the customer’s delivery region.",
    },
    {
      value: "out-for-delivery",
      label: "Out for delivery",
      detail: "Driver has the parcel for the final delivery attempt.",
    },
    {
      value: "delivered",
      label: "Delivered",
      detail: "Requires recipient name or safe-delivery evidence.",
    },
    {
      value: "delivery-attempt",
      label: "Delivery attempted",
      detail: "Record why delivery could not be completed.",
    },
  ],
  "heavy-footwear": [
    {
      value: "weight-verified",
      label: "Weight and dimensions verified",
      detail: "Required before accepting unusually heavy footwear fulfilments.",
    },
    {
      value: "reinforced-packaging",
      label: "Reinforced packaging completed",
      detail: "Confirm crush-resistant packaging and sealed edges.",
    },
    {
      value: "courier-handoff",
      label: "Handed to heavy-goods courier",
      detail: "Requires courier, tracking reference and declared weight.",
    },
    {
      value: "in-transit",
      label: "In transit",
      detail: "Shipment has departed the handling facility.",
    },
    {
      value: "out-for-delivery",
      label: "Out for delivery",
      detail: "Courier began the final delivery stage.",
    },
    {
      value: "delivered",
      label: "Delivered",
      detail: "Requires recipient or proof-of-delivery reference.",
    },
  ],
};

type RecordedEvent = {
  value: string;
  label: string;
  detail: string;
  location: string;
  reference: string;
  recordedAt: string;
};

export default function ShopDeliveryPage() {
  const [modes, setModes] = useState<Record<string, string>>(
    Object.fromEntries(fulfilments.map((item) => [item.code, item.mode])),
  );
  const [events, setEvents] = useState<Record<string, RecordedEvent[]>>({
    "SF-1052-FT": [
      {
        value: "quality-checked",
        label: "Quality and pair check completed",
        detail: "Size 42 pair checked before packing.",
        location: "Seller studio",
        reference: "QC-1052",
        recordedAt: "1 Jul 2026, 09:20",
      },
      {
        value: "packaged",
        label: "Protectively packaged",
        detail: "Original box placed inside a sealed outer carton.",
        location: "Seller studio",
        reference: "PK-1052",
        recordedAt: "1 Jul 2026, 10:05",
      },
    ],
  });
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [eventValue, setEventValue] = useState("");
  const [detail, setDetail] = useState("");
  const [location, setLocation] = useState("");
  const [reference, setReference] = useState("");
  const activeFulfilment = fulfilments.find((item) => item.code === activeCode);
  const availableEvents = useMemo(() => {
    if (!activeFulfilment) return [];
    const permitted =
      approvedEvents[activeFulfilment.category as keyof typeof approvedEvents];
    const recorded = new Set(
      (events[activeFulfilment.code] ?? []).map((event) => event.value),
    );
    if (recorded.has("delivered")) return [];
    const nextIndex = permitted.findIndex(
      (event) => !recorded.has(event.value),
    );
    if (nextIndex < 0) return [];
    const next = permitted[nextIndex];
    const attempt = permitted.find(
      (event) => event.value === "delivery-attempt",
    );
    return attempt &&
      next.value === "delivered" &&
      !recorded.has("delivery-attempt")
      ? [next, attempt]
      : [next];
  }, [activeFulfilment, events]);
  const selectedDefinition = availableEvents.find(
    (event) => event.value === eventValue,
  );
  const openEventModal = (code: string) => {
    setActiveCode(code);
    setEventValue("");
    setDetail("");
    setLocation("");
    setReference("");
  };
  const saveEvent = () => {
    if (
      !activeCode ||
      !selectedDefinition ||
      !detail.trim() ||
      !location.trim()
    )
      return;
    const record: RecordedEvent = {
      value: selectedDefinition.value,
      label: selectedDefinition.label,
      detail: detail.trim(),
      location: location.trim(),
      reference: reference.trim() || "No reference supplied",
      recordedAt: new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
    };
    setEvents((current) => ({
      ...current,
      [activeCode]: [...(current[activeCode] ?? []), record],
    }));
    setActiveCode(null);
  };

  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Fulfilment control
        </p>
        <h2 className="mt-2 text-3xl font-semibold">Delivery</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Choose per fulfilment. Platform delivery costs 10% of the shop item
          subtotal, but requests enter inspection first and can be rejected or
          repriced for exceptional weight, dimensions or handling.
        </p>
      </div>
      <div className="mt-7 space-y-5">
        {fulfilments.map((item) => {
          const mode = modes[item.code];
          const fee = item.subtotal * 0.1;
          return (
            <article
              key={item.code}
              className="rounded-3xl border border-border bg-card p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{item.code}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.customer} · {item.product} · {item.weight} · Item
                    subtotal ${item.subtotal}
                  </p>
                </div>
                <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize">
                  {mode === "review"
                    ? "Awaiting platform inspection"
                    : mode === "self"
                      ? "Seller delivery"
                      : "Delivery method required"}
                </span>
              </div>
              {mode === "undecided" && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() =>
                      setModes((current) => ({
                        ...current,
                        [item.code]: "review",
                      }))
                    }
                    className="rounded-2xl border border-border p-5 text-left transition hover:bg-muted"
                  >
                    <ShieldCheck className="h-5 w-5" />
                    <strong className="mt-4 block">
                      Request platform delivery
                    </strong>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Estimated fee ${fee.toFixed(2)}. Final acceptance follows
                      weight and handling inspection.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setModes((current) => ({
                        ...current,
                        [item.code]: "self",
                      }))
                    }
                    className="rounded-2xl border border-border p-5 text-left transition hover:bg-muted"
                  >
                    <Truck className="h-5 w-5" />
                    <strong className="mt-4 block">
                      Handle delivery myself
                    </strong>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      You become responsible for accurate, timestamped
                      platform-approved events.
                    </p>
                  </button>
                </div>
              )}
              {mode === "review" && (
                <div className="mt-6 rounded-2xl bg-muted p-5">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5" />
                    <strong>Inspection pending</strong>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    The request has not moved into the admin delivery queue.
                    Dimensions, weight and handling requirements must be
                    accepted first.
                  </p>
                </div>
              )}
              {mode === "self" && (
                <div className="mt-6">
                  <div className="space-y-3">
                    {(events[item.code] ?? []).map((event) => (
                      <div
                        key={`${event.value}-${event.recordedAt}`}
                        className="flex gap-3 rounded-2xl bg-muted p-4"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium">{event.label}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {event.detail}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground">
                            {event.location} · {event.reference} ·{" "}
                            {event.recordedAt}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => openEventModal(item.code)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" /> Add timeline event
                  </button>
                  <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <ClipboardCheck className="h-4 w-4" /> Events will be
                    append-only, sequenced and server-timestamped by the
                    backend.
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {activeFulfilment && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-foreground/45 p-3 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveCode(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-title"
            className="my-6 w-full max-w-xl rounded-4xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  {activeFulfilment.code}
                </p>
                <h2 id="event-title" className="mt-2 text-2xl font-semibold">
                  Add delivery event
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {activeFulfilment.product}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCode(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {availableEvents.length ? (
              <div className="mt-7 space-y-5">
                <fieldset>
                  <legend className="text-sm font-medium">
                    Acceptable next event
                  </legend>
                  <div className="mt-3 space-y-2">
                    {availableEvents.map((event) => (
                      <label
                        key={event.value}
                        className={`block cursor-pointer rounded-2xl border p-4 ${eventValue === event.value ? "border-primary bg-muted" : "border-border"}`}
                      >
                        <input
                          type="radio"
                          name="event"
                          value={event.value}
                          checked={eventValue === event.value}
                          onChange={() => setEventValue(event.value)}
                          className="sr-only"
                        />
                        <strong className="text-sm">{event.label}</strong>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {event.detail}
                        </p>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label>
                  <span className="mb-2 block text-sm font-medium">
                    Event details
                  </span>
                  <textarea
                    value={detail}
                    onChange={(event) => setDetail(event.target.value)}
                    rows={3}
                    placeholder="Describe what happened and who handled the parcel"
                    className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      Location
                    </span>
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      placeholder="Facility or city"
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      Courier/tracking reference
                    </span>
                    <input
                      value={reference}
                      onChange={(event) => setReference(event.target.value)}
                      placeholder="Optional before handoff"
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm"
                    />
                  </label>
                </div>
                <div className="rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
                  The production API should assign the timestamp and actor
                  identity. Sellers cannot edit or remove an event after
                  submission; corrections must be appended as separate audited
                  events.
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveCode(null)}
                    className="rounded-full border border-border px-5 py-2.5 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!eventValue || !detail.trim() || !location.trim()}
                    onClick={saveEvent}
                    className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
                  >
                    Record event
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-7 rounded-2xl bg-muted p-8 text-center">
                <Check className="mx-auto h-6 w-6" />
                <p className="mt-3 font-medium">Timeline complete</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  No additional delivery events are permitted.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
