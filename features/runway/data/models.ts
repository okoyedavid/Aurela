export const humanModels = {
  "woman-tailored": { url: "/reels/models/woman-tailored.glb", bytes: 563024, triangles: 20827 },
  "man-casual": { url: "/reels/models/man-casual.glb", bytes: 723892, triangles: 42676 },
  "woman-gown": { url: "/reels/models/woman-gown.glb", bytes: 409092, triangles: 22906 },
} as const;
export type HumanModelId = keyof typeof humanModels;

export type HumanLook = {
  model: HumanModelId;
  silhouette: "tailored" | "casual" | "gown";
  garmentMaterials: readonly string[];
  baseColor: string | null;
};
