"use client";

import styles from "../styles/runway.module.css";

import Navbar from "@/components/navigation/navbar";
import ProductQuickAdd from "@/components/products/product-quick-add";
import { Button } from "@/components/ui/button";
import { runwayLooks } from "@/features/runway/data/looks";
import { selectAllProducts } from "@/features/products/products-slice";
import { selectWishlistIds, wishlistToggled } from "@/features/wishlist/wishlist-slice";
import { cn } from "@/lib/utils";
import { getColorHex, getProductColors, resolveProductColor } from "@/features/products/lib/product-colors";
import type { ProductProps } from "@/types/products";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Heart, Maximize2, Mouse, Plus, ShoppingBag, UserRound } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import ReelsModeNav from "@/features/reels/components/reels-mode-nav";
import type { RunwaySceneColor } from "./runway-scene";
import RunwayColorPicker from "./runway-color-picker";

const RunwayScene = dynamic(() => import("./runway-scene"), { ssr: false });
const CharacterEditor = dynamic(() => import("./character-editor"), { ssr: false });

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const positions = [66, 43, 26, 12];
const scales = [1, 0.74, 0.52, 0.34];

export default function RunwayExperience() {
  const [index, setIndex] = useState(0);
  const [quickAdd, setQuickAdd] = useState<ProductProps | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const [sceneStatus, setSceneStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const editorTrigger = useRef<HTMLButtonElement | null>(null);
  const skipEditorRestore = useRef(false);
  const lastMove = useRef(0);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const pointerSwiped = useRef(false);
  const dispatch = useDispatch();
  const saved = useSelector(selectWishlistIds);
  const catalog = useSelector(selectAllProducts);
  const looks = useMemo(() => runwayLooks.map((item) => ({ ...item,
    products: item.products.map((product) => catalog.find((current) => current.id === product.id) ?? product),
  })), [catalog]);
  const look = looks[index];
  const sceneColors = useMemo<RunwaySceneColor[]>(() => looks.map((item) => {
    const product = item.products[0];
    const color = resolveProductColor(product, selectedColors[product.id]);
    const hex = color ? getColorHex(color.value, color.colorHex) : null;
    return { hex };
  }), [looks, selectedColors]);
  const chooseColor = (product: ProductProps, value: string) => {
    const variant = getProductColors(product).find((color) => color.value === value && color.available);
    if (variant && product.inStock) setSelectedColors((current) => ({ ...current, [product.id]: variant.value }));
  };

  const move = useCallback((direction: number) => {
    const now = performance.now();
    if (now - lastMove.current < 650) return;
    lastMove.current = now;
    setIndex((current) => (current + direction + runwayLooks.length) % runwayLooks.length);
  }, []);

  useEffect(() => {
    const element = stage.current;
    if (!element || quickAdd || expandedIndex !== null) return;
    let delta = 0;
    let lastWheel = 0;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheel > 180) delta = 0;
      lastWheel = now;
      delta += Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) > 55) {
        move(delta > 0 ? 1 : -1);
        delta = 0;
      }
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [move, quickAdd, expandedIndex]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(`button:not(.${styles["runway-model"]}), a`)) return;
    pointerSwiped.current = false;
    pointer.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointer.current) return;
    const dx = pointer.current.x - event.clientX;
    const dy = pointer.current.y - event.clientY;
    pointer.current = null;
    const distance = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    if (Math.abs(distance) > 45) {
      pointerSwiped.current = true;
      move(distance > 0 ? 1 : -1);
    }
  };

  const savePiece = (product: ProductProps) => {
    dispatch(wishlistToggled(product.id));
    toast(saved.includes(product.id) ? "Removed from your wishlist" : "Saved to your wishlist", { description: product.name });
  };

  return (
    <div className={styles["runway-page"]}>
      <Navbar />
      <div className={styles["runway-toolbar"]}>
        <div className={styles["runway-breadcrumb"]}><Link href="/">Home</Link><ChevronRight aria-hidden="true" /><Link href="/reels">Discover</Link><ChevronRight aria-hidden="true" /><span>3D Runway</span></div>
        <ReelsModeNav active="3d" />
        <span className={styles["runway-toolbar-note"]}>A new perspective on style</span>
      </div>

      <main className={styles["runway-experience"]} onKeyDown={(event) => {
        if (quickAdd || expandedIndex !== null || (event.target as HTMLElement).closest("input, select, textarea, [role=dialog], [role=radiogroup]")) return;
        if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
          event.preventDefault();
          move(["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1);
        }
      }}>
        <section className={styles["runway-world"]} aria-label="Interactive fashion runway">
          <div className={styles["runway-intro"]}>
            <p className={styles["runway-eyebrow"]}><span /> AURELA STUDIO / THE RUNWAY EDIT</p>
            <h1>Style, in a new dimension.</h1>
            <p>Select a character to explore in 360°.</p>
          </div>

          <div ref={stage} className={styles["runway-stage"]} role="region" aria-roledescription="carousel" aria-label="Runway looks. Scroll, swipe, or use the arrow keys to explore." tabIndex={0} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { pointer.current = null; }}>
            <span className={styles["runway-watermark"]} aria-hidden="true">AURELA</span>
            <div className={styles["runway-horizon"]} aria-hidden="true" />
            <div className={cn(styles["runway-cast"], sceneStatus === "ready" && styles["has-webgl"])}>
              {expandedIndex === null && <RunwayScene index={index} colors={sceneColors} onStatus={setSceneStatus} />}
              {runwayLooks.map((item, itemIndex) => {
                const offset = (itemIndex - index + runwayLooks.length) % runwayLooks.length;
                return (
                  <button key={item.id} type="button" className={cn(styles["runway-model"], offset === 0 && styles["is-current"])} aria-label={`Expand character ${itemIndex + 1}: ${item.title}`} aria-haspopup="dialog" aria-current={offset === 0 ? "true" : undefined} onClick={(event) => { if (event.detail === 0 || !pointerSwiped.current) { editorTrigger.current = event.currentTarget; skipEditorRestore.current = false; setIndex(itemIndex); setExpandedIndex(itemIndex); } }} style={{
                    left: `${positions[offset]}%`,
                    transform: `translateX(-50%) scale(${scales[offset]})`,
                    filter: `blur(${offset * 1.35}px)`,
                    opacity: 1 - offset * 0.22,
                    zIndex: runwayLooks.length - offset,
                  } as CSSProperties}>
                    <span className={styles["runway-model-placeholder"]} aria-hidden="true"><UserRound /></span>
                    <span className={styles["runway-expand-hint"]}><Maximize2 aria-hidden="true" /> Explore 360°</span>
                  </button>
                );
              })}
            </div>
            <span className={styles["runway-stage-label"]} aria-hidden="true">THE COLLECTION / 01</span>
            <div className={styles["runway-scroll-cue"]} aria-hidden="true"><Mouse /><span>SCROLL TO EXPLORE</span><ArrowDown /></div>
            {sceneStatus !== "ready" && <p role="status" className={styles["runway-preview-unavailable"]}>{sceneStatus === "loading" ? "Loading lightweight 3D characters…" : "Characters unavailable. Open a character to try again."}</p>}
          </div>

          <div className={styles["runway-look-footer"]}>
            <div className={styles["runway-look-copy"]} aria-live="polite" aria-atomic="true">
              <p className={styles["runway-eyebrow"]}>LOOK {String(index + 1).padStart(2, "0")} <span className={styles["runway-copy-divider"]}>/</span> {look.collection}</p>
              <h2>{look.title}</h2>
              <p>{look.note}</p>
              <button type="button" className={styles["runway-shop-link"]} onClick={() => { rail.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); rail.current?.focus({ preventScroll: true }); }}>Shop this look <ArrowUpRight aria-hidden="true" /></button>
              <button type="button" className={[styles["runway-shop-link"], styles["runway-open-editor"]].join(" ")} onClick={(event) => { editorTrigger.current = event.currentTarget; skipEditorRestore.current = false; setExpandedIndex(index); }}><Maximize2 aria-hidden="true" /> Expand &amp; customize</button>
            </div>
            <div className={styles["runway-pagination"]}>
              <div className={styles["runway-arrow-controls"]}>
                <Button variant="outline" size="icon-lg" className="rounded-full" aria-label="Previous look" onClick={() => move(-1)}><ArrowLeft /></Button>
                <span><strong>{String(index + 1).padStart(2, "0")}</strong><span> / {String(runwayLooks.length).padStart(2, "0")}</span></span>
                <Button variant="outline" size="icon-lg" className="rounded-full" aria-label="Next look" onClick={() => move(1)}><ArrowRight /></Button>
              </div>
              <div className={styles["runway-progress"]} role="group" aria-label="Choose a runway look">{runwayLooks.map((item, itemIndex) => <button key={item.id} type="button" aria-label={`Go to look ${itemIndex + 1}: ${item.title}`} aria-current={index === itemIndex ? "true" : undefined} onClick={() => setIndex(itemIndex)}><span className={cn(index === itemIndex && styles["is-active"])} /></button>)}</div>
            </div>
          </div>
        </section>

        <aside ref={rail} tabIndex={-1} className={styles["runway-shop"]} aria-label="Shop the current look">
          <div className={styles["runway-shop-heading"]}><div><p className={styles["runway-eyebrow"]}>FROM RUNWAY TO WARDROBE</p><h2>Shop the look</h2></div><ShoppingBag aria-hidden="true" /></div>
          <div className={styles["runway-shop-caption"]}><span>LOOK {String(index + 1).padStart(2, "0")}</span><span>{look.products.length} curated pieces</span></div>
          <div className={styles["runway-products"]} key={look.id}>
            {look.products.map((product, productIndex) => (
              <article key={product.id} className={styles["runway-product"]}>
                <div className={styles["runway-product-visual"]}>
                  <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}><Image src={product.image} alt={product.name} fill sizes="(max-width: 760px) 40vw, 280px" className="object-contain" priority={productIndex === 0} /></Link>
                  <Button variant="ghost" size="icon-sm" className={styles["runway-save"]} aria-label={`${saved.includes(product.id) ? "Unsave" : "Save"} ${product.name}`} aria-pressed={saved.includes(product.id)} onClick={() => savePiece(product)}><Heart fill={saved.includes(product.id) ? "currentColor" : "none"} /></Button>
                  <span className={styles["runway-product-number"]}>0{productIndex + 1}</span>
                </div>
                <div className={styles["runway-product-info"]}><div><p>AURELA STUDIO</p><Link href={`/products/${product.id}`}>{product.name}</Link><span>{money(product.price)}</span></div><Button variant="outline" size="icon-sm" className="rounded-full" aria-label={`Add ${product.name} to bag`} onClick={() => setQuickAdd(product)}><Plus /></Button></div>
                <RunwayColorPicker product={product} value={resolveProductColor(product, selectedColors[product.id])?.value} onChange={(value) => chooseColor(product, value)} preview={productIndex === 0} />
              </article>
            ))}
          </div>
          <Link className={styles["runway-collection-link"]} href="/products">Explore all pieces <ArrowUpRight aria-hidden="true" /></Link>
        </aside>
      </main>
      <div className={styles["runway-bottom-bar"]}><span>Considered pieces. Endless possibilities.</span><Link href="/reels">Back to reels <ArrowUpRight aria-hidden="true" /></Link></div>
      {expandedIndex !== null && <CharacterEditor look={looks[expandedIndex]} product={looks[expandedIndex].products[0]}
        selectedColor={selectedColors[looks[expandedIndex].products[0].id]}
        onColorChange={(value) => chooseColor(looks[expandedIndex].products[0], value)}
        onOpenChange={(open) => { if (!open) { setExpandedIndex(null); setSceneStatus("loading"); } }}
        onRestoreFocus={() => { if (!skipEditorRestore.current) editorTrigger.current?.focus(); }}
        onShop={() => { skipEditorRestore.current = true; setQuickAdd(looks[expandedIndex].products[0]); setExpandedIndex(null); setSceneStatus("loading"); }} />}
      {quickAdd && <ProductQuickAdd key={quickAdd.id} product={quickAdd} open
        initialVariants={(() => { const color = resolveProductColor(quickAdd, selectedColors[quickAdd.id]); return color ? { [color.type]: color.value } : {}; })()}
        onVariantChange={(variants) => { const color = getProductColors(quickAdd).find((option) => variants[option.type] === option.value); if (color) chooseColor(quickAdd, color.value); }}
        onOpenChange={(open) => { if (!open) setQuickAdd(null); }} />}
    </div>
  );
}

