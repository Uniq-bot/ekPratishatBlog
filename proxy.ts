import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return null;
  }
  return new TextEncoder().encode(secret);
};

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  const isPublicReadEndpoint =
    (request.method === "GET" || request.method === "POST") &&
    (pathname === "/api/blogs" ||
      pathname === "/api/blogs/latest" ||
      pathname === "/api/categories" ||
      pathname === "/api/tags");

  if (isPublicReadEndpoint) {
    return NextResponse.next();
  }

  // Check if route requires authentication (all /api/* except /api/auth/*)
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    try {
      const secret = getJwtSecret();
      if (!secret) {
        return NextResponse.json(
          { message: "Unauthorized: JWT secret not configured" },
          { status: 401 }
        );
      }

      const { payload } = await jwtVerify(token, secret);
      const userId = typeof payload.userId === "string" ? payload.userId : null;
      if (!userId) {
        return NextResponse.json(
          { message: "Unauthorized: Invalid or expired token" },
          { status: 401 }
        );
      }

      // Clone request and add user info to headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", userId);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        { message: "Unauthorized: Token verification failed" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
