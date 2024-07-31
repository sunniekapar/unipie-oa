'use server';

import { z } from 'zod';
import { getUserByUsername, insertUser } from '../db/queries';
import { loginFormSchema, signupFormSchema } from '../db/schema';
import bcrypt from 'bcrypt';
import { encrypt, getSession } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Location } from '@/types';

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

  const tokenExpires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({
    username: user.username,
    id: user.id,
  });
  cookies().set('session', session, { expires: tokenExpires, httpOnly: true });
  redirect('/home');
}

// i think this is wrong
export async function auth() {
  const session = await getSession();
  if (!session) return; // redirect
  const user = await getUserByUsername(session.username);
  return user;
}

export async function getLocations(query: string): Promise<Location[]> {
  const response = await fetch(
    `http://localhost:5000/locations?location=${query}`
  );
  const { data } = await response.json();
  return data;
}
