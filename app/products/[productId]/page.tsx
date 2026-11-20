import ProductClient from "../../shop/[productId]/product-client";

export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <ProductClient id={productId} />;
}
