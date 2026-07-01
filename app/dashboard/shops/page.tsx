import { Clock3, Package, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const shops = [
  { id: "footwear-studio", name: "Aurela Footwear Studio", category: "Footwear", image: "/products/footwear.jpeg", pending: 6, products: 24 },
  { id: "womens-edit", name: "The Women’s Edit", category: "Women’s clothing", image: "/products/women.jpeg", pending: 3, products: 38 },
  { id: "formal-house", name: "Formal House", category: "Tailoring & formalwear", image: "/products/formalwear.jpeg", pending: 1, products: 16 },
];

export default async function DashboardShopsPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <section className="w-full p-2"><div><p className="text-xs uppercase tracking-[.24em] text-muted-foreground">Seller access</p><h2 className="mt-3 text-3xl font-semibold">Your shops</h2><p className="mt-2 max-w-2xl text-muted-foreground">Choose a shop to manage its catalogue, fulfilments, payments and delivery work.</p></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{shops.map((shop) => <Link key={shop.id} href={`/shop/${shop.id}`} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"><div className="relative aspect-[16/10] bg-muted"><Image src={shop.image} alt={shop.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs backdrop-blur">{shop.category}</span></div><div className="p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-muted"><Store className="h-4 w-4" /></span><h3 className="text-xl font-semibold">{shop.name}</h3></div><div className="mt-5 flex gap-5 border-t border-border pt-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> {shop.pending} pending</span><span className="flex items-center gap-2"><Package className="h-4 w-4" /> {shop.products} products</span></div></div></Link>)}</div></section>;
}
