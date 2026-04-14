import { config } from "dotenv";
config({ path: ".env.local" });
import pg from "pg";

const { Client } = pg;

async function setAdmin(email: string) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("✅ Connected to database");

    // Set user as admin
    const result = await client.query(
      `UPDATE "user" SET is_admin = true WHERE email = $1 RETURNING id, email, is_admin;`,
      [email]
    );

    if (result.rowCount === 0) {
      console.error(`❌ User with email ${email} not found`);
      process.exit(1);
    }

    const user = result.rows[0];
    console.log(`\n✅ Successfully set ${email} as admin!`);
    console.log(`   User ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Admin: ${user.is_admin}`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

const email = process.argv[2];

if (!email) {
  console.log("Usage: npx ts-node set-admin-direct.ts <email>");
  console.log("Example: npx ts-node set-admin-direct.ts admin@example.com");
  process.exit(1);
}

setAdmin(email);
