import { curatedCollections, CollectionSlug } from "@/data/collections";
import { notFound } from "next/navigation";
import CollectionClient from "./collection-client";
export function generateStaticParams() {
  return Object.keys(curatedCollections).map((slug) => ({ slug }));
}
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in curatedCollections)) notFound();
  return (
    <CollectionClient collection={curatedCollections[slug as CollectionSlug]} />
  );
}
