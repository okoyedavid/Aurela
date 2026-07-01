import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navBar";

export default function SupportPage({ eyebrow = "Aurela customer care", title, description, children }: { eyebrow?: string; title: string; description: string; children: React.ReactNode }) {
  return <><Navbar /><main className="min-h-[70vh] bg-background px-3 py-10 text-foreground sm:px-5 lg:px-6 lg:py-16"><div className="mx-auto max-w-6xl"><header className="max-w-4xl"><p className="text-xs uppercase tracking-[.26em] text-muted-foreground">{eyebrow}</p><h1 className="mt-4 text-5xl font-semibold leading-[.9] tracking-[-.06em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">{description}</p></header><div className="mt-12">{children}</div></div></main><Footer /></>;
}
