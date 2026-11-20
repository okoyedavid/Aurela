import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { humanModels, type HumanLook } from "@/features/runway/data/models";

// Optimized binary buffers are cached; parsed scenes and GPU resources are owned
// by each mounted view and released on close. No skeleton or animation runtime.
const buffers = new Map<string, Promise<ArrayBuffer>>();

export async function loadRunwayHuman(look: HumanLook): Promise<THREE.Group> {
  const url = humanModels[look.model].url;
  if (!buffers.has(url)) {
    buffers.set(url, fetch(url).then((response) => {
      if (!response.ok) throw new Error("The character could not be loaded.");
      return response.arrayBuffer();
    }).catch((error) => { buffers.delete(url); throw error; }));
  }
  const bytes = await buffers.get(url)!;
  const { scene } = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(bytes.slice(0), "");
  const model = new THREE.Group();
  model.add(scene);
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const prepare = (material: THREE.Material) => {
      if (!(material instanceof THREE.MeshStandardMaterial)) return material;
      // Keep skin, eye, hair and fabric textures. Recolor only catalog garment materials.
      if (look.silhouette === "casual" && material.name === "Shirt") material.color.set("#eee9dc");
      material.userData.originalColor = material.color.clone();
      return material;
    };
    object.material = Array.isArray(object.material) ? object.material.map(prepare) : prepare(object.material);
    object.castShadow = false;
    object.receiveShadow = false;
  });
  return model;
}

export function applyGarmentColor(model: THREE.Object3D, materialNames: readonly string[], hex: string | null) {
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (!materialNames.includes(material.name) || !(material instanceof THREE.MeshStandardMaterial)) continue;
      if (hex) material.color.set(hex);
      else if (material.userData.originalColor) material.color.copy(material.userData.originalColor);
    }
  });
}

export function disposeRunwayHuman(model: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => {
    for (const value of Object.values(material)) if (value instanceof THREE.Texture) textures.add(value);
    material.dispose();
  });
  textures.forEach((texture) => {
    // GLTFLoader uses ImageBitmap where supported; release its decoded CPU memory too.
    if (typeof ImageBitmap !== "undefined" && texture.image instanceof ImageBitmap) texture.image.close();
    texture.dispose();
  });
  model.clear();
}

export function addStudioLighting(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb6bac0, 1.8));
  const key = new THREE.DirectionalLight(0xfff5e9, 2.8);
  key.position.set(3, 5, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe0e8ff, 1.6);
  fill.position.set(-4, 3, -3);
  scene.add(fill);
}
