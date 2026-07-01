import ProductListing from "@/components/products/ProductListing";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <ProductListing initialQuery={q} />;
}
