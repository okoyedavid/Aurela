"use client";

import LuxuryState from "@/components/system/LuxuryState";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <LuxuryState eyebrow="Something interrupted the experience" title="Let’s restore your place." description="A temporary problem prevented this page from loading. Your bag and saved pieces on this device have not been intentionally changed."><Button onClick={reset} className="h-12 rounded-full px-7"><RefreshCw className="mr-2 h-4 w-4" />Try again</Button><Button asChild variant="outline" className="h-12 rounded-full px-7"><Link href="/"><Home className="mr-2 h-4 w-4" />Return home</Link></Button>{error.digest && <p className="basis-full pt-3 text-xs text-muted-foreground">Reference: {error.digest}</p>}</LuxuryState>;
}
