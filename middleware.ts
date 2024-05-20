import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const user: { role?: string } = token?.user || {};
  const isAdmin = user.role === "instructor";
console.log(token)
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Define admin-only routes with dynamic segments
  const adminOnlyRoutes = [
    /^\/courses\/\w+\/editsession\/\w+$/, // Matches /courses/[courseId]/editsession/[sessionId]
    /^\/courses\/\w+\/editsession\/\w+\/editContent\/\w+$/, // Matches /courses/[courseId]/editsession/[sessionId]/editContent/[contentId]
    /^\/courses\/editcourse\/\w+$/, // Matches /courses/editcourse/[courseId]
    /^\/courses\/\w+\/editsession\/student\/\w+$/, // Matches /courses/[courseId]/editsession/student/[studentId]
  ];

  // Block non-admin users from accessing certain routes
  if (
    !isAdmin &&
    adminOnlyRoutes.some((route) => route.test(req.nextUrl.pathname))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  const authMiddleware = await withAuth({
    pages: {
      signIn: `/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
