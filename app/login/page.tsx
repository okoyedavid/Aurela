import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import AuthHeroImage from "@/components/auth/AuthHeroImage";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function LoginPage() {
  return (
    <main className="h-dvh overflow-hidden bg-muted text-foreground">
      <div className="grid h-full grid-rows-[30dvh_1fr] overflow-hidden bg-primary lg:grid-cols-[1.08fr_.92fr] lg:grid-rows-1">
        <section className="relative flex min-h-0 flex-col overflow-hidden p-5 text-primary-foreground sm:p-8 lg:p-10">
          <AuthHeroImage set="men" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.16),rgba(0,0,0,.68))] dark:bg-[linear-gradient(180deg,rgba(0,0,0,.22),rgba(0,0,0,.78))]" />
          <header className="relative flex items-center justify-between">
            <Link
              href="/"
              className="text-3xl text-scrim-foreground font-semibold tracking-[-.05em]"
            >
              Aurela.
            </Link>
            <Link
              href="/products"
              className="rounded-full border text-scrim-foreground border-scrim-foreground/30 px-5 py-2 text-sm backdrop-blur-md transition hover:bg-scrim/90 hover:text-scrim-foreground"
            >
              Explore collection
            </Link>
          </header>
          <div className="relative mt-auto max-w-xl">
            <p className="hidden text-xs uppercase tracking-[.3em]  text-scrim-foreground/65 sm:block">
              Your private wardrobe
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-scrim-foreground  leading-[.95] tracking-[-.055em] sm:mt-5 sm:text-5xl lg:text-7xl">
              Return to
              <br />
              your world.
            </h1>
            <p className="mt-6 hidden max-w-md leading-7 text-scrim-foreground/70 lg:block">
              Track considered purchases, save exceptional pieces, and continue
              your Aurela experience.
            </p>
          </div>
        </section>

        <section className="min-h-0 overflow-y-auto bg-card px-6 py-7 text-card-foreground sm:px-12 sm:py-9 lg:flex lg:items-center lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
            <p className="mt-7 text-xs uppercase tracking-[.26em] text-muted-foreground lg:mt-10">
              Member access
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
              Welcome back.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Sign in to view purchases, saved items and account details.
            </p>
            <div className="mt-7 lg:mt-9">
              <GoogleAuthButton label="Sign in with Google" />
              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[.18em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                <span>or use email</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </div>
            <form className="space-y-6">
              <label className="block">
                <span className="text-xs uppercase tracking-[.18em] text-muted-foreground">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 h-11 w-full border-b border-border bg-transparent outline-none transition focus:border-foreground"
                />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[.18em] text-muted-foreground">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Your password"
                  className="mt-2 h-11 w-full border-b border-border bg-transparent outline-none transition focus:border-foreground"
                />
              </label>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="accent-primary" /> Remember
                  me
                </label>
                <Link
                  href="/forgot-password"
                  className="underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="flex h-13 w-full items-center justify-center gap-3 rounded-full bg-primary font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Sign in <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to Aurela?{" "}
              <Link
                href="/signup"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
