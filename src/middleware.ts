import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookie = request.cookies.has("next-auth.session-token")
    
    if (!cookie) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    } else if (pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/monitoring', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|_next|static|public|auth/login).*)",
};