import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const adminOnlyRoutes = [
  /^\/courses\/\w+\/editsession\/\w+$/,
  /^\/courses\/\w+\/editsession\/\w+\/editContent\/\w+$/,
  /^\/courses\/editcourse\/\w+$/,
  /^\/courses\/\w+\/editsession\/student\/\w+$/,
  /^\/user\/\w+$/,

];

async function getUserRole(req: NextRequest): Promise<string | undefined> {
  // Get the token from the request
  const token = await getToken({ req });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    // Get the user role from the token
    const user: { role?: string } = token?.user || {};
    return user.role;
  }

  return undefined;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const userRole = await getUserRole(req);

  if (!userRole && pathname !== '/login' && pathname !== '/sign-up') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (userRole && (pathname === '/login' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const isAdminRoute = adminOnlyRoutes.some((route) => route.test(pathname));
  if (isAdminRoute && userRole !== "instructor") {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|api|static|public).*)',
  ],
};
