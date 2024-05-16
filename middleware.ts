export { default } from "next-auth/middleware";

// secure all routes EXCEPT login and signup
export const config = {
  matcher: ["/","/courses/:path*"],
};
