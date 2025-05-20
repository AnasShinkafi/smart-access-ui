// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("auth")?.value === "true";

  const protectedRoutes = ["/dashboard", "/buy-data", '/buy-airtime', "/electricity", "/tv-subscription", "/transactions",];

  const path = request.nextUrl.pathname;

  if (protectedRoutes.includes(path) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to these routes only
export const config = {
  matcher: ["/dashboard", "/buy-data", '/buy-airtime', "/electricity", "/tv-subscription", "/transactions"],
};
