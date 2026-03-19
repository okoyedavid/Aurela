"use client";

import { Button } from "@/components/ui/button";
import { Menu, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const backgroundImages = [
  "/login/login-bg4.jpg",
  "/login/login-bg4.jpg",
  "/login/login-bg4.jpg",
];

const topLinks = ["Login", "Sign Up"];
const progressSteps = [
  { index: "01", label: "Get started", active: false },
  { index: "02", label: "Tell us about yourself", active: true },
  { index: "03", label: "Verify your identity", active: false },
  { index: "04", label: "Get your debit card", active: false },
];

export default function LoginPage() {
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

  useEffect(() => {
    // Changed: rotate to a random supplied background after mount without an impure render path.
    const frameId = window.requestAnimationFrame(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      setBackgroundImage(backgroundImages[randomIndex]);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#dad7d1] text-white">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Editorial login background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,26,26,0.42)_0%,rgba(26,26,26,0.18)_42%,rgba(26,26,26,0.28)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-semibold tracking-[-0.04em]">
            Auvé.
          </Link>

          <div className="flex items-center gap-3 rounded-full border border-white/20 bg-black/10 px-3 py-2 backdrop-blur-sm md:bg-transparent md:px-0 md:py-0">
            <nav className="hidden items-center gap-8 text-sm text-white/85 md:flex">
              {topLinks.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="transition hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/8 transition hover:bg-white/15"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-12">
          <div className="max-w-[34rem] self-center">
            <p className="text-xs uppercase tracking-[0.28em] text-white/65">
              Fashion Redefined
            </p>
            <h1 className="mt-6 text-6xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-7xl lg:text-[6.25rem]">
              Welcome
              <br />
              to Auvé.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/72 sm:text-base">
              Step into your personal style space. Create an account in seconds
              and enjoy curated collections, exclusive access, and a seamless
              shopping experience.
            </p>
          </div>

          <div className="w-full justify-self-end lg:max-w-[30rem]">
            <div className="rounded-[2rem] bg-white p-6 text-[#141414] shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#7d786f]">
                <div className="flex items-center gap-2">
                  <span>02</span>
                  <span className="h-px w-6 bg-[#d8d1c7]" />
                  <span>Tell us about yourself</span>
                </div>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#111111] sm:text-5xl">
                    Personal info
                  </h2>
                </div>

                <div className="space-y-7">
                  <Field label="Name" value="Arthur Berglund" />
                  <Field label="Email" value="arthur@Auvé.co" />

                  <div className="space-y-3">
                    <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a857d]">
                      Birth date
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <Field label="Day" value="08" />
                      <Field label="Month" value="August" />
                      <Field label="Year" value="1994" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-sm text-[#36322d] transition hover:text-black"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  {/* Changed: CTA mirrors the reference with a compact black pill aligned to the right. */}
                  <Button className="min-w-36 rounded-full bg-black px-8 text-white hover:bg-[#111111]">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-auto pt-4">
          <div className="grid gap-4 border-t border-white/20 pt-4 md:grid-cols-4 md:gap-6">
            {progressSteps.map((step) => (
              <div key={step.index} className="space-y-3">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.22em]">
                  <span
                    className={step.active ? "text-white" : "text-white/55"}
                  >
                    {step.index}
                  </span>
                  <span
                    className={step.active ? "text-white" : "text-white/55"}
                  >
                    {step.label}
                  </span>
                </div>
                <div className="h-px w-full bg-white/18">
                  <div
                    className={`h-full ${
                      step.active ? "w-full bg-white" : "w-0 bg-transparent"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium uppercase tracking-[0.18em] text-[#8a857d]">
        {label}
      </label>
      <div className="border-b border-[#ece6de] pb-3 text-base text-[#161616] sm:text-lg">
        {value}
      </div>
    </div>
  );
}
