import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { jwtDecode } from "jwt-decode";

export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const response = NextResponse.next();

  const redirectToLogin = `${origin}/auth/login`;
  const redirectToDashboard = `${origin}/dashboard`;

  // Allow Next.js internals, favicon, API
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api")
  ) {
    return response;
  }

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookies) =>
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    }
  );

  // Get session
  const { data: { session } } = await supabase.auth.getSession();

  // ✅ Not logged in
  if (!session) {
    if (pathname.startsWith("/auth")) return response;
    return NextResponse.redirect(redirectToLogin);
  }

  // ✅ Logged in
  let role;
  try {
    const decoded = jwtDecode(session.access_token);
    role = decoded?.role;
  } catch {
    return NextResponse.redirect(redirectToLogin);
  }

  // Prevent logged-in users from visiting /auth/*
  if (pathname.startsWith("/auth")) {
    return NextResponse.redirect(redirectToDashboard);
  }

  // ✅ Admin can access everything
  if (role === "admin") {
    return response;
  }

  // ✅ Shared routes for all logged-in users
  if (
    pathname.startsWith("/dashboard")
  ) {
    return response;
  }

  // ✅ Role-restricted user routes
  const roleMatch = pathname.match(/^\/(consumer|doctor)(\/|$)/);
  if (roleMatch) {
    if (roleMatch[1] === role) {
      return response;
    }
    // wrong role trying to access someone else's route
    return NextResponse.redirect(redirectToDashboard);
  }

  // Default: block anything else
  return NextResponse.redirect(redirectToDashboard);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/consumer/:path*",
    "/doctor/:path*",
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
