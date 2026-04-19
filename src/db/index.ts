import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Parse URL manually — avoids pg-connection-string re-interpreting
// sslmode=require as verify-full (which rejects Supabase's cert chain)
const rawUrl = new URL(
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL!
);

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

if (!process.env.POSTGRES_URL && !process.env.POSTGRES_URL_NON_POOLING) {
  console.error(
    "❌ Database Error: POSTGRES_URL environment variable is not set. " +
    "Pleaseadd it to your .env.local file"
  );
}

const pool = globalForDb.pool ?? new Pool({
  host: rawUrl.hostname,
  user: decodeURIComponent(rawUrl.username),
  password: decodeURIComponent(rawUrl.password),
  database: rawUrl.pathname.replace(/^\//, ""),
  port: Number(rawUrl.port) || 5432,
  ssl: { rejectUnauthorized: false },
  max: 1,
  connectionTimeoutMillis: 10000,
  query_timeout: 15000,
});

// Add error handler to pool
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

if (process.env.NODE_ENV === "production") globalForDb.pool = pool;

export const db = drizzle(pool, { schema });
