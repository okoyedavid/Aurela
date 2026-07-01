import SupportPage from "@/components/support/SupportPage";
import { ArrowUpRight, CircleHelp, Mail, PackageSearch, Ruler, RotateCcw, Truck } from "lucide-react";
import Link from "next/link";

const topics = [
  { href: "/order-status", title: "Find an order", copy: "Check the current status using your order reference and email.", Icon: PackageSearch },
  { href: "/shipping-returns", title: "Shipping & delivery", copy: "Understand dispatch, delivery estimates, cancellations and return windows.", Icon: Truck },
  { href: "/returns", title: "Start a return", copy: "Review eligibility and begin a return request for an Aurela order.", Icon: RotateCcw },
  { href: "/size-guide", title: "Find your size", copy: "Measure at home and compare seller-specific sizing with confidence.", Icon: Ruler },
  { href: "/faq", title: "Common questions", copy: "Friendly answers about accounts, products, sellers, checkout and orders.", Icon: CircleHelp },
  { href: "/contact", title: "Contact customer care", copy: "Send the support team a detailed message when you need a person.", Icon: Mail },
];
export default function HelpPage() { return <SupportPage title="How can we help?" description="From choosing the right piece to following its journey home, Aurela customer care is designed to make every step clear."><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{topics.map(({ href, title, copy, Icon }) => <Link key={href} href={href} className="group flex min-h-64 flex-col rounded-[1.75rem] border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-full bg-muted"><Icon className="h-5 w-5" /></span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div><h2 className="mt-10 text-2xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></Link>)}</div><section className="mt-10 rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-10"><p className="text-xs uppercase tracking-[.24em] text-primary-foreground/55">Before contacting us</p><h2 className="mt-3 text-3xl font-semibold">Keep your order reference nearby.</h2><p className="mt-4 max-w-2xl leading-7 text-primary-foreground/65">It begins with AR- and appears on confirmation pages and receipts. Never send full card details, passwords or security codes through support forms.</p></section></SupportPage>; }
