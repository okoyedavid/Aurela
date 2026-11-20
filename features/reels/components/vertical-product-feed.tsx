// components/VerticalProductFeed.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectFilteredProducts } from "@/features/products/products-slice"; // adjust path if needed
import ProductSlide from "./product-slide";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const THROTTLE_MS = 450; // prevent accidental double-swipes

export default function VerticalProductFeed() {
  const products = useSelector((state: RootState) =>
    selectFilteredProducts(state),
  );
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const lastAction = useRef(0);
  const touchStartY = useRef<number | null>(null);

  // clamp index
  const clampIndex = useCallback(
    (next: number) => Math.max(0, Math.min(products.length - 1, next)),
    [products.length],
  );

  // change index with throttle
  const goTo = useCallback(
    (next: number) => {
      const now = performance.now();
      if (now - lastAction.current < THROTTLE_MS) return;
      lastAction.current = now;
      setIndex((currentIndex) => {
        const target = clampIndex(next);
        if (target === currentIndex) return currentIndex;
        setDirection(target > currentIndex ? 1 : -1);
        return target;
      });
    },
    [clampIndex],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") next();
      if (e.key === "ArrowUp" || e.key === "PageUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // wheel (desktop)
  useEffect(() => {
    let running = false;
    const onWheel = (e: WheelEvent) => {
      if (running) return;
      running = true;
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
      setTimeout(() => (running = false), THROTTLE_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  // touch (mobile)
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current == null) return;
      const dy = (e.changedTouches[0].clientY ?? 0) - touchStartY.current;
      if (dy < -60) next(); // swipe up -> next
      if (dy > 60) prev(); // swipe down -> prev
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  // preload neighbor images
  useEffect(() => {
    const p = products[index];
    const n = products[index + 1];
    const prevP = products[index - 1];

    [p, n, prevP].forEach((prod) => {
      if (prod?.image) {
        const img = new Image();
        img.src = prod.image;
      }
    });
  }, [index, products]);

  // no products guard
  if (!products || products.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-gray-500">No products to display</div>
      </div>
    );
  }

  const current = products[index];
  const handleQuickBuy = (id: string) => {
    // connect to your cart action eventually
    console.log("Quick buy", id);
  };

  return (
    <div className="relative h-[calc(100dvh-60px)] w-full select-none overflow-hidden bg-black md:bg-white md:dark:bg-black">
      {/* Indicator & controls */}
      <div className="absolute z-40 top-6 left-6">
        <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {index + 1}/{products.length}
        </div>
      </div>

      <div className="absolute right-6 top-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={prev}
          className="rounded-full bg-white/90 p-2 text-black shadow-sm transition hover:scale-95"
          aria-label="Previous"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="rounded-full bg-white/90 p-2 text-black shadow-sm transition hover:scale-95"
          aria-label="Next"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <ProductSlide
            key={current.id}
            product={current}
            isActive
            direction={direction}
            onQuickBuy={handleQuickBuy}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
