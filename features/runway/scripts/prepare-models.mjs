// Offline only: no optimization, rigging or cloth simulation runs in the browser.
// Run from the repository root with npm run models:prepare.
// Download CC0 sources listed in public/reels/models/LICENSE.md into .local/models/.
import fs from "node:fs/promises";
import { NodeIO, getBounds } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { flatten, transformPrimitive, weld, simplifyPrimitive, prune, dedup, meshopt } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";
import sharp from "sharp";
import * as THREE from "three";

await Promise.all([MeshoptEncoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ "meshopt.encoder": MeshoptEncoder });
const report = [];
for (const [source, id, page] of [
  ["harper", "woman-tailored", "harper-3d-person-woman-business-suit-standing-9fde7f08"],
  ["sam", "man-casual", "hands-behind-back-3d-person-standing-26683679"],
  ["riley", "woman-gown", "riley-3d-person-woman-standing-8d40398f"],
]) {
  const doc = await io.read(`.local/models/${source}-source.glb`);
  const root = doc.getRoot();
  // Closed mouths do not need a hidden 7,120-triangle set of teeth.
  for (const node of root.listNodes()) if (node.getMesh()?.getName() === "teeth_base") node.dispose();
  await doc.transform(flatten(), prune(), weld());
  const scene = root.listScenes()[0];
  const { min, max } = getBounds(scene);
  const scale = 2.8 / (max[1] - min[1]);
  const normalize = new THREE.Matrix4().makeScale(scale, scale, scale).multiply(new THREE.Matrix4().makeTranslation(-(min[0] + max[0]) / 2, -min[1], -(min[2] + max[2]) / 2));
  for (const node of root.listNodes()) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    const matrix = normalize.clone().multiply(new THREE.Matrix4().fromArray(node.getWorldMatrix()));
    for (const prim of mesh.listPrimitives()) transformPrimitive(prim, matrix.elements);
    node.setMatrix(new THREE.Matrix4().elements);
  }
  for (const material of root.listMaterials()) {
    const name = material.getName();
    material.setExtension("KHR_materials_specular", null);
    material.setMetallicFactor(0).setRoughnessFactor(0.82);
    const isSuit = name.includes("male_elegantsuit01");
    const isTop = name.includes("| top") || name.includes("T-shirt");
    const isBottom = name.includes("| bottom") || name.includes("female_casualsuit01");
    if (isSuit || isTop || isBottom) {
      material.setName(isSuit ? "Suit" : isTop ? "Shirt" : "Pants");
      material.setBaseColorFactor([1, 1, 1, 1]);
      const texture = material.getBaseColorTexture();
      if (texture) {
        // Neutral fabric shading allows faithful product colors while retaining seams.
        const { data, info } = await sharp(texture.getImage()).resize(512, 512, { fit: "inside" }).removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
        for (let pixel = 0; pixel < data.length; pixel++) data[pixel] = Math.round(180 + data[pixel] * 0.28);
        const image = await sharp(data, { raw: info }).png().toBuffer();
        texture.setImage(image).setMimeType("image/png");
      }
      if (source === "sam" && isBottom) material.setBaseColorFactor([0.035, 0.04, 0.045, 1]);
    } else if (name.endsWith(".body")) material.setName("Skin");
    if (source === "riley" && isTop) material.setName("Bodice");
    if (source === "riley" && isBottom) {
      for (const mesh of root.listMeshes()) for (const prim of mesh.listPrimitives()) if (prim.getMaterial() === material) mesh.removePrimitive(prim);
    }
  }
  for (const mesh of root.listMeshes()) for (const prim of mesh.listPrimitives()) {
    const name = mesh.getName();
    simplifyPrimitive(prim, { simplifier: MeshoptSimplifier, ratio: /roots/.test(name) ? 0.14 : /base/.test(name) ? 0.48 : 0.85, error: /roots/.test(name) ? 0.015 : 0.001 });
  }
  if (source === "riley") {
    // Original illustrative gown adaptation: the source supplies the fitted top.
    const profile = [new THREE.Vector2(0.50, 0.06), new THREE.Vector2(0.49, 0.15), new THREE.Vector2(0.44, 0.46), new THREE.Vector2(0.37, 0.85), new THREE.Vector2(0.31, 1.18), new THREE.Vector2(0.28, 1.40), new THREE.Vector2(0.235, 1.62)];
    const geometry = new THREE.LatheGeometry(profile, 64);
    const positions = geometry.getAttribute("position");
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
      const angle = Math.atan2(x, z);
      const fold = 1 + Math.sin(angle * 12) * 0.035 * Math.max(0, (1.62 - y) / 1.62);
      positions.setXYZ(i, x * fold, y, z * fold * 0.83 - 0.015);
    }
    geometry.computeVertexNormals();
    const buffer = root.listBuffers()[0];
    const accessor = (name, type, array) => doc.createAccessor(name).setType(type).setArray(array).setBuffer(buffer);
    const material = doc.createMaterial("Dress").setBaseColorFactor([1, 1, 1, 1]).setMetallicFactor(0).setRoughnessFactor(0.72).setDoubleSided(true);
    const prim = doc.createPrimitive().setAttribute("POSITION", accessor("skirt-position", "VEC3", positions.array)).setAttribute("NORMAL", accessor("skirt-normal", "VEC3", geometry.getAttribute("normal").array)).setIndices(accessor("skirt-index", "SCALAR", geometry.index.array)).setMaterial(material);
    scene.addChild(doc.createNode("Draped skirt").setMesh(doc.createMesh("Draped skirt").addPrimitive(prim)));
  }
  await doc.transform(prune(), dedup());
  for (const texture of root.listTextures()) {
    const skin = /female_diffuse|male_diffuse/.test(texture.getName());
    const limit = skin ? 1024 : 512;
    const image = await sharp(texture.getImage()).resize(limit, limit, { fit: "inside", withoutEnlargement: true }).webp({ quality: skin ? 84 : 78, effort: 5 }).toBuffer();
    texture.setImage(image).setMimeType("image/webp");
  }
  for (const node of root.listNodes()) node.setExtras({});
  for (const mesh of root.listMeshes()) mesh.setExtras({});
  const triangles = root.listMeshes().reduce((sum, mesh) => sum + mesh.listPrimitives().reduce((n, p) => n + p.getIndices().getCount() / 3, 0), 0);
  await doc.transform(meshopt({ encoder: MeshoptEncoder, level: "medium" }));
  const binary = await io.writeBinary(doc);
  await fs.writeFile(`public/reels/models/${id}.glb`, binary);
  report.push({ id, source: `https://www.innerscene.com/tools/library/3d-parts/${page}`, author: "Innerscene, adapted from MakeHuman CC0 assets", license: "CC0-1.0", bytes: binary.byteLength, triangles, textures: root.listTextures().length });
}
await fs.writeFile("public/reels/models/manifest.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
