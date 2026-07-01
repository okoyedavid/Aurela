/** Consolidated Aurela domain contracts. API DTOs should be generated from the backend schema when available. */
export type ID = string;
export type ISODateTime = string;
export type CurrencyCode = "USD" | "NGN" | "USDC";
export type Money = { amount: number; currency: CurrencyCode };
export type PageInfo = { page: number; pageSize: number; total: number; hasNextPage: boolean };
export type Paginated<T> = { data: T[]; pageInfo: PageInfo };
export type ApiError = { code: string; message: string; fieldErrors?: Record<string, string[]>; requestId: string };
export type SortDirection = "asc" | "desc";
export type MediaAsset = { id: ID; url: string; alt: string; type: "image" | "video"; width?: number; height?: number; durationSeconds?: number; position: number };

export type UserRole = "customer" | "seller" | "support" | "operations" | "trust_safety" | "finance" | "admin" | "super_admin";
export type AccountState = "pending_verification" | "active" | "review" | "restricted" | "suspended" | "closed";
export type User = { id: ID; email: string; emailVerifiedAt: ISODateTime | null; firstName: string; lastName: string; displayName: string; phone: string | null; avatar: MediaAsset | null; state: AccountState; roles: UserRole[]; createdAt: ISODateTime; updatedAt: ISODateTime };
export type Session = { id: ID; userId: ID; device: string; browser: string; ipAddressMasked: string; location: string | null; createdAt: ISODateTime; lastSeenAt: ISODateTime; current: boolean; revokedAt: ISODateTime | null };
export type Address = { id: ID; userId: ID; label: string; recipientName: string; phone: string; line1: string; line2: string | null; city: string; region: string; postalCode: string | null; countryCode: string; isDefault: boolean };
export type NotificationPreferences = { orderUpdates: boolean; deliveryUpdates: boolean; wishlistAlerts: boolean; sellerMessages: boolean; editorial: boolean; email: boolean; push: boolean; inApp: boolean };
export type AuthTokens = { accessToken: string; expiresAt: ISODateTime };
export type LoginInput = { email: string; password: string; rememberMe?: boolean };
export type SignupInput = { email: string; password: string; firstName: string; lastName: string; acceptedTerms: boolean };

export type SellerState = "application" | "under_review" | "active" | "restricted" | "suspended" | "rejected";
export type VerificationState = "not_submitted" | "submitted" | "verified" | "failed" | "expired";
export type Seller = { id: ID; userId: ID; state: SellerState; verificationState: VerificationState; legalName: string; countryCode: string; joinedAt: ISODateTime; riskLevel: RiskLevel; sanctionsCount: number };
export type ShopState = "draft" | "active" | "restricted" | "suspended" | "closed";
export type ModerationState = "clear" | "pending" | "review" | "escalated" | "rejected";
export type Shop = { id: ID; slug: string; name: string; description: string; categoryId: ID; ownerSellerId: ID; state: ShopState; moderationState: ModerationState; logo: MediaAsset | null; cover: MediaAsset | null; createdAt: ISODateTime; updatedAt: ISODateTime };
export type ShopMemberRole = "owner" | "manager" | "catalogue" | "fulfilment" | "finance";
export type ShopMembership = { id: ID; shopId: ID; userId: ID; role: ShopMemberRole; invitedAt: ISODateTime; acceptedAt: ISODateTime | null; revokedAt: ISODateTime | null };

export type Category = { id: ID; slug: string; name: string; description: string; parentId: ID | null; image: MediaAsset | null; position: number; active: boolean };
export type ProductState = "draft" | "pending_review" | "published" | "hidden" | "rejected" | "archived";
export type Product = { id: ID; shopId: ID; categoryId: ID; slug: string; name: string; description: string; brand: string; state: ProductState; moderationState: ModerationState; media: MediaAsset[]; tags: string[]; materialClaims: ProductClaim[]; featured: boolean; onSale: boolean; publishedAt: ISODateTime | null; createdAt: ISODateTime; updatedAt: ISODateTime; version: number };
export type ProductClaim = { id: ID; type: "material" | "origin" | "certification" | "sustainability" | "care"; value: string; evidenceState: "unverified" | "submitted" | "verified" | "rejected"; evidenceAssetIds: ID[] };
export type ProductOption = { id: ID; productId: ID; name: "size" | "color" | "material" | string; values: string[] };
export type ProductVariant = { id: ID; productId: ID; sku: string; optionValues: Record<string, string>; price: Money; compareAtPrice: Money | null; state: "active" | "inactive"; mediaAssetIds: ID[]; weightGrams: number | null; dimensionsCm: { length: number; width: number; height: number } | null };
export type InventoryLevel = { variantId: ID; shopId: ID; available: number; reserved: number; incoming: number; reorderPoint: number; updatedAt: ISODateTime };
export type InventoryMovement = { id: ID; variantId: ID; type: "receive" | "reserve" | "release" | "sale" | "return" | "adjustment"; quantity: number; referenceType: string; referenceId: ID; actorId: ID | null; reason: string; createdAt: ISODateTime };
export type ProductSnapshot = { productId: ID; version: number; shopId: ID; name: string; sku: string; optionValues: Record<string, string>; unitPrice: Money; mediaUrl: string | null; capturedAt: ISODateTime };

export type Collection = { id: ID; slug: string; title: string; description: string; hero: MediaAsset; startsAt: ISODateTime | null; endsAt: ISODateTime | null; state: "draft" | "published" | "archived"; productIds: ID[] };
export type EditorialArticle = { id: ID; slug: string; title: string; excerpt: string; body: EditorialBlock[]; hero: MediaAsset; authorId: ID; state: "draft" | "published" | "archived"; publishedAt: ISODateTime | null };
export type EditorialBlock = { id: ID; type: "paragraph" | "heading" | "quote" | "image" | "product_grid" | "reel"; content: unknown; position: number };
export type Reel = { id: ID; shopId: ID | null; sellerId: ID | null; media: MediaAsset; caption: string; productIds: ID[]; state: "draft" | "published" | "hidden"; publishedAt: ISODateTime | null };

export type Cart = { id: ID; userId: ID | null; guestToken: string | null; currency: CurrencyCode; lines: CartLine[]; promoCode: string | null; expiresAt: ISODateTime | null; updatedAt: ISODateTime };
export type CartLine = { id: ID; cartId: ID; variantId: ID; quantity: number; unitPrice: Money; product: ProductSnapshot; addedAt: ISODateTime };
export type Wishlist = { id: ID; userId: ID | null; guestToken: string | null; items: WishlistItem[]; updatedAt: ISODateTime };
export type WishlistItem = { id: ID; wishlistId: ID; productId: ID; addedAt: ISODateTime };
export type PromoCode = { id: ID; code: string; type: "percentage" | "fixed"; value: number; currency: CurrencyCode | null; minimumSpend: Money | null; startsAt: ISODateTime; endsAt: ISODateTime; usageLimit: number | null; perUserLimit: number | null; active: boolean };

export type OrderState = "pending_payment" | "paid" | "partially_fulfilled" | "fulfilled" | "completed" | "cancelled" | "disputed";
export type Order = { id: ID; code: string; customerId: ID; state: OrderState; currency: CurrencyCode; subtotal: Money; discount: Money; tax: Money; shipping: Money; total: Money; shippingAddress: AddressSnapshot; billingAddress: AddressSnapshot | null; lines: OrderLine[]; fulfilmentIds: ID[]; paymentIds: ID[]; placedAt: ISODateTime; updatedAt: ISODateTime };
export type AddressSnapshot = Omit<Address, "id" | "userId" | "isDefault">;
export type OrderLine = { id: ID; orderId: ID; fulfilmentId: ID; variantId: ID; quantity: number; product: ProductSnapshot; subtotal: Money; discount: Money; total: Money };
export type FulfilmentState = "unacknowledged" | "preparing" | "ready" | "delivery_review" | "in_transit" | "delivery_attempted" | "delivered" | "cancelled" | "returned";
export type DeliveryOwner = "undecided" | "seller" | "platform";
export type Fulfilment = { id: ID; code: string; orderId: ID; shopId: ID; state: FulfilmentState; deliveryOwner: DeliveryOwner; orderLineIds: ID[]; itemSubtotal: Money; events: FulfilmentEvent[]; acknowledgedAt: ISODateTime | null; deliveredAt: ISODateTime | null };
export type FulfilmentEventType = "quality_checked" | "packaged" | "courier_handoff" | "in_transit" | "destination_city" | "out_for_delivery" | "delivery_attempt" | "delivered" | "return_started" | "returned" | "correction";
export type FulfilmentEvent = { id: ID; fulfilmentId: ID; type: FulfilmentEventType; details: string; location: string | null; reference: string | null; actorId: ID; actorRole: UserRole; occurredAt: ISODateTime; createdAt: ISODateTime; supersedesEventId: ID | null };
export type DeliveryRequestState = "submitted" | "inspection" | "repriced" | "seller_approval" | "accepted_awaiting_handoff" | "rejected" | "in_custody" | "completed";
export type DeliveryRequest = { id: ID; fulfilmentId: ID; state: DeliveryRequestState; declaredWeightGrams: number; inspectedWeightGrams: number | null; declaredDimensionsCm: Dimensions; inspectedDimensionsCm: Dimensions | null; baselineFee: Money; proposedFee: Money; evidenceAssetIds: ID[]; flags: string[]; submittedAt: ISODateTime; decidedAt: ISODateTime | null; handoffScannedAt: ISODateTime | null };
export type Dimensions = { length: number; width: number; height: number };

export type PaymentRail = "card" | "bank_transfer" | "crypto" | "wallet";
export type PaymentState = "created" | "pending" | "authorised" | "confirmed" | "settled" | "failed" | "partially_refunded" | "refunded" | "disputed";
export type Payment = { id: ID; orderId: ID; customerId: ID; rail: PaymentRail; state: PaymentState; amount: Money; provider: string; providerReference: string; methodDisplay: string; riskLevel: RiskLevel; authorisedAt: ISODateTime | null; settledAt: ISODateTime | null; createdAt: ISODateTime };
export type Refund = { id: ID; paymentId: ID; orderId: ID; amount: Money; state: "requested" | "review" | "submitted" | "succeeded" | "failed" | "cancelled"; reason: string; requestedById: ID; providerReference: string | null; createdAt: ISODateTime; completedAt: ISODateTime | null };
export type Chargeback = { id: ID; paymentId: ID; providerCaseId: string; amount: Money; reasonCode: string; state: "opened" | "evidence_due" | "submitted" | "won" | "lost" | "closed"; evidenceAssetIds: ID[]; dueAt: ISODateTime | null; createdAt: ISODateTime };
export type LedgerEntry = { id: ID; accountId: ID; type: "charge" | "refund" | "fee" | "seller_payable" | "hold" | "release" | "payout" | "adjustment"; debit: Money | null; credit: Money | null; referenceType: string; referenceId: ID; createdAt: ISODateTime };
export type SellerBalance = { sellerId: ID; available: Money; pending: Money; held: Money; updatedAt: ISODateTime };
export type Payout = { id: ID; sellerId: ID; batchId: ID | null; amount: Money; state: "eligible" | "scheduled" | "processing" | "paid" | "failed" | "partially_held" | "held"; destinationDisplay: string; dueAt: ISODateTime | null; paidAt: ISODateTime | null };
export type PayoutBatch = { id: ID; state: "draft" | "preflight" | "approved" | "processing" | "completed" | "failed"; payoutIds: ID[]; total: Money; scheduledFor: ISODateTime; approvedById: ID | null; createdAt: ISODateTime };
export type PayoutHold = { id: ID; sellerId: ID; payoutId: ID | null; amount: Money; reason: string; sourceType: "dispute" | "risk" | "delivery" | "manual"; sourceId: ID; placedById: ID; placedAt: ISODateTime; releasedAt: ISODateTime | null };

export type ReturnRequest = { id: ID; orderId: ID; orderLineIds: ID[]; customerId: ID; reason: string; state: "requested" | "approved" | "rejected" | "in_transit" | "received" | "inspected" | "resolved"; evidenceAssetIds: ID[]; createdAt: ISODateTime };
export type DisputeType = "item_not_as_described" | "delivery_damage" | "delivery_missing" | "return_eligibility" | "payment" | "seller_customer";
export type Dispute = { id: ID; orderId: ID; fulfilmentId: ID | null; type: DisputeType; openedById: ID; customerId: ID; sellerId: ID; state: "opened" | "evidence_review" | "response_due" | "mediation" | "resolved" | "appealed" | "closed"; priority: "normal" | "review" | "high"; amount: Money; summary: string; evidenceAssetIds: ID[]; policyVersion: string | null; resolution: string | null; dueAt: ISODateTime; createdAt: ISODateTime };
export type ProductReview = { id: ID; productId: ID; orderLineId: ID; customerId: ID; rating: number; title: string; body: string; state: "pending" | "published" | "hidden"; createdAt: ISODateTime };

export type RiskLevel = "low" | "review" | "high";
export type ModerationCase = { id: ID; targetType: "seller" | "shop" | "product" | "reel" | "review"; targetId: ID; state: "open" | "evidence_requested" | "escalated" | "resolved"; reasonCode: string; evidenceAssetIds: ID[]; assignedToId: ID | null; createdAt: ISODateTime };
export type Sanction = { id: ID; sellerId: ID; shopId: ID | null; type: "warning" | "listing_restriction" | "payout_hold" | "suspension" | "ban"; reason: string; policyVersion: string; startsAt: ISODateTime; endsAt: ISODateTime | null; createdById: ID; appealedAt: ISODateTime | null };
export type PlatformNotification = { id: ID; audienceType: "user" | "segment" | "role" | "all"; audienceId: ID | null; channels: ("email" | "in_app" | "push")[]; subject: string; body: string; state: "draft" | "approval" | "queued" | "sending" | "sent" | "partial_failure" | "failed"; triggerType: string; triggerId: ID | null; createdById: ID; scheduledAt: ISODateTime | null; sentAt: ISODateTime | null };
export type NotificationDelivery = { id: ID; notificationId: ID; userId: ID; channel: "email" | "in_app" | "push"; state: "queued" | "delivered" | "failed" | "opened"; providerReference: string | null; failureCode: string | null; deliveredAt: ISODateTime | null };
export type AuditLog = { id: ID; actorId: ID | null; actorRole: UserRole | "service"; action: string; targetType: string; targetId: ID; result: "success" | "failure" | "review" | "flagged"; detail: Record<string, unknown>; requestId: string; ipAddress: string | null; createdAt: ISODateTime; previousHash: string | null; hash: string };
export type SupportCase = { id: ID; customerId: ID; orderId: ID | null; subject: string; state: "open" | "waiting_customer" | "waiting_internal" | "resolved" | "closed"; priority: "low" | "normal" | "high"; assignedToId: ID | null; createdAt: ISODateTime };
export type ReportJob = { id: ID; type: "marketplace" | "seller_operations" | "financial" | "customer"; parameters: Record<string, unknown>; state: "queued" | "running" | "completed" | "failed"; outputAssetId: ID | null; requestedById: ID; createdAt: ISODateTime; completedAt: ISODateTime | null };
export type PlatformConfig = { id: ID; key: string; value: unknown; version: number; effectiveAt: ISODateTime; state: "draft" | "approval" | "scheduled" | "active" | "superseded"; reason: string; createdById: ID; approvedById: ID | null };
export type RolePermission = { id: ID; role: UserRole; permission: string; scope: "own" | "shop" | "platform"; active: boolean };

export type ProductQuery = { q?: string; category?: string; shopId?: ID; tags?: string[]; minPrice?: number; maxPrice?: number; rating?: number; onSale?: boolean; createdAfter?: ISODateTime; sort?: "newest" | "price_asc" | "price_desc" | "rating" | "popularity"; page?: number; pageSize?: number };
export type AdminListQuery = { q?: string; state?: string; risk?: RiskLevel; from?: ISODateTime; to?: ISODateTime; sortBy?: string; direction?: SortDirection; page?: number; pageSize?: number };
