import { jwtVerify } from 'jose';
import { config } from 'dotenv';

config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY || 'secret-key';
const key = new TextEncoder().encode(secretKey);

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}
