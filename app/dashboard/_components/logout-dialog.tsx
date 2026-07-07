"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutDialog({
  className,
  children,
}: {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? (
          <>
            <LogOut className="h-4 w-4" /> Log out
          </>
        )}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-md rounded-4xl border border-border bg-card p-6 text-card-foreground shadow-2xl sm:p-8"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-destructive/10 text-destructive">
              <LogOut className="h-5 w-5" />
            </span>
            <h2 id="logout-title" className="mt-6 text-2xl font-semibold">
              Log out of Aurela?
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              You will need to sign in again to access your orders, wishlist and
              account settings.
            </p>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold"
              >
                Stay signed in
              </button>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="rounded-full bg-destructive px-6 py-3 text-sm font-semibold text-white"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
