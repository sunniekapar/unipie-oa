import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  salt: text('salt').default('1'),
});

export const userFormSchema = createInsertSchema(users, {
  username: z
    .string()
    .min(6, {
      message: 'Username must be at least 6 characters long',
    })
    .max(20, {
      message: 'Username must between 6-20 characters',
    }),
  password: z.string().min(8, {
    message: 'password must be at least 8 characters long',
  }),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
