import LuxuryState from "@/components/system/LuxuryState";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return <LuxuryState eyebrow="404 · Page not found" title="This piece is no longer here." description="The page may have moved, the collection may have changed, or the address may be incomplete."><Button asChild className="h-12 rounded-full px-7"><Link href="/products"><Search className="mr-2 h-4 w-4" />Explore products</Link></Button><Button asChild variant="outline" className="h-12 rounded-full px-7"><Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Return home</Link></Button></LuxuryState>;
}
