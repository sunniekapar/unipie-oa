'use server';

import { z } from 'zod';
import { getUserByUsername, insertUser } from '../db/queries';
import { loginFormSchema, signupFormSchema } from '../db/schema';
import bcrypt from 'bcrypt';

export async function signup(
  values: z.infer<typeof signupFormSchema>
): Promise<{ error: string } | { success: string }> {
  const user = await getUserByUsername(values.username);
  if (user) return { error: 'Username taken' };

  const hashedPassword = await bcrypt.hash(values.password, 10);

  const newUser = await insertUser({
    ...values,
    password: hashedPassword,
  });

  if (newUser[0].id) return { success: `Created user: ${values.username}` };
  else return { error: 'Error creating user' };
}

export async function login(
  values: z.infer<typeof loginFormSchema>
): Promise<{ error: string } | { success: string }> {
  const user = await getUserByUsername(values.username);
  if (!user) return { error: 'User does not exist' };

  const passwordsMatch = await bcrypt.compare(values.password, user.password);

  if (!passwordsMatch) return { error: 'Username or password does not match' };

  return { success: 'Passwords match' };
}
