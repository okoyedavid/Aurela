"use client";
// pages/scroll-feed.tsx
import { store } from "@/store/store"; // adjust path
import Head from "next/head";
import { Provider } from "react-redux";
import VerticalProductFeed from "./VerticalProductFeed";
import Navbar from "@/components/navBar";

export default function ScrollFeedPage() {
  return (
    <Provider store={store}>
      <Head>
        <title>Discover — Scroll Feed</title>
      </Head>
      <Navbar />
      <main className="min-h-[calc(100dvh-60px)]">
        <VerticalProductFeed />
      </main>
    </Provider>
  );
}
