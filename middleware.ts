import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

/**
 * Middleware function to handle authentication and authorization
 * @param req - The incoming request
 * @param event - The Next.js server event
 * @returns The response to be sent back to the client
 */
export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  // Get the token from the request
  const token = await getToken({ req });

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Get the user role from the token
  const user: { role?: string } = token?.user || {};

  // Check if the user is an admin
  const isAdmin = user.role === "instructor";

  // Redirect authenticated users to the home page if they try to access the login or signup pages
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Define the routes that are accessible only to admin users
  const adminOnlyRoutes = [
    // Matches /courses/[courseId]/editsession/[sessionId]
    /^\/courses\/\w+\/editsession\/\w+$/,
    // Matches /courses/[courseId]/editsession/[sessionId]/editContent/[contentId]
    /^\/courses\/\w+\/editsession\/\w+\/editContent\/\w+$/,
    // Matches /courses/editcourse/[courseId]
    /^\/courses\/editcourse\/\w+$/,
    // Matches /courses/[courseId]/editsession/student/[studentId]
    /^\/courses\/\w+\/editsession\/student\/\w+$/,
  ];

  // Block non-admin users from accessing certain routes
  if (
    !isAdmin &&
    adminOnlyRoutes.some((route) => route.test(req.nextUrl.pathname))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Set up the authentication middleware with Next.js
  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // Call the authentication middleware and return the response
  // @ts-expect-error
  return authMiddleware(req, event);
}
