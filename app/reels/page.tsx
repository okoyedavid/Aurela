"use client";
// pages/scroll-feed.tsx
import { store } from "@/store/store"; // adjust path
import Head from "next/head";
import { Provider } from "react-redux";
import VerticalProductFeed from "./VerticalProductFeed";

export default function ScrollFeedPage() {
  return (
    <Provider store={store}>
      <Head>
        <title>Discover — Scroll Feed</title>
      </Head>
      <main className="min-h-screen">
        <VerticalProductFeed />
      </main>
    </Provider>
  );
}
