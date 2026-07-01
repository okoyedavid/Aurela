"use client";

import { moderationProducts } from "../_components/admin-data";
import {
  AlertTriangle,
  Boxes,
  EyeOff,
  FileCheck2,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AdminProductsPage() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [selected, setSelected] = useState<
    (typeof moderationProducts)[number] | null
  >(null);
  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [products, setProducts] = useState(moderationProducts);
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (!query ||
            `${product.id} ${product.name} ${product.shop} ${product.category} ${product.issue}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (stateFilter === "all" || product.state === stateFilter) &&
          (reviewFilter === "all" || product.review === reviewFilter),
      ),
    [products, query, stateFilter, reviewFilter],
  );
  const apply = () => {
    if (!selected || !decision || !reason.trim()) return;
    const nextState =
      decision === "Approve listing"
        ? "Published"
        : decision === "Request evidence"
          ? "Pending"
          : "Hidden";
    setProducts((current) =>
      current.map((item) =>
        item.id === selected.id
          ? { ...item, state: nextState, review: decision }
          : item,
      ),
    );
    setSelected(null);
    setDecision("");
    setReason("");
  };
  return (
    <section>
      <div>
        <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
          Catalogue trust
        </p>
        <h2 className="mt-2 text-4xl font-semibold">Product moderation</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Review new listings, customer reports, material evidence and
          prohibited-item risks before products remain discoverable.
        </p>
      </div>
      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-5">
          <Boxes className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">Pending review</p>
          <strong className="mt-1 block text-3xl">28</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <ShieldAlert className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Reported listings
          </p>
          <strong className="mt-1 block text-3xl">14</strong>
        </div>
        <div className="rounded-3xl border border-border bg-card p-5">
          <EyeOff className="h-5 w-5" />
          <p className="mt-6 text-sm text-muted-foreground">
            Hidden for review
          </p>
          <strong className="mt-1 block text-3xl">6</strong>
        </div>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-3 lg:grid-cols-[1fr_190px_220px]">
        <label className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Product, shop, category or issue"
            className="h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm"
          />
        </label>
        <select
          value={stateFilter}
          onChange={(event) => setStateFilter(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All listing states</option>
          <option>Published</option>
          <option>Pending</option>
          <option>Hidden</option>
        </select>
        <select
          value={reviewFilter}
          onChange={(event) => setReviewFilter(event.target.value)}
          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm"
        >
          <option value="all">All review reasons</option>
          {[...new Set(products.map((product) => product.review))].map(
            (value) => (
              <option key={value}>{value}</option>
            ),
          )}
        </select>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {filtered.map((product) => (
          <article
            key={product.id}
            className="rounded-3xl border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {product.state}
                  </span>
                </div>
                <Link
                  href={`/admin/shops/${product.shopId}`}
                  className="mt-2 block text-sm text-muted-foreground hover:underline"
                >
                  {product.shop}
                </Link>
              </div>
              <strong>${product.price}</strong>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Reports</span>
                <strong className="mt-1 block">{product.reports}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Stock</span>
                <strong className="mt-1 block">{product.stock}</strong>
              </div>
              <div className="rounded-2xl bg-muted p-3">
                <span className="text-xs text-muted-foreground">Review</span>
                <strong className="mt-1 block truncate">
                  {product.review}
                </strong>
              </div>
            </div>
            <div
              className={`mt-4 rounded-2xl p-4 text-sm ${product.issue === "None" ? "bg-muted text-muted-foreground" : "bg-destructive/8 text-destructive"}`}
            >
              {product.issue}
            </div>
            <button
              type="button"
              onClick={() => setSelected(product)}
              className="mt-4 rounded-full border border-border px-5 py-2.5 text-sm font-medium"
            >
              Open moderation controls
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-foreground/45 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="my-6 w-full max-w-xl rounded-[2rem] border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  {selected.id} · {selected.shop}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Review {selected.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 rounded-2xl bg-muted p-4">
              <p className="text-sm font-medium">Current concern</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {selected.issue}
              </p>
            </div>
            <fieldset className="mt-5">
              <legend className="text-sm font-medium">
                Moderation decision
              </legend>
              <div className="mt-3 grid gap-2">
                {[
                  { value: "Approve listing", Icon: FileCheck2 },
                  { value: "Request evidence", Icon: AlertTriangle },
                  { value: "Hide listing", Icon: EyeOff },
                  { value: "Prohibited item removal", Icon: ShieldAlert },
                ].map(({ value, Icon }) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${decision === value ? "border-primary bg-muted" : "border-border"}`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      checked={decision === value}
                      onChange={() => setDecision(value)}
                    />
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{value}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium">
                Required evidence and policy reason
              </span>
              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm"
              />
            </label>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Enforcement stores a listing-version snapshot, administrator
              identity and seller-notification reason. It does not rewrite
              historical paid order lines.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!decision || !reason.trim()}
                onClick={apply}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                Apply decision
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
