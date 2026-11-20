import PublicPageShell from "@/components/layout/public-page-shell";
import { editorials, getEditorial } from "@/data/editorials";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return editorials.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const article = getEditorial((await params).slug);
  return article
    ? {
        title: `${article.title} | Aurela Editorial`,
        description: article.excerpt,
      }
    : {};
}

export default async function EditorialArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const article = getEditorial((await params).slug);
  if (!article) notFound();
  const next =
    editorials[
      (editorials.findIndex(({ slug }) => slug === article.slug) + 1) %
        editorials.length
    ];
  return (
    <PublicPageShell>
      <article>
        <header className="mx-auto max-w-5xl px-5 pb-12 pt-12 text-center sm:pt-20 lg:px-6">
          <Link
            href="/editorial"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All stories
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[.28em] text-muted-foreground">
            {article.eyebrow}
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-7xl">
            {article.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-7 flex justify-center gap-4 text-xs uppercase tracking-[.16em] text-muted-foreground">
            <span>{article.date}</span>
            <span aria-hidden>•</span>
            <span>{article.readTime}</span>
          </div>
        </header>
        <div className="px-3 sm:px-5 lg:px-6">
          <div className="relative mx-auto aspect-video max-w-7xl overflow-hidden rounded-4xl">
            <Image
              src={article.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[20%_20%]"
            />
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
          <p className="text-xl leading-9 text-foreground sm:text-2xl sm:leading-10">
            {article.intro}
          </p>
          {article.sections.map((section, index) => (
            <section key={section.heading} className="mt-14">
              <p className="text-xs font-semibold uppercase tracking-[.24em] text-muted-foreground">
                0{index + 1}
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl">{section.heading}</h2>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {index === 0 && article.quote && (
                <blockquote className="my-16 border-y border-border py-10 text-3xl leading-snug sm:text-4xl">
                  “{article.quote}”
                </blockquote>
              )}
            </section>
          ))}
        </div>
      </article>
      <aside className="bg-primary dark:bg-muted px-5 py-20 text-scrim-foreground lg:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[.25em] text-scrim-foreground/55">
            Read next
          </p>
          <Link
            href={`/editorial/${next.slug}`}
            className="group mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <h2 className="max-w-4xl text-4xl sm:text-6xl">{next.title}</h2>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
              Open story{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </aside>
    </PublicPageShell>
  );
}
