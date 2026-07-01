"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <html lang="en"><body className="m-0 bg-[#f2f2f2] font-sans text-[#171717]"><main className="grid min-h-screen place-items-center p-5"><section className="w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"><div className="h-2 bg-black" /><div className="p-8 text-center sm:p-14"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-black text-2xl font-semibold text-white">A</div><p className="mt-8 text-xs uppercase tracking-[.28em] text-black/50">Aurela system error</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.05em] sm:text-6xl">The experience needs a moment.</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-black/55">A critical problem interrupted the application. Try restoring it, or return after refreshing the page.</p><button type="button" onClick={reset} className="mt-8 h-12 rounded-full bg-black px-8 text-sm font-medium text-white">Restore Aurela</button>{error.digest && <p className="mt-5 text-xs text-black/40">Reference: {error.digest}</p>}</div></section></main></body></html>;
}
