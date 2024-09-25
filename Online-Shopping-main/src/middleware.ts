import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for the presence of a cookie named 'user'
  const isAuthenticated = request.cookies.get("user") !== undefined;

  // Define the paths that require authentication
  const protectedPaths = [
    "/products",
    "/products/cart",
    "/products/[productId]",
  ];

  // Check if the request is for a protected path
  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !isAuthenticated
  ) {
    // Redirect to login page with the original path as a query parameter
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Specify the paths to apply the middleware
export const config = {
  matcher: ["/products/cart", "/products/:path*"],
};
