"use client";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navBar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

const documents = [
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Cookies", "/cookies"],
  ["Accessibility", "/accessibility"],
  ["Seller terms", "/seller-terms"],
  ["Prohibited items", "/prohibited-items"],
];

export default function LegalDocument({
  eyebrow,
  title,
  summary,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  sections: LegalSection[];
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <main className="bg-background px-3 py-10 text-foreground sm:px-5 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <header className="max-w-4xl">
            <p className="text-xs uppercase tracking-[.26em] text-muted-foreground">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[.9] tracking-[-.06em] sm:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {summary}
            </p>

            <p className="mt-5 text-xs uppercase tracking-[.18em] text-muted-foreground">
              Last updated · 1 July 2026
            </p>
          </header>
          <div className="mt-14 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
            <aside>
              <nav className="sticky top-24 space-y-1">
                {documents.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className={`block rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground ${href === pathname ? "bg-accent" : ""}`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </aside>
            <article className="max-w-3xl space-y-12">
              {sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`}>
                  <div className="flex gap-4">
                    <span className="pt-1 text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-semibold tracking-[-.03em]">
                        {section.title}
                      </h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="mt-4 leading-7 text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.items && (
                        <ul className="mt-5 space-y-3">
                          {section.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-3 leading-7 text-muted-foreground"
                            >
                              <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              ))}
              {children}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
