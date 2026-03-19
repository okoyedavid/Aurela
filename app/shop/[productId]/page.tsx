import ProductClient from "./ProductClient";

interface productDetails {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetail({ params }: productDetails) {
  const param = await params;

  return <ProductClient id={param.productId} />;
}
