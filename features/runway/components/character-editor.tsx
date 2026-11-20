"use client";

import styles from "../styles/runway.module.css";

import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { humanModels, type HumanLook } from "@/features/runway/data/models";
import { addStudioLighting, applyGarmentColor, disposeRunwayHuman, loadRunwayHuman } from "@/features/runway/lib/human-model";
import { getColorHex, resolveProductColor } from "@/features/products/lib/product-colors";
import type { ProductProps } from "@/types/products";
import { ArrowLeft, ArrowRight, Box, LoaderCircle, Minus, Plus, RotateCcw, ShoppingBag, X } from "lucide-react";
import RunwayColorPicker from "./runway-color-picker";

type ViewerApi = { reset: () => void; turn: (angle: number) => void; front: (back?: boolean) => void; zoom: (factor: number) => void };
type Status = "loading" | "ready" | "unavailable";
type Props = {
  look: HumanLook & { title: string };
  product: ProductProps;
  selectedColor?: string;
  onColorChange: (value: string) => void;
  onOpenChange: (open: boolean) => void;
  onShop: () => void;
  onRestoreFocus: () => void;
};

export default function CharacterEditor({ look, product, selectedColor, onColorChange, onOpenChange, onShop, onRestoreFocus }: Props) {
  const [status, setStatus] = useState<Status>("loading");
  const [retry, setRetry] = useState(0);
  const api = useRef<ViewerApi | null>(null);
  const color = resolveProductColor(product, selectedColor);
  const hex = color ? getColorHex(color.value, color.colorHex) : null;
  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={[styles["runway-page"], styles["runway-editor"]].join(" ")} style={{ translate: "none" }} onCloseAutoFocus={(event) => { event.preventDefault(); onRestoreFocus(); }}>
        <header className={styles["character-editor-header"]}>
          <div><p className={styles["runway-eyebrow"]}>AURELA / 360° STUDIO</p><DialogTitle>{look.title}</DialogTitle></div>
          <DialogClose asChild><Button variant="outline" size="icon-lg" className="rounded-full" aria-label="Close character editor"><X /></Button></DialogClose>
        </header>
        <div className={styles["character-editor-body"]}>
          <div className={styles["character-editor-stage"]}>
            <span className={styles["character-studio-wordmark"]} aria-hidden="true">AURELA</span>
            <HumanViewer key={retry} look={look} color={hex} api={api} onStatus={setStatus} />
            {status === "loading" && <div role="status" className={styles["character-editor-status"]}><LoaderCircle className="animate-spin" /><span>Opening your character…</span></div>}
            {status === "unavailable" && <div role="status" className={styles["character-editor-status"]}><Box /><span>The 3D preview could not be opened.</span><Button variant="outline" onClick={() => { setStatus("loading"); setRetry((value) => value + 1); }}>Try again</Button></div>}
            <div className={styles["character-view-controls"]} aria-label="Character view controls">
              <Button variant="outline" size="icon-lg" aria-label="Rotate character left" disabled={status !== "ready"} onClick={() => api.current?.turn(-Math.PI / 4)}><ArrowLeft /></Button>
              <Button variant="outline" size="sm" disabled={status !== "ready"} onClick={() => api.current?.front()}>Front</Button>
              <Button variant="outline" size="sm" disabled={status !== "ready"} onClick={() => api.current?.front(true)}>Back</Button>
              <Button variant="outline" size="icon-lg" aria-label="Rotate character right" disabled={status !== "ready"} onClick={() => api.current?.turn(Math.PI / 4)}><ArrowRight /></Button>
              <span className={styles["character-control-divider"]} />
              <Button variant="outline" size="icon-lg" aria-label="Zoom out" disabled={status !== "ready"} onClick={() => api.current?.zoom(1.2)}><Minus /></Button>
              <Button variant="outline" size="icon-lg" aria-label="Zoom in" disabled={status !== "ready"} onClick={() => api.current?.zoom(0.8)}><Plus /></Button>
              <Button variant="outline" size="icon-lg" aria-label="Reset character view" disabled={status !== "ready"} onClick={() => api.current?.reset()}><RotateCcw /></Button>
            </div>
          </div>
          <aside className={styles["character-editor-details"]}>
            <div><p className={styles["runway-eyebrow"]}>MAKE IT YOUR OWN</p><h2>{product.name}</h2><p className={styles["character-editor-price"]}>${product.price.toFixed(2)}</p></div>
            <DialogDescription>Drag the character to explore every angle. Scroll or pinch to get closer.</DialogDescription>
            <RunwayColorPicker product={product} value={color?.value} onChange={onColorChange} preview />
            <p className={styles["character-model-note"]}>An illustrative 3D outfit preview. Color options come from this product; the model does not represent its exact fit or construction.</p>
            <Button size="lg" disabled={!product.inStock} onClick={onShop}><ShoppingBag data-icon="inline-start" /> Choose size &amp; add to bag</Button>
            <div className={styles["character-editor-footnote"]}><Box /><span>Lightweight 3D · {Math.round(humanModels[look.model].bytes / 1024)} KB model</span></div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function HumanViewer({ look, color, api, onStatus }: { look: HumanLook; color: string | null; api: RefObject<ViewerApi | null>; onStatus: (status: Status) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const liveColor = useRef(color);
  const repaint = useRef<(() => void) | null>(null);
  useEffect(() => { liveColor.current = color; repaint.current?.(); }, [color]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { onStatus("unavailable"); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.dataset.renderer = "threejs-human-editor";
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    addStudioLighting(scene);
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 30);
    camera.position.set(0, 1.6, 5.8);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.4, 0);
    controls.enablePan = false;
    controls.enableDamping = false;
    controls.autoRotate = false;
    controls.minDistance = 2.8;
    controls.maxDistance = 8;
    controls.minPolarAngle = 0.3;
    controls.maxPolarAngle = Math.PI - 0.3;
    controls.update(); controls.saveState();
    const platform = new THREE.Mesh(new THREE.CircleGeometry(0.88, 40), new THREE.MeshLambertMaterial({ color: "#e0e6dd" }));
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = -0.015;
    scene.add(platform);
    let model: THREE.Group | null = null;
    let frame = 0, renderCount = 0;
    let disposed = false, lost = false;
    const draw = () => {
      frame = 0;
      if (disposed || lost || document.hidden) return;
      renderer.render(scene, camera);
      renderer.domElement.dataset.renderCount = String(++renderCount);
      renderer.domElement.dataset.azimuth = controls.getAzimuthalAngle().toFixed(3);
    };
    const invalidate = () => { if (!frame && !disposed && !lost && !document.hidden) frame = requestAnimationFrame(draw); };
    const recolor = () => { if (model) applyGarmentColor(model, look.garmentMaterials, liveColor.current); invalidate(); };
    repaint.current = recolor;
    controls.addEventListener("change", invalidate);
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      const width = Math.max(bounds.width, 1), height = Math.max(bounds.height, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height; camera.updateProjectionMatrix();
      invalidate();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else invalidate(); };
    const onLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; onStatus("unavailable"); };
    const onRestored = () => { lost = false; onStatus("ready"); invalidate(); };
    document.addEventListener("visibilitychange", onVisibility);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    renderer.domElement.addEventListener("webglcontextrestored", onRestored);
    loadRunwayHuman(look).then((loaded) => {
      if (disposed) { disposeRunwayHuman(loaded); return; }
      model = loaded; scene.add(model); recolor();
      api.current = {
        reset: () => controls.reset(),
        turn: (angle) => {
          const offset = camera.position.clone().sub(controls.target).applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
          camera.position.copy(controls.target).add(offset); controls.update();
        },
        front: (back = false) => { camera.position.set(0, 1.6, back ? -5.8 : 5.8); controls.target.set(0, 1.4, 0); controls.update(); },
        zoom: (factor) => { camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target); controls.update(); },
      };
      onStatus("ready");
    }).catch(() => { if (!disposed) onStatus("unavailable"); });
    resize();
    return () => {
      disposed = true; api.current = null; repaint.current = null;
      cancelAnimationFrame(frame); observer.disconnect(); controls.dispose();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onRestored);
      if (model) disposeRunwayHuman(model);
      platform.geometry.dispose(); platform.material.dispose();
      scene.clear(); renderer.dispose(); renderer.domElement.remove();
    };
  }, [look, api, onStatus]);
  return <div ref={host} className={styles["character-canvas"]} role="region" aria-label="Interactive 360 degree character. Use arrow keys to rotate, plus or minus to zoom, Home to reset." tabIndex={0} onKeyDown={(event) => {
    const actions: Record<string, () => void> = {
      ArrowLeft: () => api.current?.turn(-Math.PI / 8), ArrowRight: () => api.current?.turn(Math.PI / 8),
      "+": () => api.current?.zoom(0.9), "=": () => api.current?.zoom(0.9), "-": () => api.current?.zoom(1.1), Home: () => api.current?.reset(),
    };
    if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
  }} />;
}
