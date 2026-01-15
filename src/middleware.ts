import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Skip login page
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for admin session cookie
  const adminSession = request.cookies.get("admin_session");

  if (!adminSession || adminSession.value !== process.env.ADMIN_SESSION_SECRET) {
    // Redirect to login
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
