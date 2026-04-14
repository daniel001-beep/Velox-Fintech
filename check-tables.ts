import { config } from "dotenv";
config({ path: ".env.local" });
import pg from "pg";

const { Client } = pg;

async function checkDatabase() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connected to database!");

    // Get list of tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("\n📋 Existing tables:");
    result.rows.forEach((row) => console.log(`  - ${row.table_name}`));

    // Check if isAdmin column exists in user table
    const adminCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'user' AND column_name = 'is_admin';
    `);

    if (adminCheck.rows.length > 0) {
      console.log("\n✅ isAdmin column exists in user table");
    } else {
      console.log("\n⚠️  isAdmin column NOT found - need to run migrations");
    }

    // Check if orders table exists
    const ordersCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'order';
    `);

    if (ordersCheck.rows.length > 0) {
      console.log("✅ orders table exists");
    } else {
      console.log("⚠️  orders table NOT found - need to run migrations");
    }
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

checkDatabase();
