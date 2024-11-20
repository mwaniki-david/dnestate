// import { config } from "dotenv";
// import { defineConfig } from "drizzle-kit";

// config({ path: ".env.local" });

// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) {
//   throw new Error("DATABASE_URL is not set in the environment variables.");
// }

// export default defineConfig({
//   schema: "db/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: databaseUrl,  // Now, this is guaranteed to be a string
//   },
//   verbose: true,
//   strict: true,
// });

import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from .env.local
config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in the environment variables.");
}

export default defineConfig({
  // Path to your schema definitions file
  schema: "./db/schema.ts", // Update this path to reflect your actual project structure

  // Database dialect
  dialect: "postgresql",

  // Database credentials
  dbCredentials: {
    url: databaseUrl, // Use the DATABASE_URL from the environment variables
  },

  // Enable verbose logging for debugging
  verbose: true,

  // Enable strict mode to catch potential issues early
  strict: true,
});
