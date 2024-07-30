import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: './.env.local' });

export default defineConfig({
  schema: './db/schema.ts',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
});
