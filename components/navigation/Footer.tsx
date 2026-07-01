import Image from "next/image";
import Link from "next/link";

const groups = [
  { title: "Discover", links: [["New arrivals", "/new-arrivals"], ["Sale", "/sale"], ["Categories", "/categories"], ["Discover in motion", "/reels"]] },
  { title: "Customer care", links: [["Help centre", "/help"], ["FAQs", "/faq"], ["Track an order", "/track-order"], ["Returns", "/returns"], ["Size guide", "/size-guide"], ["Contact", "/contact"]] },
  { title: "Sell with Aurela", links: [["Seller terms", "/seller-terms"], ["Listing restrictions", "/prohibited-items"], ["Seller sign in", "/login"]] },
  { title: "Aurela", links: [["About", "/about"], ["Editorial", "/editorial"], ["Sustainability", "/sustainability"], ["Accessibility", "/accessibility"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-3 py-12 text-foreground sm:px-5 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm"><Link href="/" className="flex items-center gap-3 text-2xl font-semibold"><Image src="/aurela-logo.png" alt="" width={38} height={38} className="rounded-xl" /> Aurela.</Link><p className="mt-5 text-sm leading-7 text-muted-foreground">A considered marketplace for personal style, independent shops and pieces made to remain.</p></div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">{groups.map(group => <div key={group.title}><h3 className="text-xs font-semibold uppercase tracking-[.2em]">{group.title}</h3><ul className="mt-5 space-y-3">{group.links.map(([label, href]) => <li key={label}><Link href={href} className="text-sm text-muted-foreground transition hover:text-foreground">{label}</Link></li>)}</ul></div>)}</div>
        </div>
        <div className="mt-12 flex flex-col gap-5 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Copyright © 2026 Aurela. All rights reserved.</span><div className="flex flex-wrap gap-x-6 gap-y-2"><Link href="/terms" className="hover:text-foreground">Terms</Link><Link href="/privacy" className="hover:text-foreground">Privacy</Link><Link href="/cookies" className="hover:text-foreground">Cookies</Link><Link href="/accessibility" className="hover:text-foreground">Accessibility</Link></div></div>
      </div>
    </footer>
  );
}
