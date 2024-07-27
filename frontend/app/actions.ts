'use server';
import { InsertUser } from '../../backend/db/schema';

export async function createUser(values: InsertUser) {
  try {
    const response = await fetch('http://localhost:5000/createUser', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
