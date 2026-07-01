"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { selectAllProducts } from "@/features/products/productsSlice";
import { normalizeString } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

export function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const products = useSelector((state: RootState) => selectAllProducts(state));
  const router = useRouter();
  const results = useMemo(() => {
    const q = normalizeString(query.trim());
    if (!q) return [];
    return products.filter(product => [product.name, product.brand, product.category].some(value => normalizeString(value).includes(q))).slice(0, 6);
  }, [products, query]);

  const goToProduct = (id: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/products/${id}`);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      setOpen(false);
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label="Search products" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-accent">
      <Search className="h-5 w-5 text-muted-foreground" />
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="top-[12%] translate-y-0 overflow-hidden rounded-[2rem] border-border bg-popover text-popover-foreground p-0 sm:max-w-2xl">
        <DialogHeader className="sr-only"><DialogTitle>Search Aurela</DialogTitle><DialogDescription>Search products by name, brand or category.</DialogDescription></DialogHeader>
        <form onSubmit={submit} className="flex items-center border-b border-border px-6">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the collection…" className="h-20 min-w-0 flex-1 bg-transparent px-4 text-xl outline-none placeholder:text-muted-foreground" />
          <span className="hidden text-xs uppercase tracking-[0.18em] text-muted-foreground sm:block">Enter to view all</span>
        </form>
        <div className="max-h-[55vh] overflow-y-auto p-3">
          {!query.trim() ? <p className="px-4 py-10 text-center text-sm text-[#7d766d]">Begin typing a product, brand or category.</p> : results.length ? results.map(product => (
            <button key={product.id} type="button" onClick={() => goToProduct(product.id)} className="flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-[#eee9df]">
              <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#e8e2d8]"><Image src={product.image} alt="" fill sizes="56px" className="object-cover" /></span>
              <span className="min-w-0 flex-1"><span className="block truncate font-medium">{product.name}</span><span className="mt-1 block text-xs uppercase tracking-[.14em] text-[#8a8278]">{product.brand}</span></span><span className="text-sm text-[#6f685f]">${product.price.toFixed(2)}</span>
            </button>
          )) : <button type="submit" className="w-full rounded-2xl px-4 py-8 text-center text-sm text-[#6f685f] hover:bg-[#eee9df]">See all results for “{query}”</button>}
        </div>
      </DialogContent>
    </Dialog>
  </>;
}
