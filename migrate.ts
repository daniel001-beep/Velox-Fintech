import { config } from "dotenv";
config({ path: ".env.local" });
import pg from "pg";

const { Client } = pg;

async function runMigration() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connected to database");

    // Add is_admin column if it doesn't exist
    console.log("📋 Adding is_admin column to user table...");
    await client.query(`
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
    `);
    console.log("✅ is_admin column added");

    // Add createdAt column if it doesn't exist
    console.log("📋 Adding createdAt column to user table...");
    await client.query(`
      ALTER TABLE "user"
      ADD COLUMN IF NOT EXISTS createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `);
    console.log("✅ createdAt column added");

    // Create orders table if it doesn't exist
    console.log("📋 Creating orders table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS "order" (
        id SERIAL PRIMARY KEY,
        userid TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
        productid INTEGER NOT NULL REFERENCES "product"(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        total_price DOUBLE PRECISION NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ orders table created");

    console.log("\n✅ Migration completed successfully!");
    console.log("Now you can set admin with: npx ts-node set-admin-direct.ts your-email@gmail.com");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
