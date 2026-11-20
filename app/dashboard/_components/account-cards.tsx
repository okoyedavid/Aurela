"use client";

import { selectAllCart, selectCartSubtotal } from "@/features/cart/cart-slice";
import { selectAllProducts } from "@/features/products/products-slice";
import { selectWishlistIds } from "@/features/wishlist/wishlist-slice";
import {
  ArrowRight,
  Bell,
  Heart,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const orders = [
  {
    id: "AU-1048",
    item: "Italian Leather Oxford",
    date: "24 Jun 2026",
    status: "In transit",
    total: "$184",
  },
  {
    id: "AU-1021",
    item: "Linen Tailored Jacket",
    date: "11 Jun 2026",
    status: "Delivered",
    total: "$220",
  },
  {
    id: "AU-0984",
    item: "Structured Mini Bag",
    date: "28 May 2026",
    status: "Delivered",
    total: "$96",
  },
];

const notifications = [
  {
    title: "Your order is on its way",
    detail: "AU-1048 was handed to the delivery partner.",
    time: "18 min ago",
  },
  {
    title: "A saved piece is nearly gone",
    detail: "Limited stock remains for an item in your wishlist.",
    time: "Yesterday",
  },
  {
    title: "Return received",
    detail: "Your return for AU-1012 is being inspected.",
    time: "2 days ago",
  },
];

const card =
  "rounded-3xl border border-border bg-card p-5 text-card-foreground";
type AccountSection =
  | "overview"
  | "purchases"
  | "wishlist"
  | "cart"
  | "notifications";

export default function AccountCards({
  section = "overview",
}: {
  section?: AccountSection;
}) {
  const cart = useSelector(selectAllCart);
  const subtotal = useSelector(selectCartSubtotal);
  const wishlistIds = useSelector(selectWishlistIds);
  const products = useSelector(selectAllProducts);
  const wishlist = wishlistIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is NonNullable<typeof product> =>
      Boolean(product),
    );

  if (section === "cart")
    return (
      <CollectionSection
        title="Your cart"
        description={`${cart.length} item${cart.length === 1 ? "" : "s"} ready for review.`}
        action={{ label: "Continue shopping", href: "/products" }}
      >
        {cart.length ? (
          <>
            {cart.map((item) => (
              <CompactItem
                key={item.id}
                image={item.image}
                name={item.name}
                meta={`${item.variant?.size ? `Size ${item.variant.size} · ` : ""}Quantity ${item.quantity}`}
                price={item.price * item.quantity}
                href={`/products/${item.productId}`}
              />
            ))}
            <div className="flex items-center justify-between border-t border-border pt-6 text-lg">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
          </>
        ) : (
          <EmptyCollection text="Your cart is empty." />
        )}
      </CollectionSection>
    );
  if (section === "wishlist")
    return (
      <CollectionSection
        title="Your wishlist"
        description={`${wishlist.length} saved piece${wishlist.length === 1 ? "" : "s"}.`}
        action={{ label: "Discover products", href: "/products" }}
      >
        {wishlist.length ? (
          wishlist.map((item) => (
            <CompactItem
              key={item.id}
              image={item.image}
              name={item.name}
              meta={item.brand}
              price={item.price}
              href={`/products/${item.id}`}
            />
          ))
        ) : (
          <EmptyCollection text="Your wishlist is waiting for its first piece." />
        )}
      </CollectionSection>
    );
  if (section === "purchases") return <OrdersSection />;
  if (section === "notifications") return <NotificationsSection full />;

  return (
    <>
      <div className="grid w-full gap-4 p-2 md:grid-cols-3">
        {[
          { label: "Purchases", value: "12", Icon: ShoppingBag },
          { label: "In transit", value: "1", Icon: Truck },
          { label: "Wishlist", value: String(wishlist.length), Icon: Heart },
        ].map(({ label, value, Icon }) => (
          <div className={card} key={label}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4" />
            </div>
            <div className="mt-8 text-4xl font-semibold">{value}</div>
          </div>
        ))}
      </div>
      <div className="w-full p-2 xl:w-2/3">
        <OrdersSection compact />
      </div>
      <div className="w-full p-2 xl:w-1/3">
        <NotificationsSection />
      </div>
      <div className="w-full p-2 xl:w-1/2">
        <Preview
          title="Cart"
          href="/dashboard/cart"
          Icon={ShoppingCart}
          empty="Your cart is empty."
          items={cart.slice(0, 3).map((item) => ({
            id: item.id,
            image: item.image,
            name: item.name,
            meta: `${item.quantity} × $${item.price.toFixed(2)}`,
          }))}
        />
      </div>
      <div className="w-full p-2 xl:w-1/2">
        <Preview
          title="Wishlist"
          href="/dashboard/wishlist"
          Icon={Heart}
          empty="No saved pieces yet."
          items={wishlist.slice(0, 3).map((item) => ({
            id: item.id,
            image: item.image,
            name: item.name,
            meta: item.brand,
          }))}
        />
      </div>
    </>
  );
}

function OrdersSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={card}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Recent purchases</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and revisit your latest Aurela orders.
          </p>
        </div>
        <Link href="/dashboard/purchases" className="text-sm font-medium">
          View all
        </Link>
      </div>
      <div className="mt-6 divide-y divide-border">
        {orders.slice(0, compact ? 3 : orders.length).map((order) => (
          <div
            key={order.id}
            className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"
          >
            <div>
              <div className="font-medium">{order.item}</div>
              <div className="text-sm text-muted-foreground">
                {order.id} · {order.date}
              </div>
            </div>
            <span className="w-fit rounded-full bg-muted px-3 py-1 text-xs">
              {order.status}
            </span>
            <strong>{order.total}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotificationsSection({ full = false }: { full?: boolean }) {
  return (
    <section
      className={`${card} ${full ? "m-2 w-[calc(100%-1rem)]" : "h-full"}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Orders, returns and wishlist updates.
          </p>
        </div>
        <Bell className="h-5 w-5" />
      </div>
      <div className="mt-5 divide-y divide-border">
        {notifications.map((notice) => (
          <div key={notice.title} className="py-4">
            <div className="font-medium">{notice.title}</div>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {notice.detail}
            </p>
            <span className="mt-2 block text-xs text-muted-foreground">
              {notice.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Preview({
  title,
  href,
  Icon,
  empty,
  items,
}: {
  title: string;
  href: string;
  Icon: typeof Heart;
  empty: string;
  items: { id: string; image: string; name: string; meta: string }[];
}) {
  return (
    <section className={card}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-sm font-medium"
        >
          Open <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {items.length ? (
        <div className="mt-5 divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-muted p-7 text-center text-sm text-muted-foreground">
          {empty}
        </div>
      )}
    </section>
  );
}

function CollectionSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description: string;
  action: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="m-2 w-[calc(100%-1rem)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
        <Link
          href={action.href}
          className="w-fit rounded-full border border-border px-5 py-2.5 text-sm font-medium"
        >
          {action.label}
        </Link>
      </div>
      <div className={`${card} mt-7 space-y-4`}>{children}</div>
    </section>
  );
}

function EmptyCollection({ text }: { text: string }) {
  return <div className="py-14 text-center text-muted-foreground">{text}</div>;
}

function CompactItem({
  image,
  name,
  meta,
  price,
  href,
}: {
  image: string;
  name: string;
  meta: string;
  price: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-muted"
    >
      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image src={image} alt="" fill sizes="64px" className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{meta}</p>
      </div>
      <strong>${price.toFixed(2)}</strong>
    </Link>
  );
}
