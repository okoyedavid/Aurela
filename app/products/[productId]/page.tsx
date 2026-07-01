import ProductClient from "../../shop/[productId]/ProductClient";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <ProductClient id={productId} />;
}
