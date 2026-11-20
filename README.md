# Aurela

A fashion storefront built with Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, Redux Toolkit, and Three.js.

## Development

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Discover is at `/reels`; the interactive runway is at `/reels/3d`.

## Project organization

- `app/`: route entry points, layouts, and route-specific UI.
- `components/`: shared interface components, grouped by purpose.
- `features/`: domain state and feature implementations. Reels and runway own their components and scoped styles; runway also owns its model tooling and tests.
- `data/catalog/`: shared catalog fixtures and product generation.
- `contexts/`, `hooks/`, `lib/`, `store/`, `types/`: app providers, shared hooks/utilities, store composition, and domain contracts.
- `public/`: deployed static assets. Current human models and their license are in `public/reels/models/`.
- `docs/`: project structure, platform contracts, and development timeline.

Use kebab-case for source filenames and folders; use PascalCase for React component names. Keep feature styles in CSS modules and shared theme foundations in `app/globals.css`.

Read the [structure and conventions](docs/project-structure.md), [runway documentation](features/runway/README.md), and [platform contracts](docs/platform-architecture.md).

## Checks and asset tooling

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

`npm run test:runway` runs the product-color and human-model contracts. `npm run models:prepare` regenerates optimized runway models from source downloads in ignored `.local/models/`; see the model license notice for source URLs. Run commands from the repository root.
