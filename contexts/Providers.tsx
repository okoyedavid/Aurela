"use client";
import { store } from "@/store/store";
import { Provider as ProviderWrapper } from "react-redux";
import WishlistPersistence from "./WishlistPersistence";

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProviderWrapper store={store}><WishlistPersistence />{children}</ProviderWrapper>;
}
