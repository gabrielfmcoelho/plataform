import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the accessToken from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/login');
  const isHub = pathname.startsWith('/hub');
  const isAdmin = pathname.startsWith('/admin');
  const isSettings = pathname.startsWith('/settings');

  // If user is logged in, redirect from /login to /hub
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL('/hub', request.url));
  }

  // Protect /hub, /admin, /settings
  if (!accessToken && (isHub || isAdmin || isSettings)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If you want to protect admin routes, you can decode the token and check role here:
  // e.g. verify(accessToken, secret) -> decode -> role === 'admin'?
  // This example just does a placeholder for demonstration:

  // if (isAdmin && !isUserAdmin(accessToken)) {
  //   return NextResponse.redirect(new URL('/hub', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/hub/:path*', '/admin/:path*', '/settings/:path*', '/login'],
};
