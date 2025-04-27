import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const publicRoutes = [
    "/",
    "/sign-in",
    "/blog",
    "/service",
    "/about",
    "/contact",
    "/portfolio",
  ];

  const protectedRoutes = ["/write", "/dashboard", "/profile"];

  // If trying to access /sign-in while logged in → redirect home
  if (token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If accessing a protected route without token → redirect to login
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api).*)"],
};
