// src/middleware.js or src/middleware.ts
import { NextResponse } from 'next/server';
import { verifyToken } from './src/utils/auth'; // Adjust path if necessary

export function middleware(request) {
  console.log('Middleware called for:', request.url); // Log the URL being processed

  const token = request.cookies.get('authToken');
  
  const protectedPaths = ['/home', '/about'];

  if (protectedPaths.includes(new URL(request.url).pathname)) {
    if (!token || !verifyToken(token)) {
      console.log('Token missing or invalid, redirecting to login');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/about/:path*'],
};
