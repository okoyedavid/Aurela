"use client";

import { reviews } from "@/data/products";
import { ProductPage } from "@/types/products";
import ProductReviews from "./ProductReviews";

export default function ProductDetails({ product }: ProductPage) {
  const productReviews = reviews.filter(review => review.productId === product.id);
  return (
    <section className="mb-20 border-t border-border" aria-label="Product information">
      <Detail title="Description" open><p>{product.description}</p><ul className="mt-5 flex flex-wrap gap-2">{product.tags.map(tag => <li key={tag} className="rounded-full bg-muted px-3 py-1 text-xs capitalize text-foreground">{tag}</li>)}</ul></Detail>
      <Detail title="Materials & care"><dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">{Object.entries(product.specifications).map(([key, value]) => <div key={key} className="flex justify-between gap-5 border-b border-border pb-3"><dt className="font-medium text-foreground">{key}</dt><dd className="text-right">{value}</dd></div>)}</dl></Detail>
      <Detail title="Size & fit"><p>Choose from the currently available options above. Product-specific measurements and seller size guides will be connected when listing data is available.</p></Detail>
      <Detail title={`Reviews (${productReviews.length})`}><ProductReviews reviews={productReviews} averageRating={productReviews.length ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length : product.rating} totalReviews={productReviews.length} /></Detail>
    </section>
  );
}

function Detail({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return <details open={open} className="group border-b border-border"><summary className="flex cursor-pointer list-none items-center justify-between py-6 text-xl font-semibold"><span>{title}</span><span className="text-2xl font-normal text-muted-foreground transition group-open:rotate-45">+</span></summary><div className="max-w-4xl pb-8 text-sm leading-7 text-muted-foreground">{children}</div></details>;
}
