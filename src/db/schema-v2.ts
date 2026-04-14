import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  numeric,
  uuid,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

// --- Auth.js Tables (Existing) ---

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

// --- Double-Entry Bookkeeping Tables ---

/**
 * Ledger entries for double-entry bookkeeping
 * Every transaction creates two entries: one debit, one credit
 */
export const ledgerEntries = pgTable(
  "ledger_entry",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => transactions.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    accountType: text("account_type").notNull(), // 'customer_balance', 'store_revenue', 'expense', 'receivable'
    entryType: text("entry_type").notNull(), // 'debit' or 'credit'
    amount: numeric("amount", { precision: 19, scale: 2 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    transactionIdx: index("idx_ledger_transaction_id").on(table.transactionId),
    userIdx: index("idx_ledger_user_id").on(table.userId),
    createdAtIdx: index("idx_ledger_created_at").on(table.createdAt),
  })
);

/**
 * Main transactions table - wraps related ledger entries
 * Uses pending/completed state for atomicity
 */
export const transactions = pgTable(
  "transaction",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orderId: integer("order_id")
      .references(() => orders.id, { onDelete: "set null" }),
    idempotencyKey: text("idempotency_key").notNull().unique(),
    amount: numeric("amount", { precision: 19, scale: 2 }).notNull(),
    status: text("status").notNull().default("pending"), // 'pending', 'completed', 'failed', 'cancelled'
    errorMessage: text("error_message"),
    metadata: jsonb("metadata"), // Store payment processor response, ip, etc
    createdAt: timestamp("created_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    lockedUntil: timestamp("locked_until"), // For pessimistic locking
  },
  (table) => ({
    idempotencyKeyIdx: uniqueIndex("idx_transaction_idempotency_key").on(
      table.idempotencyKey
    ),
    statusIdx: index("idx_transaction_status").on(table.status),
    userIdx: index("idx_transaction_user_id").on(table.userId),
  })
);

/**
 * Audit logs for compliance - tracks all financial/cart changes
 */
export const auditLogs = pgTable(
  "audit_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(), // 'cart_modified', 'address_changed', 'checkout_attempted', 'transaction_initiated'
    entityType: text("entity_type"), // 'cart', 'order', 'transaction', 'user'
    entityId: text("entity_id"), // ID of the modified entity
    changes: jsonb("changes"), // Before/after values
    changeHash: text("change_hash").notNull(), // SHA256 hash for tamper detection
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    metadata: jsonb("metadata"),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("idx_audit_user_id").on(table.userId),
    eventTypeIdx: index("idx_audit_event_type").on(table.eventType),
    entityIdx: index("idx_audit_entity_type_id").on(table.entityType, table.entityId),
    timestampIdx: index("idx_audit_timestamp").on(table.timestamp),
  })
);

/**
 * Shipment address history - tracks address changes for audit
 */
export const addressHistory = pgTable(
  "address_history",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    orderId: integer("order_id")
      .references(() => orders.id, { onDelete: "set null" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    street: text("street").notNull(),
    city: text("city").notNull(),
    zipCode: text("zip_code").notNull(),
    country: text("country").notNull(),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIdx: index("idx_address_user_id").on(table.userId),
  })
);

// --- Existing E-commerce Tables (Updated for FK) ---

export const products = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: numeric("price").notNull(),
  imageurl: text("imageurl"),
  category: text("category"),
  createdat: timestamp("createdat").defaultNow(),
});

export const orders = pgTable("order", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  totalPrice: numeric("total_price").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderItems = pgTable("order_item", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  price: numeric("price").notNull(),
});

export const reviews = pgTable("review", {
  id: serial("id").primaryKey(),
  userid: text("userid")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productid: integer("productid")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdat: timestamp("createdat").defaultNow(),
});

// --- Auth.js Tables (Unchanged) ---

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
