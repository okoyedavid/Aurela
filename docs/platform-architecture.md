# Aurela platform contracts and backend surface

This document is the backend inventory derived from the current public storefront, customer dashboard, seller workspaces and administration routes. Canonical TypeScript domain contracts are in `types/platform.ts`.

## API conventions

- Prefix versioned endpoints with `/api/v1`.
- Use opaque IDs, cursor/page pagination, idempotency keys for checkout and money mutations, and request IDs for tracing.
- Authenticate with secure, `HttpOnly`, `SameSite` cookies. Do not store bearer or refresh tokens in `localStorage`.
- Enforce permissions server-side at user, shop and platform scopes. Hiding a route or sidebar item is not authorization.
- Every money, moderation, delivery, permission and configuration mutation must create an audit event.
- Use optimistic concurrency (`version` or `If-Match`) for products, inventory and configuration.
- Webhooks must verify provider signatures, store event IDs and process idempotently.

## Required endpoints

### Authentication, sessions and identity

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/signup` | Create account and verification challenge |
| POST | `/auth/login` | Create secure session |
| POST | `/auth/logout` | Revoke current session |
| POST | `/auth/logout-all` | Revoke all sessions |
| GET | `/auth/session` | Current user, roles and permissions |
| GET | `/auth/oauth/google` | Begin Google OAuth |
| GET | `/auth/oauth/google/callback` | Complete Google OAuth |
| POST | `/auth/forgot-password` | Send reset challenge |
| POST | `/auth/reset-password` | Consume reset token and rotate credentials |
| POST | `/auth/verify-email` | Consume verification token |
| POST | `/auth/verify-email/resend` | Resend verification |
| GET | `/users/me/sessions` | List devices and sessions |
| DELETE | `/users/me/sessions/{sessionId}` | Revoke one session |

### Customer profile, addresses and preferences

| Method | Endpoint | Purpose |
|---|---|---|
| GET/PATCH | `/users/me` | Read or update profile |
| POST | `/users/me/avatar/upload-url` | Signed avatar upload |
| GET/POST | `/users/me/addresses` | List or create addresses |
| PATCH/DELETE | `/users/me/addresses/{addressId}` | Update or delete address |
| GET/PATCH | `/users/me/preferences` | Notification, locale and display preferences |
| PATCH | `/users/me/email` | Begin verified email change |
| PATCH | `/users/me/password` | Change password with reauthentication |
| GET | `/users/me/notifications` | Customer notification inbox |
| PATCH | `/users/me/notifications/{id}/read` | Mark notification read |

### Public catalogue, search and discovery

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products` | Search/filter/sort paginated published products |
| GET | `/products/{productId}` | Product, variants, media, shop and availability |
| GET | `/products/{productId}/related` | Related products |
| GET | `/products/{productId}/reviews` | Published verified reviews |
| POST | `/products/{productId}/reviews` | Review a purchased product |
| GET | `/search/suggestions?q=` | Fast product/category/shop suggestions |
| GET | `/categories` | Category tree |
| GET | `/categories/{slug}` | Category metadata and facets |
| GET | `/collections` | Published collections |
| GET | `/collections/{slug}` | Collection and products |
| GET | `/editorial` | Published editorial index |
| GET | `/editorial/{slug}` | Editorial article |
| GET | `/reels` | Cursor-paginated discovery feed |
| POST | `/reels/{reelId}/events` | View, completion and product-click telemetry |
| GET | `/new-arrivals` | Recent published catalogue view |
| GET | `/sale` | Verified active discounts |

### Cart, wishlist and checkout

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/cart` | Resolve authenticated or guest cart |
| POST | `/cart/lines` | Add variant and reserve/check availability |
| PATCH/DELETE | `/cart/lines/{lineId}` | Change quantity or remove line |
| POST/DELETE | `/cart/promo` | Apply or remove promotion |
| POST | `/cart/merge` | Merge guest cart after login |
| GET | `/wishlist` | Resolve authenticated or guest wishlist |
| POST/DELETE | `/wishlist/items/{productId}` | Save or remove product |
| POST | `/wishlist/merge` | Merge guest wishlist after login |
| POST | `/checkout/quote` | Authoritative totals, tax, delivery and availability |
| POST | `/checkout/orders` | Idempotently create order and shop fulfilments |
| POST | `/checkout/payment-intent` | Create provider payment intent/instructions |
| GET | `/checkout/{checkoutId}/status` | Poll asynchronous payment/checkout state |
| POST | `/webhooks/payments/{provider}` | Signed payment provider webhook |

### Customer orders, purchases, tracking and returns

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/orders` | Customer order history |
| GET | `/orders/{orderId}` | Customer order and shop fulfilments |
| GET | `/orders/{orderId}/timeline` | Combined safe customer timeline |
| GET | `/purchases` | Customer financial purchase records |
| GET | `/purchases/{transactionId}` | Receipt and masked payment method |
| POST | `/order-tracking/guest` | Guest lookup with order code and email challenge |
| GET | `/returns` | Customer return history |
| POST | `/returns` | Request return for eligible order lines |
| GET | `/returns/{returnId}` | Return state and instructions |
| POST | `/returns/{returnId}/evidence/upload-url` | Signed evidence upload |

### Seller and owned-shop discovery

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/seller/me` | Seller status and permissions |
| POST | `/seller/applications` | Submit seller application |
| GET | `/seller/applications/me` | Application status |
| POST | `/seller/applications/evidence/upload-url` | Identity/business evidence upload |
| GET | `/seller/shops` | Shops accessible to current seller/member |
| POST | `/seller/shops` | Create shop after seller authorization |
| GET/PATCH | `/seller/shops/{shopId}` | Shop profile and configuration |
| GET/POST | `/seller/shops/{shopId}/members` | Shop staff and roles |
| PATCH/DELETE | `/seller/shops/{shopId}/members/{memberId}` | Change/revoke membership |

### Seller products and inventory

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `/seller/shops/{shopId}/products` | List or create products |
| GET/PATCH | `/seller/shops/{shopId}/products/{productId}` | Read/edit versioned listing |
| POST | `/seller/shops/{shopId}/products/{productId}/submit` | Submit listing for moderation |
| POST | `/seller/shops/{shopId}/products/{productId}/media/upload-url` | Signed product media upload |
| POST | `/seller/shops/{shopId}/products/{productId}/variants` | Create option/SKU combinations |
| PATCH | `/seller/shops/{shopId}/variants/{variantId}` | Edit SKU price/options/status |
| GET | `/seller/shops/{shopId}/inventory` | Variant inventory levels |
| POST | `/seller/shops/{shopId}/inventory/movements` | Receive/adjust stock with reason |
| GET | `/seller/shops/{shopId}/inventory/movements` | Inventory audit trail |

### Seller orders, revenue and delivery

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/seller/shops/{shopId}/fulfilments` | Shop-specific order workload |
| GET | `/seller/shops/{shopId}/fulfilments/{fulfilmentId}` | Fulfilment and immutable snapshots |
| POST | `/seller/shops/{shopId}/fulfilments/{id}/acknowledge` | Accept fulfilment workload |
| POST | `/seller/shops/{shopId}/fulfilments/{id}/delivery-choice` | Seller or platform delivery choice |
| POST | `/seller/shops/{shopId}/fulfilments/{id}/events` | Append approved self-delivery event |
| GET | `/seller/shops/{shopId}/transactions` | Paid customer transactions for shop lines |
| GET | `/seller/shops/{shopId}/balance` | Pending, available and held balance |
| GET | `/seller/shops/{shopId}/payouts` | Seller payout history |
| POST | `/seller/shops/{shopId}/delivery-requests` | Request platform delivery inspection |
| GET | `/seller/shops/{shopId}/delivery-requests/{id}` | Review/reprice/acceptance status |
| POST | `/seller/shops/{shopId}/delivery-requests/{id}/accept-reprice` | Seller accepts adjusted fee |

### Admin overview and orders

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/admin/overview` | Health, GMV and actionable queue metrics |
| GET | `/admin/orders` | Filtered platform order index |
| GET | `/admin/orders/{orderId}` | Payment, fulfilments and combined timeline |
| POST | `/admin/orders/{orderId}/notes` | Append internal note |
| POST | `/admin/orders/{orderId}/escalations` | Open audited escalation |
| POST | `/admin/orders/{orderId}/payout-holds` | Place order-related hold |
| POST | `/admin/orders/{orderId}/refund-reviews` | Begin refund review |

### Admin delivery operations

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/admin/delivery-requests` | Inspection queue |
| GET | `/admin/delivery-requests/{requestId}` | Package, evidence, fee and capacity |
| POST | `/admin/delivery-requests/{id}/inspections` | Record inspected weight/dimensions |
| POST | `/admin/delivery-requests/{id}/accept` | Accept awaiting physical handoff |
| POST | `/admin/delivery-requests/{id}/reject` | Reject with reason |
| POST | `/admin/delivery-requests/{id}/reprice` | Propose fee requiring seller approval |
| POST | `/admin/delivery-requests/{id}/handoff-scan` | Begin platform custody |

### Admin sellers, shops and products

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/admin/sellers` | Applications and active sellers |
| GET | `/admin/sellers/{sellerId}` | Identity, shops, performance, sanctions |
| POST | `/admin/sellers/{id}/approve` | Approve application |
| POST | `/admin/sellers/{id}/reject` | Reject application with reason |
| POST | `/admin/sellers/{id}/sanctions` | Warning, restriction, hold or suspension |
| POST | `/admin/sellers/{id}/sanctions/{sanctionId}/release` | Release reversible sanction |
| GET | `/admin/shops` | Shop moderation index |
| GET | `/admin/shops/{shopId}` | Products, orders, compliance, activity |
| POST | `/admin/shops/{id}/restrictions` | Restrict/suspend shop |
| POST | `/admin/shops/{id}/restore` | Restore after review |
| GET | `/admin/products` | Listing moderation queue |
| GET | `/admin/products/{productId}/versions` | Listing version history |
| POST | `/admin/products/{id}/moderation-decisions` | Approve, evidence request, hide or prohibit |
| GET | `/admin/moderation-cases/{caseId}` | Evidence and enforcement case |

### Admin customers, payments, payouts and disputes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/admin/customers` | Account and support index |
| GET | `/admin/customers/{customerId}` | Account, orders, risk and support context |
| POST | `/admin/customers/{id}/notes` | Internal support note |
| POST | `/admin/customers/{id}/restrictions` | Guarded account restriction |
| GET | `/admin/payments` | Multi-rail transaction ledger view |
| GET | `/admin/payments/{paymentId}` | Provider, refunds and chargebacks |
| POST | `/admin/payments/{id}/refund-reviews` | Create refund review |
| POST | `/admin/payments/{id}/reconcile` | Reconcile provider state idempotently |
| POST | `/admin/payments/{id}/chargeback-evidence` | Attach evidence to provider case |
| GET | `/admin/payouts` | Seller payout obligations |
| GET | `/admin/payout-batches` | Batches and reconciliation |
| POST | `/admin/payout-batches` | Create draft batch |
| POST | `/admin/payout-batches/{id}/preflight` | Validate destinations, balances and holds |
| POST | `/admin/payout-batches/{id}/approve` | Dual-control batch approval |
| POST | `/admin/payout-holds` | Place documented hold |
| POST | `/admin/payout-holds/{id}/release` | Release documented hold |
| GET | `/admin/disputes` | Returns, delivery and marketplace cases |
| GET | `/admin/disputes/{disputeId}` | Evidence snapshot and responses |
| POST | `/admin/disputes/{id}/evidence-requests` | Request evidence with deadline |
| POST | `/admin/disputes/{id}/resolutions` | Audited policy resolution |
| POST | `/admin/disputes/{id}/appeals` | Record appeal |

### Admin reports, communications, audit and configuration

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/admin/reports` | Queue reproducible report job |
| GET | `/admin/reports/{reportId}` | Job state and signed output URL |
| GET | `/admin/notifications` | Communication history |
| POST | `/admin/notifications` | Draft targeted communication |
| POST | `/admin/notifications/{id}/preview` | Render preview and recipient count |
| POST | `/admin/notifications/{id}/approve` | Approve sensitive/bulk communication |
| POST | `/admin/notifications/{id}/send` | Queue rate-limited delivery |
| GET | `/admin/audit-log` | Filter immutable audit events |
| POST | `/admin/audit-log/exports` | Queue signed audit export |
| GET | `/admin/config` | Active and proposed configuration |
| POST | `/admin/config/proposals` | Versioned configuration proposal |
| POST | `/admin/config/proposals/{id}/approve` | Separation-of-duties approval |
| POST | `/admin/config/proposals/{id}/rollback` | Versioned rollback proposal |
| GET/PATCH | `/admin/roles/{role}/permissions` | Permission matrix management |

## Relational data

Use PostgreSQL as the source of truth. The following are relational because they require constraints, transactions, history, reconciliation or joins:

- Users, credentials, OAuth identities, sessions, roles and permissions.
- Sellers, verification records, sanctions, shops, shop memberships and invitations.
- Categories, products, product versions, options, variants, claims and media metadata.
- Inventory levels and append-only inventory movements. Reserve stock transactionally during checkout.
- Carts and wishlists for authenticated users; guest carts may start in Redis but should be persisted when converted.
- Orders, immutable order-line snapshots, shop fulfilments and append-only fulfilment events.
- Delivery requests, inspections, repricing decisions, handoff scans and custody history.
- Payments, refunds, chargebacks, double-entry ledger accounts/entries, seller balances, holds, payouts and batches.
- Returns, disputes, evidence, responses, resolutions, appeals and policy versions.
- Reviews, moderation cases, listing reports and enforcement decisions.
- Notification definitions and per-recipient delivery outcomes.
- Support cases and internal notes.
- Audit log, report jobs and versioned platform configuration.

Important relational boundaries:

1. A customer order has one public order code but one fulfilment per participating shop.
2. Order lines reference immutable product snapshots; later product edits never alter purchase history.
3. Inventory belongs to variants (size/colour combinations), not only products.
4. Payment state is independent from fulfilment state.
5. Seller transactions, available balance, payout holds and payout batches are separate ledger concepts.
6. Platform delivery acceptance is separate from physical custody; custody begins only after handoff scan.
7. Delivery, moderation, finance and configuration history is append-only.

## Redis candidates

Redis is a cache/coordination layer, never the sole durable source for money, orders or enforcement.

Good candidates:

- Guest cart and guest wishlist with TTL, followed by transactional merge on login.
- Session lookup/revocation cache while session truth remains durable.
- Rate limits for authentication, search, checkout, reviews, support and admin actions.
- Email/password reset and verification challenges with short TTL and one-time consumption.
- Search suggestions, category facets, product-card projections, collection pages and homepage modules.
- Product availability read cache; inventory mutations still transact in PostgreSQL.
- Short stock-reservation leases during checkout, backed by durable reservation records when an order is created.
- Idempotency-key responses for checkout, refunds, delivery decisions and webhook processing.
- Distributed locks for payout-batch execution, webhook deduplication and scheduled jobs.
- Admin overview counters and expensive aggregate report previews.
- Reels feed ranking/cursor candidates, view deduplication and short-lived engagement counters.
- Notification unread counts, presence and delivery worker queues.
- Job queues for email, media processing, reports, reconciliation and search indexing.

Do not store only in Redis:

- Payments, ledger entries, balances, refunds, chargebacks or payouts.
- Orders, order-line snapshots, fulfilment events or custody events.
- Inventory movements or final reservation state.
- Identity verification, sanctions, disputes, moderation decisions or audit logs.
- Platform configuration or permissions.

## Redux assessment

### Current implementation

The store contains `products`, `cart` and `wishlist`. Entity adapters are a reasonable normalization mechanism, but the store currently behaves as a mock database rather than a UI cache. Authentication is separately held in React context and `localStorage`.

Concrete current problems:

1. `setTagsFilter` writes `state.filters.brands` instead of `state.filters.tags`.
2. `selectBestSellers` calls `.sort()` directly on the array returned by `selectAllProducts`, mutating selector-derived data. Always copy before sorting.
3. The `random` related-products selector is impure, so memoized selectors can return unstable results and complicate hydration/testing.
4. “Newest” parses product IDs as integers instead of sorting the real `createdAt` field.
5. All products are generated and loaded into the browser. This will not scale for catalogue search, pagination, authorization or freshness.
6. Filters are global Redux state even though public product filters should primarily be URL query parameters for shareability, navigation and server rendering.
7. Cart count currently counts cart lines, not total units; the intended badge semantics need to be explicit.
8. Wishlist has local persistence, cart does not, and neither has a robust guest-to-account merge protocol.
9. Authentication tokens in `localStorage` are exposed to XSS and the mock auth context can diverge from server authorization.
10. The module-level singleton store and randomly generated initial catalogue can cause non-deterministic development/hydration behaviour.

### Recommended state architecture

Redux is not the best owner for the whole platform. Keep Redux Toolkit only for cross-route client state that benefits from immediate optimistic interaction:

- Guest cart before server reconciliation.
- Guest wishlist before server reconciliation.
- Small transient UI state only when it genuinely spans distant routes.

Use URL state for product query, filters, sorting and pagination. Use component state for dialogs/forms. Use secure server sessions for identity and roles.

Use Next.js Server Components plus a server-state cache for backend data. Two valid options are:

- RTK Query if retaining Redux Toolkit and wanting one client cache system.
- TanStack Query for interactive client screens, with Next.js fetch/cache and Server Components for public pages.

Do not duplicate the same server resource in Redux and a query cache. For Aurela, RTK Query is the lowest-friction migration because Redux Toolkit already exists, but plain Redux slices should not store orders, payments, products, admin queues or seller records.

Recommended ownership:

| State | Owner |
|---|---|
| Authentication/session/roles | Server session + `/auth/session` |
| Public products and categories | Server Components/cache; URL filters |
| Interactive admin/seller tables | RTK Query or TanStack Query |
| Guest cart/wishlist | Redux + local persistence, synchronized to API |
| Authenticated cart/wishlist | API source of truth + query cache/optimistic mutations |
| Checkout and payment status | API state; idempotent mutations and polling/webhooks |
| Dialogs, form drafts, selected rows | Local component state/form library |
| Theme | `next-themes`/local preference, synchronized to user settings when authenticated |
| Notifications unread count | Query cache with Redis-backed server count |

### Immediate Redux corrections

1. Fix `setTagsFilter`.
2. Copy arrays before every sort and remove randomness from memoized selectors.
3. Sort new products by `createdAt`.
4. Move filters into `/products` query parameters.
5. Replace generated catalogue state with paginated API queries.
6. Define guest cart persistence, expiry and login merge behaviour.
7. Replace localStorage authentication with secure cookie sessions.
8. Add typed `useAppDispatch`/`useAppSelector` hooks.
9. Choose RTK Query or TanStack Query before implementing backend integration; do not build custom loading/error reducers per resource.

## Suggested implementation order

1. Authentication, sessions, users and permissions.
2. Shops/memberships, products/variants and inventory movements.
3. Server-backed search, collections and product pages.
4. Guest/authenticated cart and wishlist merge.
5. Idempotent checkout, orders, payments and provider webhooks.
6. Shop fulfilments and delivery custody workflow.
7. Ledger, seller balances, holds and payout batches.
8. Returns, disputes, moderation and sanctions.
9. Notifications, audit log, reports and versioned configuration.
