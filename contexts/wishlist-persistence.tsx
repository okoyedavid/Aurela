"use client";

import { selectWishlistIds, wishlistHydrated } from "@/features/wishlist/wishlist-slice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const STORAGE_KEY = "aurela-wishlist";

export default function WishlistPersistence() {
  const ids = useSelector(selectWishlistIds);
  const dispatch = useDispatch();
  const skipInitialWrite = useRef(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) dispatch(wishlistHydrated(saved.filter(value => typeof value === "string")));
    } catch { localStorage.removeItem(STORAGE_KEY); }
  }, [dispatch]);

  useEffect(() => {
    if (skipInitialWrite.current) { skipInitialWrite.current = false; return; }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  return null;
}
