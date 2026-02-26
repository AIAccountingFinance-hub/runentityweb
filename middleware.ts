import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const PUBLIC_APP_ROUTES = ["/login", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // ── app.runentity.com (or localhost for dev) ──
  if (hostname.startsWith("app.") || hostname.startsWith("localhost")) {
    const { user, supabaseResponse } = await updateSession(request);

    // Public routes: login, auth callback
    if (PUBLIC_APP_ROUTES.some((r) => pathname.startsWith(r))) {
      // Authenticated user on /login → redirect to dashboard
      if (user && pathname === "/login") {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
      return supabaseResponse;
    }

    // Protected routes: require auth
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  // ── Marketing site ──
  if (pathname === "/login" || pathname === "/dashboard") {
    return NextResponse.redirect("https://app.runentity.com");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand|.*\\.svg$).*)"],
};
