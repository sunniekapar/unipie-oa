import { eq } from 'drizzle-orm';
import { db } from './db';
import { signupFormSchema, users } from './schema';
import { z } from 'zod';

export async function getUserByUsername(username: string) {
  const user = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.username, username));
  return user[0];
}

export async function insertUser(user: z.infer<typeof signupFormSchema>) {
  return db.insert(users).values(user).returning();
}
