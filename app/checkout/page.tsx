"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cartCleared, selectAllCart, selectCartSubtotal, selectDiscountAmount } from "@/features/Cart/cartSlice";
import { ArrowLeft, ArrowRight, Check, CreditCard, LockKeyhole, Package, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const fieldClass = "mt-2 h-12 rounded-xl border-border bg-background px-4";

export default function CheckoutPage() {
  const items = useSelector(selectAllCart);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectDiscountAmount);
  const dispatch = useDispatch();
  const router = useRouter();
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");
  const [payment, setPayment] = useState<"card" | "arrival">("card");
  const [submitting, setSubmitting] = useState(false);
  const shipping = delivery === "express" ? 18 : subtotal - discount >= 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const placeOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) return;
    setSubmitting(true);
    const order = `AR-${Date.now().toString().slice(-8)}`;
    localStorage.setItem("aurela-latest-order", JSON.stringify({ order, total: total.toFixed(2), createdAt: new Date().toISOString(), status: "processing" }));
    dispatch(cartCleared());
    router.push(`/checkout/success?order=${order}&total=${total.toFixed(2)}`);
  };

  if (!items.length) return <main className="grid min-h-[70vh] place-items-center bg-muted px-4"><div className="max-w-md text-center"><Package className="mx-auto h-10 w-10 text-muted-foreground" /><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em]">Your bag is empty.</h1><p className="mt-3 text-muted-foreground">Choose a piece before beginning checkout.</p><Button asChild className="mt-7 rounded-full px-7"><Link href="/products">Explore products</Link></Button></div></main>;

  return (
    <main className="min-h-screen bg-muted px-3 py-8 text-foreground sm:px-5 lg:px-6 lg:py-12">
      <form onSubmit={placeOrder} className="mx-auto max-w-7xl">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Return to bag</Link>
        <div className="mt-6"><p className="text-xs uppercase tracking-[.26em] text-muted-foreground">Secure checkout</p><h1 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">Complete your order.</h1></div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="space-y-6">
            <CheckoutSection number="01" title="Contact and delivery address">
              <div className="grid gap-5 sm:grid-cols-2"><Field label="First name" name="firstName" autoComplete="given-name" /><Field label="Last name" name="lastName" autoComplete="family-name" /></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Email" name="email" type="email" autoComplete="email" /><Field label="Phone" name="phone" type="tel" autoComplete="tel" /></div>
              <Field label="Address" name="address" autoComplete="street-address" />
              <div className="grid gap-5 sm:grid-cols-3"><Field label="City" name="city" autoComplete="address-level2" /><Field label="State" name="state" autoComplete="address-level1" /><Field label="Postal code" name="postalCode" autoComplete="postal-code" /></div>
              <label className="block text-sm font-medium">Country<select name="country" autoComplete="country-name" className={`${fieldClass} w-full`}><option>Nigeria</option><option>Ghana</option><option>United Kingdom</option><option>United States</option></select></label>
            </CheckoutSection>

            <CheckoutSection number="02" title="Delivery method">
              <Choice selected={delivery === "standard"} onClick={() => setDelivery("standard")} icon={Truck} title="Standard delivery" detail="3–7 business days" price={subtotal - discount >= 50 ? "Complimentary" : "$9.99"} />
              <Choice selected={delivery === "express"} onClick={() => setDelivery("express")} icon={Package} title="Express delivery" detail="1–2 business days" price="$18.00" />
            </CheckoutSection>

            <CheckoutSection number="03" title="Payment">
              <div className="grid gap-3 sm:grid-cols-2"><Choice selected={payment === "card"} onClick={() => setPayment("card")} icon={CreditCard} title="Card" detail="Visa, Mastercard" /><Choice selected={payment === "arrival"} onClick={() => setPayment("arrival")} icon={Package} title="Pay on arrival" detail="Where available" /></div>
              {payment === "card" && <div className="mt-5 space-y-5"><Field label="Card number" name="cardNumber" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" /><div className="grid grid-cols-2 gap-5"><Field label="Expiry" name="expiry" autoComplete="cc-exp" placeholder="MM / YY" /><Field label="Security code" name="cvv" inputMode="numeric" autoComplete="cc-csc" placeholder="CVV" /></div><p className="flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5" /> Frontend demonstration only. No real payment is processed.</p></div>}
            </CheckoutSection>
          </div>

          <aside className="rounded-[2rem] bg-primary p-6 text-primary-foreground lg:sticky lg:top-24 lg:p-8">
            <p className="text-xs uppercase tracking-[.24em] text-primary-foreground/50">Order review</p><h2 className="mt-2 text-2xl font-semibold">Your selection</h2>
            <div className="mt-6 max-h-72 space-y-5 overflow-y-auto pr-1">{items.map(item => <div key={item.id} className="flex gap-4"><div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-primary-foreground/10"><Image fill src={item.image} alt={item.name} sizes="64px" className="object-cover" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{item.name}</p><p className="mt-1 text-xs text-primary-foreground/50">Qty {item.quantity}{item.variant ? ` · ${Object.values(item.variant).filter(Boolean).join(" · ")}` : ""}</p></div><span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span></div>)}</div>
            <Separator className="my-6 bg-primary-foreground/15" />
            <div className="space-y-3 text-sm"><Summary label="Subtotal" value={`$${subtotal.toFixed(2)}`} />{discount > 0 && <Summary label="Discount" value={`−$${discount.toFixed(2)}`} />}<Summary label="Shipping" value={shipping ? `$${shipping.toFixed(2)}` : "Complimentary"} /><Summary label="Estimated tax" value={`$${tax.toFixed(2)}`} /></div>
            <Separator className="my-6 bg-primary-foreground/15" /><div className="flex items-end justify-between"><span>Total</span><strong className="text-3xl">${total.toFixed(2)}</strong></div>
            <Button type="submit" disabled={submitting} className="mt-7 h-13 w-full rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">{submitting ? "Placing order…" : "Place order"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
            <p className="mt-4 text-center text-xs leading-5 text-primary-foreground/45">By placing this demonstration order, you accept Aurela’s terms and return policy.</p>
          </aside>
        </div>
      </form>
    </main>
  );
}

function CheckoutSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <section className="rounded-[2rem] border border-border bg-card p-6 text-card-foreground sm:p-8"><div className="mb-7 flex items-center gap-4"><span className="text-xs text-muted-foreground">{number}</span><h2 className="text-2xl font-semibold tracking-[-.03em]">{title}</h2></div><div className="space-y-5">{children}</div></section>; }
function Field({ label, name, type = "text", autoComplete, placeholder, inputMode }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string; inputMode?: "numeric" }) { return <label className="block text-sm font-medium">{label}<Input required type={type} name={name} autoComplete={autoComplete} placeholder={placeholder} inputMode={inputMode} className={fieldClass} /></label>; }
function Choice({ selected, onClick, icon: Icon, title, detail, price }: { selected: boolean; onClick: () => void; icon: typeof Truck; title: string; detail: string; price?: string }) { return <button type="button" onClick={onClick} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${selected ? "border-foreground bg-accent" : "border-border hover:bg-accent/50"}`}><span className="grid h-10 w-10 place-items-center rounded-full bg-muted"><Icon className="h-4 w-4" /></span><span className="min-w-0 flex-1"><strong className="block text-sm">{title}</strong><span className="text-xs text-muted-foreground">{detail}</span></span>{price && <span className="text-sm">{price}</span>}{selected && <Check className="h-4 w-4" />}</button>; }
function Summary({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-4"><span className="text-primary-foreground/55">{label}</span><span>{value}</span></div>; }
