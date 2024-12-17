import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  
  // Redirect authenticated users away from auth pages
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/hub', request.url));
  }

  // Protect dashboard routes
  if (!token && request.nextUrl.pathname.startsWith('/hub')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect admin routes
  if (token?.role !== 'admin' && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/hub', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hub/:path*', '/admin/:path*', '/settings/:path*', '/login']
};