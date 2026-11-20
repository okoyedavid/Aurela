"use client";

import Navbar from "@/components/navigation/navbar";
import ReelsModeNav from "./reels-mode-nav";
import VerticalProductFeed from "./vertical-product-feed";
import styles from "../styles/reels.module.css";

export default function ReelsExperience() {
  return (
    <>
      <Navbar />
      <div className={styles["reels-mode-bar"]}><ReelsModeNav active="reels" /></div>
      <main className="min-h-[calc(100dvh-60px)]">
        <VerticalProductFeed />
      </main>
    </>
  );
}
