# Aurela 3D Runway

Open `/reels/3d`, or select **3D Runway** from Discover. Select any character, or **Expand & customize**, to open its fullscreen editor.

## Real human models

Both the runway and the editor render detailed, textured human meshes with Three.js: anatomical faces, hair, eyes, hands and fitted clothes. The character view does not load the previous photographic sprite atlas, garment masks or blocky Quaternius models. Product photographs remain in the shopping rail as catalog references.

Original CC0 models by Innerscene, adapted from MakeHuman/MPFB CC0 assets:

- [Harper / tailored suit](https://www.innerscene.com/tools/library/3d-parts/harper-3d-person-woman-business-suit-standing-9fde7f08): 563,024 bytes, 20,827 triangles.
- [Sam / casual separates](https://www.innerscene.com/tools/library/3d-parts/hands-behind-back-3d-person-standing-26683679): 723,892 bytes, 42,676 triangles.
- [Riley / gown adaptation](https://www.innerscene.com/tools/library/3d-parts/riley-3d-person-woman-standing-8d40398f): 409,092 bytes, 22,906 triangles.

The local assets, source URLs and license notice are in `public/reels/models/`. Run `npm run models:prepare` from the repository root with the three downloaded originals in `.local/models/`. The tool is `features/runway/scripts/prepare-models.mjs`. This offline process removes hidden teeth, simplifies geometry, normalizes height, neutralizes garment textures for tinting, resizes textures and applies Meshopt geometry compression. The shipped assets have no skeleton or animation tracks. Three.js's bundled Meshopt decoder runs once during loading; no external decoder service is needed.

Gowns combine Riley's fitted top with an original skirt mesh with folds, prepared offline. These are illustrative outfit previews, not scans of the catalog garments or accurate fit simulations; this is stated in the editor. Actual garment assets are needed to represent the exact catalog construction.

## Fullscreen editor

A Radix dialog fills the viewport, locks background interaction, supports Escape and a close button, and restores focus when closed. Its character can be orbited through 360 degrees by dragging, rotated with keyboard arrows or the left/right controls, zoomed with a wheel, pinch, plus/minus controls, and returned to front, back or the original view. Mobile users scroll below the canvas for customization and shopping.

The editor shares the runway's product color state. Available color variants recolor only the declared clothing materials, leaving skin, hair and shoes unchanged. Disabled variants remain unavailable. Products without color variants have no color picker. The selected color is passed into the existing quick-add flow and stored with the selected size on the cart line.

`features/runway/data/looks.ts` declares each look's human model, silhouette and garment material names. Its product fixtures come from `data/catalog/runway-products.ts`, shared with the catalog store. `features/runway/lib/human-model.ts` loads the GLB, preserves textured standard materials, sets up studio lighting, changes clothing colors, and disposes geometry, materials, textures and decoded image bitmaps. To add a different garment, supply its actual mesh and declare its recolorable material names.

Route files in `app/reels/` only supply metadata and mount the feature. Runway components and their scoped CSS live in this feature's `components/` and `styles/` folders. Shared discover navigation belongs to `features/reels/`. Product color resolution belongs to `features/products/lib/`.

## Performance

- Three compressed binaries, about 1.62 MiB combined. Two gown looks share one binary; loaded buffers are cached by URL.
- The fullscreen editor and OrbitControls are loaded only when opened.
- The runway renderer is unmounted while the editor is open; only one canvas/GPU renderer is active.
- The editor renders on demand. No auto-rotation, continuous idle animation, skeletal skinning, postprocessing, live texture editing, cloth simulation or live shadows.
- Pixel ratio is capped at 1.5. Textures use WebP: skin atlases at most 1024px, all other maps at most 512px. Standard materials preserve fabric detail under inexpensive studio lights.
- Resize/interaction/color changes schedule a single animation frame; an idle editor schedules none.
- Hidden-tab work is paused. Controls, observers, pending frames, geometry, materials and renderer are released when closed.
- The open view exposes render-count and azimuth diagnostics as canvas data attributes for browser QA.

## Validation

`npm test` (also available as `npm run test:runway`) runs generic product color tests from `tests/products/` and model contracts from `features/runway/tests/`. They cover product colors, actual download sizes, a 900 KiB / 45,000 triangle per-model budget, normalized height, clothing material names, texture resolution/format, and absence of skins and animation. Also run TypeScript and the production build. Browser QA checks human detail, fullscreen bounds, front/back and drag rotation, zoom/reset, color persistence, size/color cart handoff, Escape/close, and an unchanged render count while idle.
