import { eq } from 'drizzle-orm';
import { db } from './db';
import { users, type InsertUser } from './schema';

export async function getUserById(id: number) {
  return db.select().from(users).where(eq(users.id, id));
}

export async function insertUser(user: InsertUser) {
  console.log(user);
  return db.insert(users).values(user);
}
