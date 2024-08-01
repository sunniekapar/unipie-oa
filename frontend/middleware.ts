import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/jwt';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }
  return await updateSession(request);
}
