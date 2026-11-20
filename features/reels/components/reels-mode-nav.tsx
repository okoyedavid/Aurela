
import styles from "../styles/reels.module.css";
import { Box, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReelsModeNav({ active }: { active: "reels" | "3d" }) {
  return (
    <nav aria-label="Discover view" className={styles["reels-mode-nav"]}>
      <Link href="/reels" aria-current={active === "reels" ? "page" : undefined} className={cn(styles["reels-mode-link"], active === "reels" && styles["is-active"])}>
        <Play aria-hidden="true" /> Reels
      </Link>
      <Link href="/reels/3d" aria-current={active === "3d" ? "page" : undefined} className={cn(styles["reels-mode-link"], active === "3d" && styles["is-active"])}>
        <Box aria-hidden="true" /> 3D Runway
      </Link>
    </nav>
  );
}
