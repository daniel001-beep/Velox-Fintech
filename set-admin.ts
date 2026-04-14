import { db } from "./src/db/index.js";
import { users } from "./src/db/schema";
import { eq } from "drizzle-orm";

async function setAdmin(email: string) {
  try {
    await db
      .update(users)
      .set({ isAdmin: true })
      .where(eq(users.email, email));

    console.log(
      `✅ Successfully set ${email} as admin`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Error setting admin:", error);
    process.exit(1);
  }
}

// Get email from command line or use default
const email = process.argv[2];

if (!email) {
  console.log("Usage: npx ts-node set-admin.ts <email>");
  console.log("Example: npx ts-node set-admin.ts admin@example.com");
  process.exit(1);
}

setAdmin(email);
