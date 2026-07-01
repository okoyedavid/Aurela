# Aurela Platform Roadmap

This roadmap evolves the current frontend prototype into a multi-vendor commerce platform. Dates should be assigned after the product, payment, and fulfillment decisions below are confirmed.

## Decisions required before backend implementation

- `/products` is Aurela’s shared public catalog and `/products/[productId]` is the canonical item URL. Sellers do not receive separate public storefronts; `/shop` is their protected operations workspace for listings, orders, pricing and inventory.
- Decide whether sellers are individuals, registered businesses, or both. This changes identity verification, tax, payout, and onboarding requirements.
- Select the initial operating countries, currencies, tax model, and delivery providers.
- Select the payment marketplace provider. The provider must support split payments, seller onboarding, refunds, disputes, platform commission, and delayed payouts in supported countries.
- Define whether Aurela or each seller owns fulfillment, returns, customer support, and inventory accuracy.
- Define seller approval, product moderation, prohibited products, commission, payout schedule, and refund policies.

## Phase 1 — Foundation and design system

- Finish the shared Aurela design tokens, workspace shell, responsive navigation, accessibility states, and light/dark/system themes.
- Keep the public storefront light-first. Scope persisted workspace themes to account, seller, and admin route groups.
- Move mock products into deterministic fixtures and remove runtime random generation.
- Add automated TypeScript, lint, unit, integration, and browser-journey checks.
- Establish environments, secrets management, error monitoring, analytics, backups, and deployment previews.

## Phase 2 — Data and identity

- Add a relational database and migrations. Core records: User, Role, Permission, Address, Shop, ShopMember, Product, ProductVariant, Media, InventoryLocation, InventoryMovement, Cart, Order, OrderLine, Payment, Payout, Refund, Review, and AuditLog.
- Replace local-storage authentication with server-managed sessions in secure HTTP-only cookies.
- Implement customer, seller, shop-staff, moderator, support, and administrator roles. Enforce permissions on the server; sidebar visibility is only a presentation detail.
- Add email verification, password recovery, session/device management, rate limiting, and audit trails.

## Phase 3 — Customer account

- Connect `/dashboard` to real profile, address, cart, wishlist, order, delivery, return, refund, review, and notification data.
- Add order detail and shipment tracking views.
- Persist carts for signed-in users and safely merge anonymous carts after login.
- Add notification preferences and privacy/account deletion controls.

## Phase 4 — Seller onboarding and shop management

- Add seller application, identity/business verification, terms acceptance, bank/payout onboarding, approval, suspension, and re-verification flows.
- Create the protected seller workspace at `/shop`, with its own theme-aware route layout and mandatory seller authorization.
- Show the Shop navigation only when the session has seller permissions, while independently protecting every seller API and page on the server.
- Support shop profile, branding, policies, staff invitations, roles, operating status, and public shop page.
- Add draft, review, scheduled, published, rejected, archived, and out-of-stock product states.

## Phase 5 — Listings and inventory

- Build product creation with categories, descriptions, media processing, variants, SKU/barcode, pricing, compare-at price, dimensions, tax class, and shipping attributes.
- Store media in managed object storage with validation, resizing, optimization, and deletion lifecycle rules.
- Use an inventory ledger rather than directly editing one stock number. Record receipts, sales, reservations, cancellations, returns, damage, and manual adjustments.
- Reserve inventory atomically during checkout and release expired reservations through background jobs.
- Publish approved listing and inventory changes through server-side cache invalidation or events so storefront availability updates without redeployment.
- Add low-stock alerts, bulk import/export, inventory history, and idempotent stock APIs.

## Phase 6 — Storefront, cart, and discovery

- Replace Redux-owned catalog data with paginated server queries and stable product/shop URLs.
- Add public seller pages, category/search indexing, filters, sorting, recommendations, reviews, reporting, and moderation.
- Calculate authoritative price, promotion eligibility, tax, shipping, commission, and stock on the server. Never trust cart totals submitted by the browser.
- Add SEO metadata, structured product data, canonical URLs, sitemap generation, and image performance budgets.

## Phase 7 — Checkout, orders, and payouts

- Build address validation, shipping quotes, inventory reservation, payment authorization, webhook verification, order creation, receipts, cancellation, returns, and refunds.
- Make checkout idempotent so retries cannot create duplicate charges or orders.
- Split each multi-shop purchase into seller fulfillments while retaining a parent customer order.
- Add seller order queues, fulfillment updates, tracking, cancellations, return decisions, balances, commissions, payout statements, and reconciliation.
- Treat verified payment webhooks—not browser redirects—as payment truth.

## Phase 8 — Aurela administration

- Connect `/admin` to platform metrics, seller approval, product moderation, customers, orders, disputes, refunds, commissions, payouts, content, feature flags, and audit logs.
- Require granular administrator permissions and stronger authentication for financial or destructive actions.
- Add immutable activity history, reason fields, confirmation steps, exports, and operational alerts.

## Phase 9 — Hardening and launch

- Run authorization, payment, webhook, inventory-concurrency, accessibility, performance, load, recovery, and penetration tests.
- Add fraud controls, abuse reporting, content moderation, data retention, privacy exports/deletion, incident response, and support tooling.
- Rehearse failed payments, duplicate webhooks, overselling, payout failure, seller suspension, refunds, database restoration, and rollback.
- Launch through staged seller onboarding and feature flags, then monitor conversion, fulfillment time, cancellation, overselling, disputes, and payout accuracy.

## Architecture boundaries

- `storefront`: public catalog, discovery, product and shop pages.
- `account`: customer profile, carts, purchases, returns, saved items.
- `seller`: shop, listings, inventory, fulfillment, balance and staff.
- `admin`: platform operations, moderation, support and finance.
- `commerce`: authoritative pricing, promotions, inventory reservations, checkout and orders.
- `platform`: authentication, authorization, files, notifications, jobs, audit logs and observability.

These boundaries should be separate modules with explicit server APIs. They do not require separate services initially; a modular monolith is safer and faster until scale or team ownership justifies extraction.
