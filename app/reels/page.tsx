import type { Metadata } from "next";
import ReelsExperience from "@/features/reels/components/reels-experience";

export const metadata: Metadata = {
  title: "Discover | Aurela",
  description: "Explore the Aurela collection through shoppable reels and the 3D runway.",
};

export default function ScrollFeedPage() {
  return (
    <ReelsExperience />
  );
}
