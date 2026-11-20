import type { Metadata } from "next";
import RunwayExperience from "@/features/runway/components/runway-experience";

export const metadata: Metadata = {
  title: "3D Runway | Aurela",
  description: "Explore the Aurela runway. Discover every look and shop the pieces that make it yours.",
};

export default function RunwayPage() {
  return <RunwayExperience />;
}
