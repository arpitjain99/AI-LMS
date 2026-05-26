import dotenv from 'dotenv';
dotenv.config();

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING ||
  process.env.NEXT_PUBLIC_DATABASE_URL_STRING ||
  process.env.DATABASE_URL;

export const db = drizzle(neon(connectionString));
