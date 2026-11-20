import ProductListing from "@/components/products/product-listing";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <ProductListing initialQuery={q} />;
}
