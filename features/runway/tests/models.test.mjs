import assert from "node:assert/strict";
import { test } from "node:test";
import { getColorHex, getProductColors } from "../../products/lib/product-colors.ts";
import { runwayLooks } from "../data/looks.ts";
import fs from "node:fs";
import { humanModels } from "../data/models.ts";
import { NodeIO, getBounds } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { MeshoptDecoder } from "meshoptimizer";
import sharp from "sharp";

test("every runway look uses a real mesh and declared clothing materials", () => {
  for (const look of runwayLooks) {
    for (const color of getProductColors(look.products[0])) assert.ok(getColorHex(color.value, color.colorHex));
    assert.ok(humanModels[look.model]);
    assert.ok(look.garmentMaterials.length > 0);
  }
});

test("detailed characters retain textures within download and geometry budgets, without rigs", async () => {
  await MeshoptDecoder.ready;
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.decoder": MeshoptDecoder });
  for (const [id, asset] of Object.entries(humanModels)) {
    const file = fs.readFileSync(new URL(`../../../public${asset.url}`, import.meta.url));
    assert.equal(file.toString("ascii", 0, 4), "glTF");
    assert.equal(file.length, asset.bytes, "UI download size must match the shipped asset");
    assert.ok(file.length < 900 * 1024, "Each textured model must be smaller than 900 KB");
    const document = await io.readBinary(file);
    const root = document.getRoot();
    assert.equal(root.listAnimations().length, 0);
    assert.equal(root.listSkins().length, 0);
    assert.ok(root.listTextures().length > 0, "Preserve facial and fabric detail");
    const triangles = root.listMeshes().reduce((sum, mesh) => sum + mesh.listPrimitives().reduce((count, prim) => count + prim.getIndices().getCount() / 3, 0), 0);
    assert.equal(triangles, asset.triangles);
    assert.ok(triangles < 45000);
    const { min, max } = getBounds(root.listScenes()[0]);
    assert.ok(Math.abs(max[1] - min[1] - 2.8) < 0.01, "Character geometry must have a normalized height");
    const names = new Set(root.listMaterials().map((material) => material.getName()));
    assert.ok(names.has("Skin"));
    for (const look of runwayLooks.filter((look) => look.model === id)) {
      for (const name of look.garmentMaterials) assert.ok(names.has(name), `Missing clothing material: ${name}`);
      assert.ok(!look.garmentMaterials.includes("Skin"));
    }
    for (const texture of root.listTextures()) {
      const metadata = await sharp(texture.getImage()).metadata();
      assert.equal(metadata.format, "webp");
      assert.ok(metadata.width <= 1024 && metadata.height <= 1024);
    }
  }
});
