import SellerShopLayout from "./seller-shop-layout";

export default async function ShopWorkspaceLayout({ children, params }: { children: React.ReactNode; params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <SellerShopLayout shopId={productId}>{children}</SellerShopLayout>;
}
