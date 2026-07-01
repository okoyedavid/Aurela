import PublicPageShell from "@/components/PublicPageShell";
import { editorials } from "@/data/editorials";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EditorialPage() {
  const [lead, ...stories] = editorials;
  return <PublicPageShell>
    <header className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:pt-24 lg:px-6"><p className="text-xs font-semibold uppercase tracking-[.3em] text-muted-foreground">Aurela editorial</p><div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><h1 className="max-w-4xl text-5xl leading-none sm:text-7xl">Style, people and the stories between.</h1><p className="max-w-sm leading-7 text-muted-foreground">Campaigns, practical perspective and conversations from across the marketplace.</p></div></header>

    <section className="px-3 sm:px-5 lg:px-6"><Link href={`/editorial/${lead.slug}`} className="group relative mx-auto block min-h-[68svh] max-w-7xl overflow-hidden rounded-[2rem]"><Image src={lead.image} alt="" fill priority sizes="100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" /><span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-12"><p className="text-xs font-semibold uppercase tracking-[.25em] text-white/65">{lead.eyebrow}</p><h2 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">{lead.title}</h2><p className="mt-4 max-w-xl leading-7 text-white/70">{lead.excerpt}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Read story <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></div></Link></section>

    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-6 lg:py-28"><div className="grid gap-12 md:grid-cols-2">{stories.map((story) => <Link href={`/editorial/${story.slug}`} key={story.slug} className="group"><div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-muted"><Image src={story.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" /></div><div className="pt-6"><div className="flex items-center gap-3 text-xs uppercase tracking-[.2em] text-muted-foreground"><span>{story.eyebrow}</span><span aria-hidden>•</span><span>{story.readTime}</span></div><h2 className="mt-3 text-3xl sm:text-4xl">{story.title}</h2><p className="mt-3 max-w-xl leading-7 text-muted-foreground">{story.excerpt}</p></div></Link>)}</div></section>

    <section className="border-y border-border bg-muted/50 px-5 py-20 lg:px-6"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div><div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground"><Play className="h-4 w-4" /> Discover in motion</div><h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">Some stories are better seen moving.</h2></div><Link href="/reels" className="inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Watch shoppable stories <ArrowRight className="h-4 w-4" /></Link></div></section>
  </PublicPageShell>;
}
