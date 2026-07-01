import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import AuthHeroImage from "@/components/auth/AuthHeroImage";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

export default function SignupPage() {
  return (
    <main className="h-dvh overflow-hidden bg-muted text-foreground">
      <div className="grid h-full grid-rows-[30dvh_1fr] overflow-hidden bg-primary lg:grid-cols-[.92fr_1.08fr] lg:grid-rows-1">
        <section className="relative flex min-h-0 flex-col md:order-2 overflow-hidden p-5 text-primary-foreground sm:p-8 lg:p-10">
          <AuthHeroImage set="women" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.16),rgba(0,0,0,.68))]" />
          <header className="relative flex items-center justify-between">
            <Link href="/" className="text-3xl font-semibold tracking-[-.05em]">
              Aurela.
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-white/30 px-5 py-2 text-sm backdrop-blur-md transition hover:bg-white hover:text-black"
            >
              Explore collection
            </Link>
          </header>
          <div className="relative mt-auto max-w-xl">
            <p className="hidden text-xs uppercase tracking-[.3em] text-primary-foreground/65 sm:block">
              Your private wardrobe
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-[.95] tracking-[-.055em] sm:mt-5 sm:text-5xl lg:text-7xl">
              Return to
              <br />
              your world.
            </h1>
            <p className="mt-6 hidden max-w-md leading-7 text-primary-foreground/70 lg:block">
              Track considered purchases, save exceptional pieces, and continue
              your Aurela experience.
            </p>
          </div>
        </section>{" "}
        <section className="min-h-0 overflow-y-auto bg-card px-6 py-7 text-card-foreground sm:px-12 sm:py-9 lg:flex lg:items-center lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
            <p className="mt-12 text-xs uppercase tracking-[.26em] text-muted-foreground">
              Aurela membership
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-.045em] sm:text-5xl">
              Create your account.
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Save considered pieces and keep every order in one private
              wardrobe.
            </p>
            <div className="mt-7">
              <GoogleAuthButton label="Sign up with Google" />
              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[.18em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                <span>or use email</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First name"
                  name="firstName"
                  autoComplete="given-name"
                />
                <Field
                  label="Last name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </div>
              <Field
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
              />
              <Field
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
              />
              <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  className="mt-1 accent-primary"
                />
                <span>I agree to the terms and privacy policy.</span>
              </label>
              <button
                type="submit"
                className="flex h-13 w-full items-center justify-center gap-3 rounded-full bg-primary font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Create account <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="mt-7 text-center text-sm text-muted-foreground">
              Already a member?{" "}
              <Link
                href="/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[.18em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        required
        className="mt-2 h-11 w-full border-b border-border bg-transparent outline-none transition focus:border-foreground"
      />
    </label>
  );
}
