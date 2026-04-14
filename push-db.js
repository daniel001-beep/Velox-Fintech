const { exec } = require("child_process");
const { config } = require("dotenv");

config({ path: ".env.local" });

console.log("Attempting to push schema to database...");
console.log("Database URL:", process.env.POSTGRES_URL_NON_POOLING?.split("@")[1]?.split("?")[0] || "unknown");

exec("npx drizzle-kit push", { timeout: 30000 }, (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error.message);
    if (error.code === "ETIMEDOUT") {
      console.log("\nTimeout - the command may still be running on the server.");
      console.log("Try visiting your Supabase dashboard to verify the schema was updated.");
    }
    process.exit(1);
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});
