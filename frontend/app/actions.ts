'use server';

import { z } from 'zod';
import { getUserByUsername, insertUser } from '../db/queries';
import { loginFormSchema, signupFormSchema } from '../db/schema';
import bcrypt from 'bcrypt';
import { encrypt, getSession } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Location } from '@/types';
import { extractForecastData } from '@/lib/utils';

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

  const tokenExpires = new Date(Date.now() + 1000 * 1000);
  const session = await encrypt({
    username: user.username,
    id: user.id,
  });
  cookies().set('session', session, { expires: tokenExpires, httpOnly: true });
  await new Promise((resolve) => setTimeout(resolve, 6000));
  redirect('/home');
}

export async function auth() {
  const session = await getSession();
  if (!session) return redirect('/auth');
  const { username, id } = await getUserByUsername(session.username);
  return { username, id };
}

export async function getLocations(query: string): Promise<Location[]> {
  const jwt = cookies().get('session');
  const response = await fetch(
    `http://localhost:5000/locations?location=${query}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.value}`,
      },
    }
  );
  if (!response.ok && response.status === 401) return redirect(`/auth`);
  const { data } = await response.json();
  return data;
}

export async function getForecast(coordinates: { lat: string; lon: string }) {
  const jwt = cookies().get('session');
  const response = await fetch(
    `http://localhost:5000/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.value}`,
      },
    }
  );
  if (!response.ok && response.status === 401) return redirect(`/auth`);
  const { data } = await response.json();
  return extractForecastData(data);
}

export async function getWeather(coordinates: { lat: string; lon: string }) {
  const jwt = cookies().get('session');
  const response = await fetch(
    `http://localhost:5000/weather?lat=${coordinates.lat}&lon=${coordinates.lon}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt?.value}`,
      },
    }
  );
  if (!response.ok && response.status === 401) return redirect(`/auth`);
  const { data } = await response.json();
  return data;
}
