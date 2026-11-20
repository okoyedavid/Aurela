"use client";

import styles from "../styles/runway.module.css";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { runwayLooks } from "@/features/runway/data/looks";
import { addStudioLighting, applyGarmentColor, disposeRunwayHuman, loadRunwayHuman } from "@/features/runway/lib/human-model";

export type RunwaySceneColor = { hex: string | null };
type Props = { index: number; colors: RunwaySceneColor[]; onStatus: (status: "ready" | "unavailable") => void };

export default function RunwayScene({ index, colors, onStatus }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef({ index, colors, onStatus });
  const updateScene = useRef<(() => void) | null>(null);
  useEffect(() => {
    latest.current = { index, colors, onStatus };
    updateScene.current?.();
  }, [index, colors, onStatus]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { latest.current.onStatus("unavailable"); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.dataset.renderer = "threejs-human";
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xeff2ef, 12, 33);
    addStudioLighting(scene);
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
    camera.position.set(0, 1.45, 6);
    const models: { group: THREE.Group; target: THREE.Vector3; scale: number; index: number }[] = [];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, frame = 0, previous = 0;
    let disposed = false, visible = true, lost = false;

    const render = (time: number) => {
      frame = 0;
      if (disposed || document.hidden || !visible || lost) return;
      const delta = Math.min((time - previous) / 1000 || 1 / 60, 0.05);
      previous = time;
      const alpha = motion.matches ? 1 : 1 - Math.exp(-delta * 10);
      let moving = false;
      for (const model of models) {
        model.group.position.lerp(model.target, alpha);
        const scale = THREE.MathUtils.lerp(model.group.scale.x, model.scale, alpha);
        model.group.scale.setScalar(scale);
        if (model.group.position.distanceToSquared(model.target) > 0.000001 || Math.abs(scale - model.scale) > 0.0001) moving = true;
      }
      renderer.render(scene, camera);
      if (moving) invalidate();
    };
    function invalidate() {
      if (!frame && !disposed && visible && !document.hidden && !lost) frame = requestAnimationFrame(render);
    }
    const update = () => {
      const frustum = 2 * Math.tan(THREE.MathUtils.degToRad(15)) * 6 * width / height;
      models.forEach((model) => {
        const offset = (model.index - latest.current.index + runwayLooks.length) % runwayLooks.length;
        const depth = [0, 2.3, 4.6, 8][offset];
        model.target.set(([0.66, 0.43, 0.26, 0.12][offset] - 0.5) * frustum * (6 + depth) / 6, 0, -depth);
        model.scale = [1, 0.95, 0.88, 0.78][offset];
        applyGarmentColor(model.group, runwayLooks[model.index].garmentMaterials, latest.current.colors[model.index]?.hex ?? null);
      });
      invalidate();
    };
    updateScene.current = update;
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      width = Math.max(bounds.width, 1); height = Math.max(bounds.height, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height; camera.updateProjectionMatrix();
      update();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) invalidate();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(element);
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else invalidate();
    };
    const onLost = (event: Event) => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; latest.current.onStatus("unavailable"); };
    const onRestored = () => { lost = false; latest.current.onStatus("ready"); invalidate(); };
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", invalidate);
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    renderer.domElement.addEventListener("webglcontextrestored", onRestored);

    Promise.all(runwayLooks.map(async (look, lookIndex) => {
      const group = await loadRunwayHuman(look);
      if (disposed) { disposeRunwayHuman(group); return; }
      group.rotation.y = -0.12;
      scene.add(group);
      models.push({ group, target: new THREE.Vector3(), scale: 1, index: lookIndex });
    })).then(() => {
      if (disposed) return;
      resize();
      models.forEach((model) => { model.group.position.copy(model.target); model.group.scale.setScalar(model.scale); });
      latest.current.onStatus("ready");
      invalidate();
    }).catch(() => { if (!disposed) latest.current.onStatus("unavailable"); });
    resize();
    return () => {
      disposed = true;
      updateScene.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect(); intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", invalidate);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      renderer.domElement.removeEventListener("webglcontextrestored", onRestored);
      models.forEach(({ group }) => disposeRunwayHuman(group));
      scene.clear(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div ref={host} className={styles["runway-webgl"]} aria-hidden="true" />;
}
