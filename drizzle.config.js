import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url:
      process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING ||
      process.env.NEXT_PUBLIC_DATABASE_URL_STRING ||
      process.env.DATABASE_URL,
  },
});
