# Project structure

Aurela uses Next.js App Router. Organize code by ownership, and keep feature implementations together.

```text
app/                         Routes, layouts, metadata, and route-specific UI
components/
  ui/                        Shared shadcn primitives
  navigation/                Navbar, desktop navigation, search, footer
  layout/                    Shared public page shell
  motion/                    Shared animation wrappers
  products/                  Reusable storefront product components
  ...                        Shared auth, dashboard, legal, and support views
contexts/                    App providers and cross-cutting persistence
data/
  catalog/                   Catalog fixtures and product generation
  collections.ts             Curated collection content
  editorials.ts              Editorial content
features/
  cart/                      Cart state and selectors
  products/                  Product state, filter types, color resolution
  wishlist/                  Wishlist state and selectors
  reels/
    components/              Feed, slide, experience, discover navigation
    styles/                  Scoped discover navigation styles
  runway/
    components/              Runway experience, scene, editor, color picker
    data/                    Look configuration and model metadata
    lib/                     Human model loading, recoloring, resource disposal
    scripts/                 Offline model preparation
    styles/                  Scoped runway and editor styles
    tests/                   Shipped model contracts and performance budgets
    README.md                Feature behavior, assets, and verification
hooks/                       Reusable React hooks
lib/                         Utilities shared across domains
store/                       Redux store composition and inferred store types
tests/products/              Product color integration tests
types/                       Shared domain contracts
public/reels/models/         Current GLBs, manifest, and license notice
docs/                        Project structure, platform contracts, timeline
```

## Naming and placement

- Use lowercase kebab-case for source files and folders: `product-quick-add.tsx`, `cart-slice.ts`, `wishlist/`.
- Keep React component names in PascalCase and functions/variables in camelCase. Next.js special filenames, route parameter identifiers such as `[productId]`, `README.md`, and license files retain their established conventions.
- Use `.tsx` for JSX and `.ts` for plain TypeScript, including Redux slices, fixtures, hooks without JSX, and the store.
- Put shared UI primitives in `components/ui/`. Product skeletons and animation wrappers belong to their respective component folders.
- Keep feature-specific behavior, configuration, tooling, tests, and CSS beside the feature. Shared catalog fixtures belong in `data/catalog/`, so the product store does not depend on runway UI.
- Route entry points for reels and runway supply metadata and mount their feature. Other route-specific private UI can remain colocated beside its page or in `_components/`.
- Use `@/` imports across folders and relative imports within a feature. Data modules also executed directly by Node use explicit relative `.ts` imports; TypeScript permits these with `allowImportingTsExtensions`.
- Use CSS modules for feature styles. Keep application theme tokens, Tailwind setup, and global foundations in `app/globals.css`.
- Import the module you need directly. Avoid broad barrel exports that pull server code, browser-only Three.js code, and offline tooling into the same import graph.

## Product cards

`components/products/product-card.tsx` is the shopping card with cart and wishlist behavior. `editorial-product-card.tsx` is the presentation card for editorial grids. `fashion-card.tsx` is a separate title/image tile. Their filenames describe their different roles.

## Validation and generated files

Run `npm test`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` after structural changes. Check affected routes in the browser when moving styles or client components.

Run `npm run models:prepare` from the repository root to regenerate current runway assets. Source downloads and temporary work belong in ignored `.local/`. Only current production models, their manifest, and license notice belong in `public/reels/models/`. `.next/`, `node_modules/`, and TypeScript build caches are generated files.

See [runway documentation](../features/runway/README.md) and [platform contracts](./platform-architecture.md).
