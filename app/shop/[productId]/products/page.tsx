"use client";

import { ImagePlus, Pencil, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const initialProducts = [
  {
    id: "AR-OX-014",
    name: "Italian Leather Oxford",
    price: 184,
    stock: 14,
    image: "/products/footwear.jpeg",
    sizes: "40, 41, 42, 43",
    colors: "Black, Brown",
  },
  {
    id: "AR-LF-008",
    name: "Leather Loafer",
    price: 156,
    stock: 7,
    image: "/categories/shoes.jpeg",
    sizes: "39, 40, 41, 42",
    colors: "Tan, Black",
  },
  {
    id: "AR-BT-003",
    name: "Structured Ankle Boot",
    price: 210,
    stock: 3,
    image: "/categories/UK01 Oxford Shoes Men Overview_The UK01 Oxford….jpeg",
    sizes: "41, 42, 43",
    colors: "Black",
  },
];

export default function ShopProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<
    (typeof initialProducts)[number] | null
  >(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const sizeOptions = ["XS", "S", "M", "L", "XL", "39", "40", "41", "42", "43"];
  const begin = (product?: (typeof initialProducts)[number]) => {
    setEditing(product ?? null);
    setName(product?.name ?? "");
    setPrice(product ? String(product.price) : "");
    setStock(product ? String(product.stock) : "");
    setColors(product?.colors ?? "");
    setSizes(product?.sizes.split(", ") ?? []);
    setOpen(true);
  };
  const save = () => {
    if (!name.trim()) return;
    const record = {
      id: editing?.id ?? `AR-${Date.now().toString().slice(-6)}`,
      name,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      colors,
      sizes: sizes.join(", "),
      image: editing?.image ?? "/products/footwear.jpeg",
    };
    setProducts((current) =>
      editing
        ? current.map((item) => (item.id === editing.id ? record : item))
        : [record, ...current],
    );
    setOpen(false);
  };
  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.22em] text-muted-foreground">
            Catalogue
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Products</h2>
          <p className="mt-2 text-muted-foreground">
            Create products and maintain their variant stock.
          </p>
        </div>
        <button
          type="button"
          onClick={() => begin()}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" /> Create product
        </button>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="relative aspect-[16/10] bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.id}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => begin(product)}
                  aria-label={`Edit ${product.name}`}
                  className="rounded-full border border-border p-2"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-muted p-3">
                  <span className="text-muted-foreground">Price</span>
                  <strong className="mt-1 block">${product.price}</strong>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <span className="text-muted-foreground">Stock</span>
                  <strong className="mt-1 block">{product.stock}</strong>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Sizes: {product.sizes || "None"}
                <br />
                Colours: {product.colors || "None"}
              </p>
            </div>
          </article>
        ))}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-foreground/45 p-3 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="my-6 w-full max-w-2xl rounded-4xl border border-border bg-card p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-muted-foreground">
                  {editing ? "Edit catalogue item" : "New catalogue item"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {editing ? "Edit product" : "Create product"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium">
                  Product name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium">Price</span>
                <input
                  type="number"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                />
              </label>
              <label>
                <span className="mb-2 block text-sm font-medium">
                  Total starting stock
                </span>
                <input
                  type="number"
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                />
              </label>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium">
                  Colours, separated by commas
                </span>
                <input
                  value={colors}
                  onChange={(event) => setColors(event.target.value)}
                  placeholder="Black, Brown, Cream"
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4"
                />
              </label>
              <fieldset className="sm:col-span-2">
                <legend className="mb-3 text-sm font-medium">
                  Available sizes
                </legend>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <label
                      key={size}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm ${sizes.includes(size) ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={sizes.includes(size)}
                        onChange={() =>
                          setSizes((current) =>
                            current.includes(size)
                              ? current.filter((value) => value !== size)
                              : [...current, size],
                          )
                        }
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium">
                  Product images
                </span>
                <span className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
                  <ImagePlus className="mb-2 h-5 w-5" /> Select multiple images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                  />
                </span>
              </label>
            </div>
            <div className="mt-5 rounded-2xl bg-muted p-4 text-xs leading-5 text-muted-foreground">
              Backend implementation must create a SKU and stock count for every
              size/colour combination. Existing paid order lines retain
              immutable snapshots when this product changes.
            </div>
            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-5 py-2.5 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                {editing ? "Save changes" : "Create product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
